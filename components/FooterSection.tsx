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

export default function FooterSection({ social }: SosialButtonsProps) {
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-7 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0">
              {Object.keys(social).map((key) => { 
              const Icon = social[key].icon;
              return (
                <a
                  key={key}
                  href={social[key].url}
                  className="w-9 h-9 rounded-full bg-gray-700 dark:bg-gray-900 flex justify-center items-center hover:bg-indigo-600 dark:hover:bg-indigo-500"
                  aria-label={social[key].name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon width="16" height="16" className="text-gray-800 dark:text-gray-100" />
                </a>
              );
            })}
            </div>
            <span className="pt-4 text-sm text-gray-500 dark:text-gray-400">
              ©<a href="https://BintangDeveloper.eu.org/">BintangDeveloper</a> 2024, All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
