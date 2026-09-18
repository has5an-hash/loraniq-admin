import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseURL=process.env.LORANIQ_PREVIEW_URL??"https://has5an-hash.github.io/loraniq-admin/";
const webOutputDir=path.resolve("public/demo-previews");
const hiResOutputDir=path.resolve("artifacts/demo-previews-hires");
await fs.mkdir(webOutputDir,{recursive:true});
await fs.mkdir(hiResOutputDir,{recursive:true});

const demos=[
  ["executive",""],
  ["analytics","analytics/"],
  ["ecommerce","ecommerce/"],
  ["crm","crm/"],
  ["finance","finance/"],
  ["healthcare","healthcare/"],
];

const browser=await chromium.launch({headless:true});

for(const [name,routePath] of demos){
  const context=await browser.newContext({
    viewport:{width:1680,height:1050},
    deviceScaleFactor:2,
    colorScheme:"light",
    reducedMotion:"reduce",
  });
  const page=await context.newPage();
  const response=await page.goto(new URL(routePath,baseURL).toString(),{
    waitUntil:"networkidle",
    timeout:60000,
  });
  if(!response?.ok()) throw new Error(`${name}: response ${response?.status()}`);

  await page.locator("#main-content").waitFor({state:"visible"});
  await page.evaluate(async()=>{
    await document.fonts.ready;
    window.scrollTo({top:0,left:0,behavior:"instant"});
  });
  await page.addStyleTag({
    content:"*{animation:none!important;transition:none!important}::-webkit-scrollbar{display:none!important}html{scrollbar-width:none!important}",
  });
  await page.waitForTimeout(350);

  // Archival / marketplace-quality source: true 3360x2100 DPR2 capture.
  await page.screenshot({
    path:path.join(hiResOutputDir,`${name}.jpg`),
    type:"jpeg",
    quality:94,
    clip:{x:0,y:0,width:1680,height:1050},
    animations:"disabled",
    caret:"hide",
    scale:"device",
  });

  // Runtime web preview: same real dashboard, DPR1 output.
  // 1680x1050 is already sharper than the 960px rendered card while avoiding
  // shipping a 3360x2100 image to every Landing/Demos visitor.
  await page.screenshot({
    path:path.join(webOutputDir,`${name}.jpg`),
    type:"jpeg",
    quality:84,
    clip:{x:0,y:0,width:1680,height:1050},
    animations:"disabled",
    caret:"hide",
    scale:"css",
  });

  await context.close();
}

await browser.close();

const webFiles=await Promise.all(demos.map(async([name])=>{
  const file=path.join(webOutputDir,`${name}.jpg`);
  const stat=await fs.stat(file);
  return {name,bytes:stat.size};
}));
const totalWebBytes=webFiles.reduce((sum,file)=>sum+file.bytes,0);
const maxWebBytes=Math.max(...webFiles.map(file=>file.bytes));
const maxPerPreview=450*1024;
const maxCombined=2*1024*1024;

if(maxWebBytes>maxPerPreview){
  throw new Error(`web preview too large: max ${Math.round(maxWebBytes/1024)}KB > 450KB`);
}
if(totalWebBytes>maxCombined){
  throw new Error(`combined web previews too large: ${(totalWebBytes/1024/1024).toFixed(2)}MB > 2MB`);
}

console.log(
  `Captured ${demos.length} real Loraniq previews. Web set: ${(totalWebBytes/1024/1024).toFixed(2)}MB total; high-DPI sources saved as CI artifact.`
);
