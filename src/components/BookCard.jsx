import React, { useState } from 'react';
import { formatRupiah } from '@/utils/formatCurrency';

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);
  const placeholderImage = "https://placehold.co/400x600";

  return (
    <div className="group cursor-pointer">
      <div className="bg-gray-300 aspect-3/4 flex items-center justify-center overflow-hidden">
        <img
          src={imageError ? placeholderImage : book.image}
          alt={book.title}
          className="w-2/3 h-auto object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
      </div>
      <div className='bg-white px-2 sm:px-4 py-4 sm:py-8 flex flex-col justify-start gap-1 sm:gap-2 min-h-36 sm:min-h-48'>
        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">{book.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-1">{book.category}</p>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-gray-400 line-through text-xs sm:text-sm">{formatRupiah(book.originalPrice)}</span>
          <span className="text-teal-600 font-bold text-sm sm:text-base">{formatRupiah(book.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;