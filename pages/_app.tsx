import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import "@/styles/globals.scss";
import LoadingScreen from '@/components/LoadingScreen';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    const handleWindowLoad = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    window.addEventListener('load', handleWindowLoad);

    // Set initial loading state to false after window load
    if (document.readyState === 'complete') {
      handleWindowLoad();
    }

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      window.removeEventListener('load', handleWindowLoad);
    };
  }, [router]);
  
  return (
    <>
      <Component {...pageProps} />
      {loading && <LoadingScreen />}
    </>
  );
}
