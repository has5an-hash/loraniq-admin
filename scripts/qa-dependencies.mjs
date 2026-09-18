import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const outputDir=path.resolve("artifacts/security");
await fs.mkdir(outputDir,{recursive:true});

function runAudit(args,fileName){
  const result=spawnSync("pnpm",["audit",...args,"--json"],{
    encoding:"utf8",
    maxBuffer:20*1024*1024,
  });
  const raw=(result.stdout||result.stderr||"").trim();
  if(!raw) throw new Error(`pnpm audit produced no JSON for ${fileName}`);
  let report;
  try{report=JSON.parse(raw)}catch(error){
    throw new Error(`Unable to parse pnpm audit JSON for ${fileName}: ${error.message}`);
  }
  return {report,raw,exitCode:result.status??0};
}

function counts(report){
  const v=report?.metadata?.vulnerabilities??{};
  return {
    info:Number(v.info??0),
    low:Number(v.low??0),
    moderate:Number(v.moderate??0),
    high:Number(v.high??0),
    critical:Number(v.critical??0),
  };
}

const production=runAudit(["--prod"],"pnpm-audit-production.json");
const complete=runAudit([],"pnpm-audit-all.json");
await fs.writeFile(path.join(outputDir,"pnpm-audit-production.json"),production.raw+"\n");
await fs.writeFile(path.join(outputDir,"pnpm-audit-all.json"),complete.raw+"\n");

const prodCounts=counts(production.report);
const allCounts=counts(complete.report);
const summary={
  generatedAt:new Date().toISOString(),
  production:{...prodCounts,commandExitCode:production.exitCode},
  complete:{...allCounts,commandExitCode:complete.exitCode},
  blockingPolicy:{
    production:"high or critical > 0",
    completeGraph:"high or critical > 0",
  },
};
await fs.writeFile(path.join(outputDir,"dependency-audit-summary.json"),JSON.stringify(summary,null,2));

const failures=[];
if(prodCounts.high||prodCounts.critical){
  failures.push(`production dependency vulnerabilities: high=${prodCounts.high}, critical=${prodCounts.critical}`);
}
if(allCounts.high||allCounts.critical){
  failures.push(`complete dependency graph vulnerabilities: high=${allCounts.high}, critical=${allCounts.critical}`);
}
if(failures.length){
  console.error("Loraniq dependency security gate failed:\n- "+failures.join("\n- "));
  process.exit(1);
}
console.log(`Loraniq dependency security gate passed: production high/critical 0/0; complete graph high/critical 0/0 (moderate=${allCounts.moderate}, low=${allCounts.low})`);
