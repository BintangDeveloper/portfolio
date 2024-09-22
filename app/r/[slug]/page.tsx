"use client"
// app/r/[slug]/page.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type RedirectConfig = {
  key: string;
  url: string;
};

// Define the redirects as an array of key-value pairs
const redirects: RedirectConfig[] = [
  { key: 'home', url: '/' },
  { key: 'about', url: '/about' },
  { key: 'contact', url: '/contact' },
  { key: 'p1a', url: 'https://drive.google.com/drive/folders/10oXoOcBY3W77lmvTjXE6Ym3hHlc88OX5' },
  // Add more routes as needed
];

export default function RedirectPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    // Find the redirect URL based on the slug
    const redirectConfig = redirects.find((r) => r.key === slug);

    if (redirectConfig) {
      const timer = setTimeout(() => {
        router.push(redirectConfig.url);
      }, 3000); // 3-second delay

      // Cleanup the timer if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [slug, router]);

  if (!redirects.some((r) => r.key === slug)) {
    return <p>Redirect not found</p>;
  }

  return <p>Redirecting to {slug} in 3 seconds...</p>;
}
