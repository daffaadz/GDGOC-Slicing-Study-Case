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
      <div className='bg-white px-4 py-8 flex flex-col justify-start gap-2 min-h-48'>
        <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.category}</p>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 line-through text-sm">{formatRupiah(book.originalPrice)}</span>
          <span className="text-teal-600 font-bold">{formatRupiah(book.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;