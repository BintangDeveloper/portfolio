/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' 'unsafe-inline' *; script-src 'self' *.cloudflareinsights.com *.bintangdeveloper.eu.org challenges.cloudflare.com https://cdn.jsdelivr.net/npm/eruda; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; object-src 'none';",
          },
          {
            key: 'Feature-Policy',
            value: "microphone 'none'; camera 'none'"
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ];
  }
};

export default nextConfig;
