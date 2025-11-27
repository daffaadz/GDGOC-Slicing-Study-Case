import React from 'react';
import { CaretRight } from '@phosphor-icons/react';

const Breadcrumb = () => {
  return (
    <div className="bg-[#FAFAFA] py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="flex items-center gap-2 text-sm">
          <a href="#" className="text-gray-700 hover:text-teal-600 font-semibold">Home</a>
          <CaretRight size={16} className="text-gray-400" />
          <span className="text-gray-400">Shop</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;