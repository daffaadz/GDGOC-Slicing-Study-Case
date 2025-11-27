import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';

const SearchBar = ({ isOpen, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const debounceTimer = setTimeout(() => {
        onSearch(searchQuery.trim());
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      onSearch('');
    }
  }, [searchQuery, onSearch]);

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <div 
      className={`bg-white border-b border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 py-4">
        <div className="relative flex items-center max-w-2xl mx-auto">
          <MagnifyingGlassIcon 
            size={20} 
            className="absolute left-3 sm:left-4 text-gray-400"
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books by title..."
            className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
          />
          <button
            onClick={handleClose}
            className="absolute right-3 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close search"
          >
            <XIcon size={20} weight="bold" />
          </button>
        </div>
        {searchQuery && (
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 animate-fade-in">
            Searching for: <span className="font-semibold text-teal-600">{searchQuery}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
