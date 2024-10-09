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
    <div className="py-8 flex items-center justify-center gap-4 flex-wrap">
      {Object.keys(social).map((key) => {
        const Icon = social[key].icon;
        return (
          <a
            key={key}
            href={social[key].url}
            className="p-3 rounded-full flex items-center justify-center border transition-all duration-500 hover:scale-110
              border-gray-300 dark:border-gray-700
              bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon width="18" height="18" className="text-gray-800 dark:text-gray-100" />
          </a>
        );
      })}
    </div>
  );
}
