"use client"
// app/r/[slug]/page.tsx
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type RedirectConfig = {
  key: string;
  url: string;
};

const errorIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
  </svg>
);

const lIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" width="48px" height="48px">
    <circle cx="50" cy="50" r="35" stroke="#000" stroke-width="10" stroke-linecap="round"/>
    <path fill="#000" d="M67 50a17 17 0 0 1-17 17v10a27 27 0 0 0 27-27h-10Z">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50"/>
    </path>
  </svg>
);

function generate(icon: ReactNode, message: string) {
  return (
    <section id="redirect" className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-6xl mb-4">
          {icon}
        </div>
        <div className="text-2xl font-semibold">
          {message}
        </div>
      </div>
    </section>
  );
}

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
    return generate(errorIcon, 'Redirect not found');
  }

  return generate(lIcon, 'Redirecting to {slug} in 3 seconds...');
}
