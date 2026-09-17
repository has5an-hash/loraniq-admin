import type { NextConfig } from "next";

const staticExport = process.env.LORANIQ_STATIC_EXPORT === "1";
const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: pagesBasePath,
        assetPrefix: pagesBasePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
