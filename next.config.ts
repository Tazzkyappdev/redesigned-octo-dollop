import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Omite el paso de ESLint durante el build de Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
