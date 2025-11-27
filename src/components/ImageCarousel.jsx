import React, { useState } from 'react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

const ImageCarousel = ({ images, onPrevious, onNext, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const placeholderImage = "https://placehold.co/400x600";

  const handlePreviousBook = () => {
    setCurrentIndex(0);
    setImageError(false);
    if (onPrevious) onPrevious();
  };

  const handleNextBook = () => {
    setCurrentIndex(0);
    setImageError(false);
    if (onNext) onNext();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative lg:w-2/3 bg-teal-600 aspect-5/4 flex items-center justify-center overflow-hidden">
      {/* Book Navigation - Left (Previous Book - Lower ID) */}
      <button
        onClick={handlePreviousBook}
        disabled={isLoading}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-110 bg-transparent rounded-full p-1 sm:p-0"
        title="Previous Book (Lower ID)"
      >
        <CaretLeftIcon size={32} weight='bold' className="text-white sm:w-10 sm:h-10" />
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
        </div>
      ) : (
        <img
          src={imageError ? placeholderImage : images[currentIndex]}
          alt="Product"
          className="h-5/6 w-auto object-cover shadow-2xl transition-opacity duration-300"
          onError={handleImageError}
        />
      )}

      {/* Book Navigation - Right (Next Book - Higher ID) */}
      <button
        onClick={handleNextBook}
        disabled={isLoading}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-110 bg-transparent rounded-full p-1 sm:p-0"
        title="Next Book (Higher ID)"
      >
        <CaretRightIcon size={32} weight='bold' className="text-white sm:w-10 sm:h-10" />
      </button>

      {/* Image Navigation Dots (if multiple images) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setImageError(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;