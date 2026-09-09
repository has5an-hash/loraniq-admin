import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const notes = [];

const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));
const fail = (message) => failures.push(message);
const ok = (message) => notes.push(message);

function assert(condition, message) {
  if (condition) ok(message);
  else fail(message);
}

const pkg = JSON.parse(read("package.json"));
assert(pkg.name === "loraniq-admin", "package name is loraniq-admin");
assert(pkg.version === "1.0.0", "product version is locked to 1.0.0");
assert(pkg.engines?.node === ">=22.13.0", "Node.js engine requirement is explicit");

const required = [
  "app/page.tsx",
  "app/demo/[slug]/page.tsx",
  "app/demo/[slug]/admin-demo.tsx",
  "app/globals.css",
  "app/demo/[slug]/dashboard.css",
  "docs/README_FA.md",
  "docs/RELEASE_CHECKLIST_FA.md",
  "CHANGELOG.md",
  "LICENSES.md",
];
for (const file of required) assert(exists(file), `required file exists: ${file}`);

const demoRoute = read("app/demo/[slug]/page.tsx");
const demoSlugs = [
  "commerce",
  "analytics",
  "projects",
  "finance",
  "crm",
  "academy",
  "calendar",
  "inbox",
  "settings",
  "components",
];
for (const slug of demoSlugs) {
  assert(demoRoute.includes(`\"${slug}\"`), `demo route is declared: ${slug}`);
}

const landing = read("app/page.tsx");
const forbiddenClaims = [
  ["۱۲۰+", "unsupported 120+ pages claim"],
  ["۱۲", "unsupported 12 demos claim"],
  ["امتیاز ۴٫۹", "unverified rating/social-proof claim"],
];
for (const [needle, label] of forbiddenClaims) {
  assert(!landing.includes(needle), `landing has no ${label}`);
}
assert(landing.includes("۱۰"), "landing states the verified 10-workspace count");

const readme = read("README.md");
assert(!readme.includes("vinext-starter"), "README no longer presents the project as a starter");
assert(readme.includes("لورانیک"), "README identifies Loraniq");

const sensitiveNames = new Set([
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
  "id_rsa",
  "id_ed25519",
]);
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", ".next", "dist", ".vinext", ".wrangler"].includes(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    const relative = path.relative(root, absolute).replaceAll("\\", "/");
    if (entry.isDirectory()) walk(absolute);
    else if (sensitiveNames.has(entry.name) || /\.(pem|p12|pfx)$/.test(entry.name)) {
      fail(`sensitive credential-like file must not be shipped: ${relative}`);
    }
  }
}
walk(root);

if (failures.length) {
  console.error("\nRelease gate failed:\n");
  for (const item of failures) console.error(`- ${item}`);
  console.error(`\n${failures.length} failure(s).`);
  process.exit(1);
}

console.log("\nRelease gate passed:\n");
for (const item of notes) console.log(`- ${item}`);
console.log(`\n${notes.length} checks passed.`);
