import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  outputFileTracingIncludes: {
    "/api/tds": ["./private/documents/bondtite-hydra-tds.pdf"]
  },
  async headers() {
    return ["/admin/:path*", "/api/:path*"].map(source => ({source,headers:[{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"},{key:"Cache-Control",value:"private, no-store"}]}));
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
