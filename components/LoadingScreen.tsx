// components/LoadingScreen.tsx
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black z-50">
      <div className="e7dc0d49636f4194266ce34b5322a2861b7fb1bf">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/*
      <h1 className="lds-message text-2xl text-black dark:text-white mt-4">Loading...</h1>
      */}
    </div>
  );
};

export default LoadingScreen;
