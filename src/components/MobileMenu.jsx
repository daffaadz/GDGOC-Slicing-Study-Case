import React from 'react';
import { User } from '@phosphor-icons/react';

const MobileMenu = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="lg:hidden bg-white border-b">
      <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
        <a href="#" className="hover:text-teal-600">Home</a>
        <a href="#" className="hover:text-teal-600">Shop</a>
        <a href="#" className="hover:text-teal-600">About</a>
        <a href="#" className="hover:text-teal-600">Blog</a>
        <a href="#" className="hover:text-teal-600">Contact</a>
        <a href="#" className="hover:text-teal-600">Pages</a>
        <a href="#" className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
          <User size={16} />
          <span>Login / Register</span>
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;