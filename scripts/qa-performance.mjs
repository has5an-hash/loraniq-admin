import fs from "node:fs/promises";
import path from "node:path";

const root=path.resolve("out");
const outputDir=path.resolve("artifacts/performance");
await fs.mkdir(outputDir,{recursive:true});

async function walk(dir){
  const entries=await fs.readdir(dir,{withFileTypes:true});
  const files=[];
  for(const entry of entries){
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) files.push(...await walk(full));
    else if(entry.isFile()){
      const stat=await fs.stat(full);
      files.push({path:path.relative(root,full).replaceAll("\\","/"),bytes:stat.size});
    }
  }
  return files;
}
const files=await walk(root);
const ext=(p)=>path.extname(p).toLowerCase();
const groups={
  js:files.filter(f=>[".js",".mjs"].includes(ext(f.path))),
  css:files.filter(f=>ext(f.path)===".css"),
  html:files.filter(f=>ext(f.path)===".html"),
  images:files.filter(f=>[".png",".jpg",".jpeg",".webp",".avif",".svg"].includes(ext(f.path))),
  fonts:files.filter(f=>[".woff",".woff2",".ttf",".otf"].includes(ext(f.path))),
};
const sum=(items)=>items.reduce((n,f)=>n+f.bytes,0);
const max=(items)=>items.reduce((best,f)=>!best||f.bytes>best.bytes?f:best,null);
const mb=(n)=>Math.round(n/1024/1024*100)/100;
const previewFiles=files.filter(f=>f.path.includes("demo-previews/"));
const metrics={
  total:{bytes:sum(files),mb:mb(sum(files)),files:files.length},
  js:{bytes:sum(groups.js),mb:mb(sum(groups.js)),files:groups.js.length,largest:max(groups.js)},
  css:{bytes:sum(groups.css),mb:mb(sum(groups.css)),files:groups.css.length,largest:max(groups.css)},
  html:{bytes:sum(groups.html),mb:mb(sum(groups.html)),files:groups.html.length,largest:max(groups.html)},
  images:{bytes:sum(groups.images),mb:mb(sum(groups.images)),files:groups.images.length,largest:max(groups.images)},
  fonts:{bytes:sum(groups.fonts),mb:mb(sum(groups.fonts)),files:groups.fonts.length,largest:max(groups.fonts)},
  demoPreviews:{bytes:sum(previewFiles),mb:mb(sum(previewFiles)),files:previewFiles.length,largest:max(previewFiles)},
};
const budgets={
  totalBytes:40*1024*1024,
  jsTotalBytes:10*1024*1024,
  jsLargestBytes:800*1024,
  cssTotalBytes:2*1024*1024,
  cssLargestBytes:500*1024,
  imageLargestBytes:1536*1024,
  fontLargestBytes:1024*1024,
  demoPreviewsTotalBytes:6*1024*1024,
};
const failures=[];
if(metrics.total.bytes>budgets.totalBytes) failures.push(`Static export total ${metrics.total.mb}MB exceeds 40MB`);
if(metrics.js.bytes>budgets.jsTotalBytes) failures.push(`JS total ${metrics.js.mb}MB exceeds 10MB`);
if((metrics.js.largest?.bytes??0)>budgets.jsLargestBytes) failures.push(`Largest JS ${metrics.js.largest.path} exceeds 800KB`);
if(metrics.css.bytes>budgets.cssTotalBytes) failures.push(`CSS total ${metrics.css.mb}MB exceeds 2MB`);
if((metrics.css.largest?.bytes??0)>budgets.cssLargestBytes) failures.push(`Largest CSS ${metrics.css.largest.path} exceeds 500KB`);
if((metrics.images.largest?.bytes??0)>budgets.imageLargestBytes) failures.push(`Largest image ${metrics.images.largest.path} exceeds 1.5MB`);
if((metrics.fonts.largest?.bytes??0)>budgets.fontLargestBytes) failures.push(`Largest font ${metrics.fonts.largest.path} exceeds 1MB`);
if(metrics.demoPreviews.bytes>budgets.demoPreviewsTotalBytes) failures.push(`Demo previews total ${metrics.demoPreviews.mb}MB exceeds 6MB`);

const topFiles=[...files].sort((a,b)=>b.bytes-a.bytes).slice(0,30).map(f=>({...f,mb:mb(f.bytes)}));
const report={generatedAt:new Date().toISOString(),budgets,metrics,failures,topFiles};
await fs.writeFile(path.join(outputDir,"static-budget-report.json"),JSON.stringify(report,null,2));
console.log(JSON.stringify({metrics,failures},null,2));
if(failures.length){
  console.error("Loraniq static performance budget failed:\n- "+failures.join("\n- "));
  process.exit(1);
}
console.log("Loraniq static performance budget passed.");
