import React from 'react';
import { UserIcon } from '@phosphor-icons/react';

const MobileMenu = ({ isOpen }) => {
  return (
    <div 
      className={`lg:hidden bg-white border-b shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <nav className="container mx-auto px-4 py-6 flex flex-col items-center gap-6 text-center">
        <a href="#" className="text-gray-700 hover:text-teal-600 font-medium text-lg">Home</a>
        <a href="#" className="text-gray-700 hover:text-teal-600 font-medium text-lg">Shop</a>
        <a href="#" className="text-gray-700 hover:text-teal-600 font-medium text-lg">About</a>
        <a href="#" className="text-gray-700 hover:text-teal-600 font-medium text-lg">Blog</a>
        <a href="#" className="text-gray-700 hover:text-teal-600 font-medium text-lg">Contact</a>
        <a href="#" className="text-gray-700 hover:text-teal-600 font-medium text-lg">Pages</a>
        <a href="#" className="flex items-center gap-2 text-blue-400 hover:text-blue-500 font-medium text-lg mt-2">
          <UserIcon size={20} />
          <span>Login / Register</span>
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;