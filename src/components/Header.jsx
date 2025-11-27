import React from 'react';
import { CaretRightIcon, MagnifyingGlassIcon, ShoppingCartIcon, HeartIcon, ListIcon, XIcon, PhoneIcon, EnvelopeIcon, InstagramLogoIcon, FacebookLogoIcon, YoutubeLogoIcon, TwitterLogoIcon, UserIcon } from '@phosphor-icons/react';

const Header = ({ onMenuToggle, isMenuOpen, onSearchToggle }) => {
  return (
    <header>
      <div className="overflow-hidden">
        {/* Top Bar */}
        <div className="w-full bg-[#23856D] hidden text-white md:flex items-center justify-between md:justify-around px-4 sm:px-8 md:px-16 lg:px-32 py-4 md:py-6 text-xs sm:text-sm border-b border-teal-500">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <a href="tel:2255550118" className="flex items-center gap-1 sm:gap-2 hover:text-teal-100">
              <PhoneIcon size={14} className="shrink-0" />
              <span className="hidden xl:inline text-xs sm:text-sm">(225) 555-0118</span>
            </a>
            <a href="mailto:michelle.rivera@example.com" className="hidden md:flex items-center gap-2 hover:text-teal-100">
              <EnvelopeIcon size={14} />
              <span>michelle.rivera@example.com</span>
            </a>
          </div>
          <div className="hidden lg:block">
            <span className="hidden md:inline">Follow Us and get a chance to win 80% off</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden md:inline">Follow Us :</span>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#" className="hover:text-teal-100"><InstagramLogoIcon size={16} weight='fill' /></a>
              <a href="#" className="hover:text-teal-100"><YoutubeLogoIcon size={16} weight='fill' /></a>
              <a href="#" className="hover:text-teal-100"><FacebookLogoIcon size={16} weight='fill' /></a>
              <a href="#" className="hover:text-teal-100"><TwitterLogoIcon size={16} weight='fill' /></a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto bg-white text-black flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 py-6">
          <div className="text-xl sm:text-2xl font-bold">Bookstar</div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="hover:text-teal-100">Home</a>
            <a href="#" className="flex items-center gap-1 hover:text-teal-100">
              Shop <CaretRightIcon size={16} />
            </a>
            <a href="#" className="hover:text-teal-100">About</a>
            <a href="#" className="hover:text-teal-100">Blog</a>
            <a href="#" className="hover:text-teal-100">Contact</a>
            <a href="#" className="hover:text-teal-100">Pages</a>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <a href="#" className="hidden lg:flex items-center gap-2 text-blue-400 hover:text-blue-300">
              <UserIcon size={16} />
              <span>Login / Register</span>
            </a>
            <button
              onClick={onSearchToggle}
              className="hover:text-teal-600 text-blue-400 transition-colors p-1"
              aria-label="Toggle search"
            >
              <MagnifyingGlassIcon size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button className="hover:text-teal-100 text-blue-400 flex items-center gap-1 sm:gap-2">
              <ShoppingCartIcon size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm">1</span>
            </button>
            <button className="hidden hover:text-teal-100 text-blue-400 lg:flex items-center gap-2">
              <HeartIcon size={20} />
              <span>1</span>
            </button>
            <button onClick={onMenuToggle} className="lg:hidden p-1">
              {isMenuOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;