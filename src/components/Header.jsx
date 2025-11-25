import React from 'react';
import { ChevronRight, Search, ShoppingCart, Heart, Menu, X, Phone, Mail, Instagram, Facebook, Youtube, Twitter, User } from 'lucide-react';

const Header = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header>
      <div className="container mx-auto overflow-hidden">
        {/* Top Bar */}
        <div className="bg-[#23856D] text-white flex items-center justify-around px-32 py-6 text-sm border-b border-teal-500">
          <div className="flex items-center gap-6">
            <a href="tel:2255550118" className="flex items-center gap-2 hover:text-teal-100">
              <Phone size={14} />
              <span>(225) 555-0118</span>
            </a>
            <a href="mailto:michelle.rivera@example.com" className="hidden md:flex items-center gap-2 hover:text-teal-100">
              <Mail size={14} />
              <span>michelle.rivera@example.com</span>
            </a>
          </div>
          <div>
            <span className="hidden md:inline">Follow Us and get a chance to win 80% off</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Follow Us :</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-teal-100"><Instagram size={16} /></a>
              <a href="#" className="hover:text-teal-100"><Youtube size={16} /></a>
              <a href="#" className="hover:text-teal-100"><Facebook size={16} /></a>
              <a href="#" className="hover:text-teal-100"><Twitter size={16} /></a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white text-black flex items-center justify-between px-32 py-4">
          <div className="text-2xl font-bold">Bookstar</div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="hover:text-teal-100">Home</a>
            <a href="#" className="flex items-center gap-1 hover:text-teal-100">
              Shop <ChevronRight size={16} />
            </a>
            <a href="#" className="hover:text-teal-100">About</a>
            <a href="#" className="hover:text-teal-100">Blog</a>
            <a href="#" className="hover:text-teal-100">Contact</a>
            <a href="#" className="hover:text-teal-100">Pages</a>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="hidden lg:flex items-center gap-2 text-blue-400 hover:text-blue-300">
              <User size={16} />
              <span>Login / Register</span>
            </a>
            <button className="hover:text-teal-100 text-blue-400">
              <Search size={20} />
            </button>
            <button className="hover:text-teal-100 text-blue-400 flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>1</span>
            </button>
            <button className="hidden hover:text-teal-100 text-blue-400 lg:flex items-center gap-2">
              <Heart size={20} />
              <span>1</span>
            </button>
            <button onClick={onMenuToggle} className="lg:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;