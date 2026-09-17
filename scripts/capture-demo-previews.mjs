import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseURL=process.env.LORANIQ_PREVIEW_URL??"https://has5an-hash.github.io/loraniq-admin/";
const outputDir=path.resolve("public/demo-previews");
await fs.mkdir(outputDir,{recursive:true});
const demos=[["executive",""],["analytics","analytics/"],["ecommerce","ecommerce/"],["crm","crm/"],["finance","finance/"],["healthcare","healthcare/"]];
const browser=await chromium.launch({headless:true});
for(const [name,routePath] of demos){
 const context=await browser.newContext({viewport:{width:1680,height:1050},deviceScaleFactor:2,colorScheme:"light",reducedMotion:"reduce"});
 const page=await context.newPage();
 const response=await page.goto(new URL(routePath,baseURL).toString(),{waitUntil:"networkidle",timeout:60000});
 if(!response?.ok())throw new Error(`${name}: response ${response?.status()}`);
 await page.locator("#main-content").waitFor({state:"visible"});
 await page.evaluate(async()=>{await document.fonts.ready;window.scrollTo({top:0,left:0,behavior:"instant"})});
 await page.addStyleTag({content:"*{animation:none!important;transition:none!important}::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}"});
 await page.waitForTimeout(350);
 await page.screenshot({path:path.join(outputDir,`${name}.jpg`),type:"jpeg",quality:96,clip:{x:0,y:0,width:1680,height:1050},animations:"disabled",caret:"hide",scale:"device"});
 await context.close();
}
await browser.close();
console.log(`Captured ${demos.length} high-DPI Loraniq previews at 3360×2100 source resolution from ${baseURL}`);
