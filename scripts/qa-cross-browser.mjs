import fs from "node:fs/promises";
import path from "node:path";
import { firefox, webkit } from "playwright";

const baseURL=process.env.QA_URL??"http://127.0.0.1:4173/loraniq-admin/";
const allowedOrigin=new URL(baseURL).origin;
const outputDir=path.resolve("artifacts/cross-browser");
await fs.mkdir(outputDir,{recursive:true});

const routes=[
  {name:"executive",path:"",ready:"#main-content"},
  {name:"tables",path:"tables/",ready:"#main-content"},
  {name:"forms",path:"forms/",ready:"#main-content"},
  {name:"login",path:"login/",ready:".auth-card"},
  {name:"landing",path:"landing/",ready:"#main-content"},
];
const viewports=[
  {name:"desktop",width:1440,height:1000},
  {name:"mobile",width:390,height:844},
];
const engines=[
  {name:"firefox",launcher:firefox},
  {name:"webkit",launcher:webkit},
];
const failures=[];

for(const engine of engines){
  const browser=await engine.launcher.launch({headless:true});
  for(const route of routes){
    for(const viewport of viewports){
      const context=await browser.newContext({viewport,reducedMotion:"reduce",colorScheme:"light"});
      const page=await context.newPage();
      const consoleErrors=[];
      const failedRequests=[];
      const badResponses=[];
      const externalRequests=[];
      page.on("console",(message)=>{if(message.type()==="error")consoleErrors.push(message.text())});
      page.on("response",(response)=>{
        if(response.status()<400)return;
        try{
          const u=new URL(response.url());
          if(u.origin===allowedOrigin) badResponses.push(`${response.status()} ${response.url()}`);
        }catch{}
      });
      page.on("request",(request)=>{
        try{
          const u=new URL(request.url());
          if((u.protocol==="http:"||u.protocol==="https:")&&u.origin!==allowedOrigin) externalRequests.push(`${request.method()} ${request.url()}`);
        }catch{}
      });
      page.on("requestfailed",(request)=>failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText??"failed"}`));

      const label=`${engine.name}/${route.name}/${viewport.name}`;
      const response=await page.goto(new URL(route.path,baseURL).toString(),{waitUntil:"networkidle",timeout:90000});
      if(!response?.ok()) failures.push(`${label}: response ${response?.status()??"none"}`);
      await page.locator(route.ready).first().waitFor({state:"visible"});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
       if(overflow>1) failures.push(label+": horizontal overflow +"+overflow+"px");

       const themeToggle=page.getByRole("button",{name:"تغییر پوسته"});
       const directionToggle=page.getByRole("button",{name:"تغییر جهت و زبان"});
       if(await themeToggle.count()&&await directionToggle.count()){
         await themeToggle.click();
         await directionToggle.click();
         await page.waitForFunction(()=>document.documentElement.classList.contains("dark")&&document.documentElement.dir==="ltr");
       }
      await page.screenshot({path:path.join(outputDir,`${engine.name}-${route.name}-${viewport.name}.png`),fullPage:true});

       if(consoleErrors.length) failures.push(`${label}: console errors: ${consoleErrors.join(" | ")}`);
       if(badResponses.length) failures.push(`${label}: bad responses: ${[...new Set(badResponses)].join(" | ")}`);
       if(failedRequests.length) failures.push(`${label}: failed requests: ${failedRequests.join(" | ")}`);
      if(externalRequests.length) failures.push(`${label}: external requests: ${[...new Set(externalRequests)].join(" | ")}`);
      await context.close();
    }
  }
  await browser.close();
}

const report={generatedAt:new Date().toISOString(),cases:engines.length*routes.length*viewports.length,failures};
await fs.writeFile(path.join(outputDir,"cross-browser-report.json"),JSON.stringify(report,null,2));
if(failures.length){
  console.error("Loraniq cross-browser smoke gate failed:\n- "+failures.join("\n- "));
  process.exit(1);
}
console.log(`Loraniq cross-browser smoke gate passed: ${report.cases} Firefox/WebKit cases`);
