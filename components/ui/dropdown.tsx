"use client";
import React, { useState, useEffect, useRef, FC } from 'react';

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  items: DropdownItem[];
}

const Dropdown: FC<DropdownProps> = ({ direction = 'down', items = [] }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]);

  const getDropdownPositionClasses = () => {
    switch (direction) {
      case 'up':
        return 'bottom-full mb-2';
      case 'down':
        return 'top-full mt-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'top-full mt-2';
    }
  };

  return (
    <div className="relative my-32" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        /*className="relative z-10 block rounded-md bg-white p-2 focus:outline-none"*/
      >
        <svg
          className="h-5 w-5 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className={`absolute ${getDropdownPositionClasses()} py-2 w-48 bg-white rounded-md shadow-xl z-20`}>
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
