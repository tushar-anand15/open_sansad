import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  // Environment variables configuration
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_WS_URL: process.env.NEXT_PUBLIC_API_WS_URL,
  },
};

export default nextConfig;
