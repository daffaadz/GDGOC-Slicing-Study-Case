// components/ProductDetail.jsx

import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const ProductDetail = ({ book }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = 3;
  
  const needsExpansion = book.description && book.description.length > 200;

  return (
    <div className="col-span-3 space-y-4">
      <div className="flex gap-2">
        {book.tags.map((tag, idx) => (
          <span key={idx} className="px-4 py-2 bg-[#E0E0E0] text-black rounded-full text-sm">
            {tag.name}
          </span>
        ))}
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{book.title}</h1>
      
      <div className="text-3xl font-bold text-gray-900">Rp{book.price}</div>
      
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
                See Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                See More <ChevronDown size={16} />
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
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">
          Buy Now
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <Heart size={20} className="text-gray-700" />
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <ShoppingCart size={20} className="text-gray-700" />
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
          <Eye size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;