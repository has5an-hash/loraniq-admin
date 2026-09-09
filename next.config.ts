import type { NextConfig } from "next";

const isGitHubPages = process.env.LORANIQ_GITHUB_PAGES === "1";
const pagesBasePath = isGitHubPages ? "/loraniq-admin" : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: "export" as const } : {}),
  trailingSlash: isGitHubPages,
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
