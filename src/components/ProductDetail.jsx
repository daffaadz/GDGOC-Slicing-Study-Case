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
    <div className="col-span-3 space-y-4">
      <div className="flex flex-wrap gap-2 max-w-full">
        {book.tags && book.tags.length > 0 && book.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="px-4 py-2 bg-[#E0E0E0] text-black rounded-full text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
            title={tag.name}
          >
            {tag.name}
          </span>
        ))}
        {book.tags && book.tags.length > 3 && (
          <span className="px-4 py-2 bg-[#E0E0E0] text-gray-600 rounded-full text-sm whitespace-nowrap">
            +{book.tags.length - 3} more
          </span>
        )}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{book.title}</h1>

      <div className="text-3xl font-bold text-gray-900">{formatRupiah(book.price)}</div>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#737373]">Availability :</span>
        <span className="text-blue-400 font-semibold">{book.availability}</span>
      </div>

      <div>
        <p className={`text-gray-600 leading-relaxed ${!isExpanded && needsExpansion ? 'line-clamp-3' : ''}`}>
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

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex">
          <span className="text-gray-600 w-24">Pages:</span>
          <span className="text-gray-900">{book.pages}</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-24">Publisher:</span>
          <span className="text-gray-900">{book.publisher}</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-24">ISBN:</span>
          <span className="text-gray-900">{book.isbn}</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-24">Published:</span>
          <span className="text-gray-900">{book.published}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Link
          href={getBuyLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold transition-colors inline-block text-center"
          title={book.buyLinks && (Array.isArray(book.buyLinks) ? book.buyLinks.length > 0 : book.buyLinks.trim()) ? 'Buy from official store' : 'Search on Gramedia'}
        >
          Buy Now
        </Link>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <HeartIcon size={20} className="text-gray-700" />
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <ShoppingCartIcon size={20} className="text-gray-700" />
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <EyeIcon size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;