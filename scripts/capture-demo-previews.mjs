import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseURL=process.env.LORANIQ_PREVIEW_URL??"https://has5an-hash.github.io/loraniq-admin/";
const outputDir=path.resolve("public/demo-previews");
await fs.mkdir(outputDir,{recursive:true});
const demos=[
 ["executive",""],["analytics","analytics/"],["ecommerce","ecommerce/"],["crm","crm/"],["finance","finance/"],["healthcare","healthcare/"],
];
const browser=await chromium.launch({headless:true});
for(const [name,routePath] of demos){
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const response=await page.goto(new URL(routePath,baseURL).toString(),{waitUntil:"networkidle",timeout:60000});
 if(!response?.ok())throw new Error(`${name}: response ${response?.status()}`);
 await page.locator("#main-content").waitFor({state:"visible"});
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.waitForTimeout(500);
 await page.screenshot({path:path.join(outputDir,`${name}.jpg`),type:"jpeg",quality:78,clip:{x:0,y:0,width:1440,height:900}});
 await page.close();
}
await browser.close();
console.log(`Captured ${demos.length} real Loraniq demo previews from ${baseURL}`);
