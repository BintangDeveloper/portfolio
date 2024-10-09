import React from 'react';

type SocialItem = {
  name: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  navbar: boolean;
};

type SosialButtonsProps = {
  social: Record<string, SocialItem>;
};

export function SosialButtons({ social }: SosialButtonsProps) {
  return (
    <div className="py-8 flex items-center justify-center gap-2 flex-wrap">
      {Object.keys(social).map((key) => {
        const Icon = social[key].icon;
        return (
          <a
            key={key}
            href={social[key].url}
            className="p-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon width="28" height="28" />
          </a>
        );
      })}
    </div>
  );
}
