// components/LoadingScreen.tsx
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white dark:bg-black z-50">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 className="text-2xl text-black dark:text-white mt-4">Loading...</h1>
    </div>
  );
};

export default LoadingScreen;
