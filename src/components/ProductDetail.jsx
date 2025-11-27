// components/ProductDetail.jsx

import React, { useState } from 'react';
import Link from 'next/link';
import { HeartIcon, ShoppingCartIcon, EyeIcon, CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { formatRupiah } from '@/utils/formatCurrency';

const ProductDetail = ({ book }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = 3;

  const needsExpansion = book.description && book.description.length > 200;

  // Generate buy link
  const getBuyLink = () => {
    if (book.buyLinks && Array.isArray(book.buyLinks) && book.buyLinks.length > 0) {
      return book.buyLinks[0];
    } else if (book.buyLinks && typeof book.buyLinks === 'string' && book.buyLinks.trim()) {
      return book.buyLinks;
    } else {
      const searchQuery = encodeURIComponent(`${book.title} ${book.author || ''}`);
      return `https://www.gramedia.com/search?q=${searchQuery}`;
    }
  };

  return (
    <div className="lg:w-2/3 space-y-2 sm:space-y-4">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 max-w-full">
        {book.tags && book.tags.length > 0 && book.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="px-3 sm:px-4 py-2 bg-[#E0E0E0] text-black rounded-full text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[200px]"
            title={tag.name}
          >
            {tag.name}
          </span>
        ))}
        {book.tags && book.tags.length > 3 && (
          <span className="px-3 sm:px-4 py-1 sm:py-2 bg-[#E0E0E0] text-gray-600 rounded-full text-xs sm:text-sm whitespace-nowrap">
            +{book.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="mt-4 lg:mt-0 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{book.title}</h1>

      {/* Price */}
      <div className="text-xl mb-4 lg:mb-0 sm:text-2xl lg:text-3xl font-bold text-gray-900">{formatRupiah(book.price)}</div>

      {/* Availability */}
      <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
        <span className="font-semibold text-[#737373] text-sm">Availability :</span>
        <span className="text-blue-400 font-semibold text-sm">{book.availability}</span>
      </div>

      {/* Description */}
      <div>
        <p className={`text-gray-600 leading-relaxed text-sm sm:text-base ${!isExpanded && needsExpansion ? 'line-clamp-3' : ''}`}>
          {book.description}
        </p>
        {needsExpansion && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold text-sm transition-colors"
          >
            {isExpanded ? (
              <>
                See Less <CaretUpIcon size={16} />
              </>
            ) : (
              <>
                See More <CaretDownIcon size={16} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Book Details */}
      <div className="border-t pt-4 space-y-2 text-xs sm:text-sm">
        <div className="flex">
          <span className="text-gray-600 w-20 sm:w-24">Pages:</span>
          <span className="text-gray-900">{book.pages}</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-20 sm:w-24">Publisher:</span>
          <span className="text-gray-900 line-clamp-1">{book.publisher}</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-20 sm:w-24">ISBN:</span>
          <span className="text-gray-900">{book.isbn}</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-20 sm:w-24">Published:</span>
          <span className="text-gray-900">{book.published}</span>
        </div>
      </div>

      {/* Action Buttons - Mobile at bottom, Desktop inline */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link
          href={getBuyLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold transition-colors inline-block text-center"
          title={book.buyLinks && (Array.isArray(book.buyLinks) ? book.buyLinks.length > 0 : book.buyLinks.trim()) ? 'Buy from official store' : 'Search on Gramedia'}
        >
          Buy Now
        </Link>
        <div className="flex gap-2 justify-center sm:justify-start">
          <button className="p-3 border border-gray-300 rounded hover:bg-gray-50 flex-1 sm:flex-none flex items-center justify-center gap-2">
            <HeartIcon size={18} className="sm:w-5 sm:h-5 text-gray-700" />
            <span className="sm:hidden text-sm">0</span>
          </button>
          <button className="p-3 border border-gray-300 rounded hover:bg-gray-50 flex-1 sm:flex-none flex items-center justify-center gap-2">
            <ShoppingCartIcon size={18} className="sm:w-5 sm:h-5 text-gray-700" />
            <span className="sm:hidden text-sm">0</span>
          </button>
          <button className="p-3 border border-gray-300 rounded hover:bg-gray-50 flex-1 sm:flex-none flex items-center justify-center gap-2">
            <EyeIcon size={18} className="sm:w-5 sm:h-5 text-gray-700" />
            <span className="sm:hidden text-sm">0</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;