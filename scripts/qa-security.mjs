import fs from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const outputDir=path.resolve("artifacts/security");
await fs.mkdir(outputDir,{recursive:true});

const list=spawnSync("git",["ls-files","-z"],{encoding:"utf8"});
if(list.status!==0) throw new Error("git ls-files failed");
const files=list.stdout.split("\0").filter(Boolean).filter((file)=>
  !file.startsWith("public/demo-previews/") &&
  !file.endsWith(".jpg") && !file.endsWith(".png") && !file.endsWith(".woff2") &&
  !file.endsWith("pnpm-lock.yaml")
);

const signatures=[
  {name:"private-key",pattern:/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g},
  {name:"aws-access-key",pattern:/\bAKIA[0-9A-Z]{16}\b/g},
  {name:"github-token",pattern:/\bgh[pousr]_[A-Za-z0-9]{30,}\b/g},
  {name:"openai-style-secret",pattern:/\bsk-[A-Za-z0-9_-]{20,}\b/g},
  {name:"slack-token",pattern:/\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g},
];
const findings=[];
for(const file of files){
  let content;
  try{content=await fs.readFile(file,"utf8")}catch{continue}
  for(const signature of signatures){
    for(const match of content.matchAll(signature.pattern)){
      const before=content.slice(0,match.index).split("\n");
      findings.push({file,line:before.length,signature:signature.name});
    }
  }
}
const trackedEnv=files.filter((f)=>/(^|\/)\.env($|\.)/.test(f));
const trackedPem=files.filter((f)=>/\.(pem|key|p12|pfx)$/i.test(f));
const report={
  generatedAt:new Date().toISOString(),
  scannedFiles:files.length,
  secretSignatureFindings:findings,
  trackedEnvironmentFiles:trackedEnv,
  trackedCredentialFiles:trackedPem,
};
await fs.writeFile(path.join(outputDir,"source-security-report.json"),JSON.stringify(report,null,2));
const failures=[];
if(findings.length) failures.push(`${findings.length} credential-like signature(s) found in tracked source`);
if(trackedEnv.length) failures.push(`tracked environment file(s): ${trackedEnv.join(", ")}`);
if(trackedPem.length) failures.push(`tracked credential file(s): ${trackedPem.join(", ")}`);
if(failures.length){
  console.error("Loraniq source security gate failed:\n- "+failures.join("\n- "));
  process.exit(1);
}
console.log(`Loraniq source security gate passed: ${files.length} tracked text candidates scanned, no credential signatures or tracked env/key files`);
