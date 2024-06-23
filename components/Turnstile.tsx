import React, { useEffect, useRef } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";

declare global {
  interface Window {
    turnstile: any;
  }
}

interface TurnstileProps {
  siteKey: string;
  name: keyof FormData;
}

const Turnstile: React.FC<TurnstileProps> = ({ siteKey, name }) => {
  const { setValue } = useFormContext<FormData>();
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setValue(name, token),
        });
      } else {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        script.onload = loadTurnstile;
        document.body.appendChild(script);
      }
    };

    loadTurnstile();
  }, [siteKey, name, setValue]);

  return <div ref={turnstileRef} />;
};

export default Turnstile;
