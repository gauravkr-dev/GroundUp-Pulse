import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      // uploadthing serves files from dynamic UFS subdomains like "<id>.ufs.sh".
      // Allow any subdomain under ufs.sh so images returned by UploadThing load correctly.
      {
        protocol: "https",
        hostname: "**.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
