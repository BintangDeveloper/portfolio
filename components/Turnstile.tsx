import { useEffect, useRef } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

declare global {
  interface Window {
    turnstile: any;
  }
}

interface TurnstileProps {
  siteKey: string;
  field: ControllerRenderProps<FieldValues, string>;
}

const Turnstile: React.FC<TurnstileProps> = ({ siteKey, field }) => {
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => field.onChange(token),
        });
      }
    };

    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.onload = loadTurnstile;
      document.head.appendChild(script);
    } else {
      loadTurnstile();
    }
  }, [siteKey, field]);

  return <div ref={turnstileRef} />;
};

export default Turnstile;
