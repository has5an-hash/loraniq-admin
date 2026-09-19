import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const baseURL=process.env.QA_URL??"http://127.0.0.1:4173/loraniq-admin/";
const outputDir=path.resolve("artifacts/a11y");
await fs.mkdir(outputDir,{recursive:true});

const routes=[
  {name:"executive",path:"",ready:"#main-content"},
  {name:"healthcare",path:"healthcare/",ready:"#main-content"},
  {name:"tables",path:"tables/",ready:"#main-content"},
  {name:"forms",path:"forms/",ready:"#main-content"},
  {name:"settings",path:"settings/",ready:"#main-content"},
  {name:"login",path:"login/",ready:".auth-card"},
  {name:"landing",path:"landing/",ready:"#main-content"},
  {name:"demos",path:"demos/",ready:"#main-content"},
];
const viewports=[
  {name:"desktop",width:1440,height:1000},
  {name:"mobile",width:390,height:844},
];
const tags=["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"];
const blockingImpacts=new Set(["critical","serious"]);
const report=[];
const failures=[];
const browser=await chromium.launch({headless:true});

async function scan(page,label){
  await page.evaluate(async()=>{await document.fonts.ready});
  const results=await new AxeBuilder({page}).withTags(tags).analyze();
  const violations=results.violations.map((violation)=>({
    id:violation.id,
    impact:violation.impact,
    help:violation.help,
    helpUrl:violation.helpUrl,
    nodes:violation.nodes.map((node)=>({target:node.target,failureSummary:node.failureSummary})),
  }));
  const blockers=violations.filter((violation)=>blockingImpacts.has(violation.impact??""));
  report.push({label,url:page.url(),violations,blockingCount:blockers.length});
  if(blockers.length){
    failures.push(`${label}: ${blockers.map((v)=>`${v.id}(${v.impact},${v.nodes.length})`).join(", ")}`);
  }
}

for(const route of routes){
  for(const viewport of viewports){
    const context=await browser.newContext({
      viewport,
      colorScheme:"light",
      reducedMotion:"reduce",
    });
    const page=await context.newPage();
    const response=await page.goto(new URL(route.path,baseURL).toString(),{waitUntil:"networkidle",timeout:60000});
    if(!response?.ok())failures.push(`${route.name}/${viewport.name}: response ${response?.status()??"none"}`);
    await page.locator(route.ready).first().waitFor({state:"visible"});
    await scan(page,`${route.name}/${viewport.name}/rtl-light`);

    const themeToggle=page.getByRole("button",{name:"تغییر پوسته"});
    const directionToggle=page.getByRole("button",{name:"تغییر جهت و زبان"});
    if(!await themeToggle.count()||!await directionToggle.count()){
      await context.close();
      continue;
    }
    await themeToggle.click();
    await directionToggle.click();
    await page.waitForFunction(()=>document.documentElement.classList.contains("dark")&&document.documentElement.dir==="ltr");
    await scan(page,`${route.name}/${viewport.name}/ltr-dark`);
    await context.close();
  }
}
await browser.close();

const summary={
  generatedAt:new Date().toISOString(),
  baseURL,
  standardTags:tags,
  blockingImpacts:[...blockingImpacts],
  routeCount:routes.length,
  viewportCount:viewports.length,
  stateCount:2,
  scans:report.length,
  blockingFailures:failures,
  report,
};
await fs.writeFile(path.join(outputDir,"axe-report.json"),JSON.stringify(summary,null,2));
if(failures.length){
  console.error("Loraniq accessibility QA found serious/critical WCAG blockers:\n- "+failures.join("\n- "));
  process.exit(1);
}
console.log(`Loraniq accessibility QA passed: ${report.length} axe scans, no serious/critical WCAG blockers`);
