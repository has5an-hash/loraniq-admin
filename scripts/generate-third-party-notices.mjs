import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const lock = JSON.parse(fs.readFileSync(path.join(root, "package-lock.json"), "utf8"));
const rows = [];

for (const [pkgPath, meta] of Object.entries(lock.packages ?? {})) {
  if (!pkgPath.startsWith("node_modules/")) continue;
  const name = pkgPath.slice("node_modules/".length);
  if (!name || name.includes("/node_modules/")) continue;
  rows.push({
    name,
    version: meta.version ?? "unknown",
    license: meta.license ?? "UNKNOWN",
  });
}

rows.sort((a, b) => a.name.localeCompare(b.name));
const unknown = rows.filter((x) => x.license === "UNKNOWN");
const outDir = path.join(root, "artifacts");
fs.mkdirSync(outDir, { recursive: true });
const lines = [
  "Loraniq Admin 1.0.0 — Third-party dependency license report",
  `Generated: ${new Date().toISOString()}`,
  "",
  ...rows.map((x) => `${x.name}@${x.version}\t${x.license}`),
  "",
  `Packages: ${rows.length}`,
  `Unknown license metadata: ${unknown.length}`,
];
fs.writeFileSync(path.join(outDir, "THIRD_PARTY_LICENSES.txt"), `${lines.join("\n")}\n`, "utf8");

if (unknown.length) {
  fs.writeFileSync(
    path.join(outDir, "THIRD_PARTY_LICENSES_REVIEW.txt"),
    `${unknown.map((x) => `${x.name}@${x.version}`).join("\n")}\n`,
    "utf8",
  );
  console.warn(`License metadata is missing for ${unknown.length} package(s); manual review required.`);
} else {
  console.log(`License metadata recorded for ${rows.length} package(s).`);
}
