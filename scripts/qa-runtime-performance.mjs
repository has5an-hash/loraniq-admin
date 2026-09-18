import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseURL=process.env.QA_URL??"http://127.0.0.1:4173/loraniq-admin/";
const outputDir=path.resolve("artifacts/performance");
await fs.mkdir(outputDir,{recursive:true});

const routes=[
  {name:"executive",path:"",budgetMb:4},
  {name:"analytics",path:"analytics/",budgetMb:4},
  {name:"tables",path:"tables/",budgetMb:4},
  {name:"login",path:"login/",budgetMb:4},
  {name:"landing",path:"landing/",budgetMb:10},
  {name:"demos",path:"demos/",budgetMb:10},
];
const viewports=[
  {name:"desktop",width:1440,height:1000},
  {name:"mobile",width:390,height:844},
];
const thresholds={
  fcpMs:3500,
  lcpMs:5500,
  cls:0.10,
};
const browser=await chromium.launch({headless:true});
const results=[];
const failures=[];

for(const route of routes){
  for(const viewport of viewports){
    const context=await browser.newContext({
      viewport,
      reducedMotion:"reduce",
      colorScheme:"light",
    });
    const page=await context.newPage();
    await page.addInitScript(()=>{
      window.__loraniqPerf={lcp:0,cls:0,longTaskCount:0,longTaskDuration:0};
      try{
        new PerformanceObserver((list)=>{
          const entries=list.getEntries();
          const last=entries[entries.length-1];
          if(last) window.__loraniqPerf.lcp=last.startTime;
        }).observe({type:"largest-contentful-paint",buffered:true});
      }catch{}
      try{
        new PerformanceObserver((list)=>{
          for(const entry of list.getEntries()){
            if(!entry.hadRecentInput) window.__loraniqPerf.cls+=entry.value;
          }
        }).observe({type:"layout-shift",buffered:true});
      }catch{}
      try{
        new PerformanceObserver((list)=>{
          for(const entry of list.getEntries()){
            window.__loraniqPerf.longTaskCount+=1;
            window.__loraniqPerf.longTaskDuration+=entry.duration;
          }
        }).observe({type:"longtask",buffered:true});
      }catch{}
    });

    const cdp=await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions",{
      offline:false,
      latency:100,
      downloadThroughput:Math.floor(1.6*1024*1024/8),
      uploadThroughput:Math.floor(750*1024/8),
      connectionType:"cellular4g",
    });
    await cdp.send("Emulation.setCPUThrottlingRate",{rate:4});

    const url=new URL(route.path,baseURL).toString();
    const started=Date.now();
    const response=await page.goto(url,{waitUntil:"networkidle",timeout:90000});
    await page.evaluate(async()=>{await document.fonts.ready});
    await page.waitForTimeout(800);
    const wallMs=Date.now()-started;

    const metrics=await page.evaluate(()=>{
      const nav=performance.getEntriesByType("navigation")[0];
      const paints=performance.getEntriesByType("paint");
      const fcp=paints.find((entry)=>entry.name==="first-contentful-paint")?.startTime??0;
      const resources=performance.getEntriesByType("resource");
      const resourceBytes=resources.reduce((sum,entry)=>sum+(entry.encodedBodySize||entry.transferSize||0),0);
      const jsBytes=resources.filter((entry)=>entry.initiatorType==="script"||entry.name.includes("/_next/static/chunks/")).reduce((sum,entry)=>sum+(entry.encodedBodySize||entry.transferSize||0),0);
      const cssBytes=resources.filter((entry)=>entry.initiatorType==="link"&&entry.name.endsWith(".css")).reduce((sum,entry)=>sum+(entry.encodedBodySize||entry.transferSize||0),0);
      const imageBytes=resources.filter((entry)=>entry.initiatorType==="img").reduce((sum,entry)=>sum+(entry.encodedBodySize||entry.transferSize||0),0);
      return {
        fcp,
        lcp:window.__loraniqPerf?.lcp??0,
        cls:window.__loraniqPerf?.cls??0,
        longTaskCount:window.__loraniqPerf?.longTaskCount??0,
        longTaskDuration:window.__loraniqPerf?.longTaskDuration??0,
        domContentLoaded:nav?.domContentLoadedEventEnd??0,
        loadEventEnd:nav?.loadEventEnd??0,
        resourceBytes,
        jsBytes,
        cssBytes,
        imageBytes,
        resourceCount:resources.length,
      };
    });

    const label=`${route.name}/${viewport.name}`;
    if(!response?.ok()) failures.push(`${label}: response ${response?.status()??"none"}`);
    if(!metrics.fcp||metrics.fcp>thresholds.fcpMs) failures.push(`${label}: FCP ${Math.round(metrics.fcp)}ms > ${thresholds.fcpMs}ms`);
    if(!metrics.lcp||metrics.lcp>thresholds.lcpMs) failures.push(`${label}: LCP ${Math.round(metrics.lcp)}ms > ${thresholds.lcpMs}ms`);
    if(metrics.cls>thresholds.cls) failures.push(`${label}: CLS ${metrics.cls.toFixed(3)} > ${thresholds.cls}`);
    const resourceBudget=route.budgetMb*1024*1024;
    if(metrics.resourceBytes>resourceBudget) failures.push(`${label}: resources ${(metrics.resourceBytes/1024/1024).toFixed(2)}MB > ${route.budgetMb}MB`);

    results.push({
      label,
      url,
      viewport,
      emulation:{latencyMs:100,downloadMbps:1.6,uploadKbps:750,cpuSlowdown:4},
      wallMs,
      ...metrics,
    });
    await context.close();
  }
}
await browser.close();

const report={
  generatedAt:new Date().toISOString(),
  thresholds,
  cases:results.length,
  failures,
  results,
};
await fs.writeFile(path.join(outputDir,"runtime-profile.json"),JSON.stringify(report,null,2));
if(failures.length){
  console.error("Loraniq runtime performance gate failed:\n- "+failures.join("\n- "));
  process.exit(1);
}
console.log(`Loraniq runtime performance gate passed: ${results.length} throttled Chromium profiles`);
