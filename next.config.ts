import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubPages = process.env.GITHUB_ACTIONS === "true" && repositoryName;

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGitHubPages ? `/${repositoryName}` : "",
  assetPrefix: isGitHubPages ? `/${repositoryName}/` : "",
};

export default nextConfig;

