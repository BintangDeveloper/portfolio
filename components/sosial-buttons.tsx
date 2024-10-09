import React from 'react';

const SosialButtons = ({ social }) => {
  return (
    <div className="py-8 flex items-center justify-center gap-2 flex-wrap">
      {Object.keys(social).map((key) => (
        <a 
          key={key} 
          href={social[key].url} 
          className="p-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <social[key].icon width="28" height="28" />
        </a>
      ))}
    </div>
  );
};

export SosialButtons;
