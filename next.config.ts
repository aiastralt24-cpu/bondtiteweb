import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  outputFileTracingIncludes: {
    "/api/tds": ["./private/documents/*-tds.pdf"]
  },
  async redirects() {
    return [{source:'/products/epoxy-adhesives/bondtite-uniweld',destination:'/products/acrylic-adhesives/bondtite-uniweld',permanent:true}];
  },
  async headers() {
    return ["/admin/:path*", "/api/:path*"].map(source => ({source,headers:[{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"},{key:"Cache-Control",value:"private, no-store"}]}));
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
