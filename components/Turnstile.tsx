// components/Turnstile.tsx

import { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';

declare global {
  interface Window {
    turnstile: any;
  }
}

interface TurnstileProps {
  siteKey: string;
  control: any;
  name: string;
  setValue: (name: string, value: any) => void;
}

const Turnstile: React.FC<TurnstileProps> = ({ siteKey, control, name, setValue }) => {
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setValue(name, token),
        });
      } else {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.onload = () => window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setValue(name, token),
        });
        document.body.appendChild(script);
      }
    };

    loadTurnstile();
  }, [siteKey, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={() => <div ref={turnstileRef}></div>}
    />
  );
};

export default Turnstile;
