'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MobileMenu from '@/components/MobileMenu';
import Breadcrumb from '@/components/BreadCrumb';
import ImageCarousel from '@/components/ImageCarousel';
import ProductDetail from '@/components/ProductDetail';
import BookCard from '@/components/BookCard';
import { getFeaturedBook, getReadingList, getBooksForYou } from '@/services/bookService';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuredBook, setFeaturedBook] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [booksForYou, setBooksForYou] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [featured, reading, recommendations] = await Promise.all([
          getFeaturedBook(),
          getReadingList(),
          getBooksForYou()
        ]);

        setFeaturedBook(featured);
        setReadingList(reading);
        setBooksForYou(recommendations);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
        <MobileMenu isOpen={isMenuOpen} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent mb-4"></div>
            <p className="text-gray-600 text-lg">Loading books...</p>
            <p className="text-gray-400 text-sm mt-2">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
        <MobileMenu isOpen={isMenuOpen} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <p className="text-red-600 text-lg font-semibold mb-2">{error}</p>
            <p className="text-gray-500 text-sm mb-6">The API might be temporarily unavailable. We've loaded some sample books for you.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} />
      <Breadcrumb />
      
      {/* Product Section */}
      {featuredBook && (
        <section className="container mx-auto px-32 py-8 bg-[#FAFAFA]">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <ImageCarousel images={featuredBook.images} />
            <ProductDetail book={featuredBook} />
          </div>
        </section>
      )}

      {/* Your Reading List */}
      {readingList.length > 0 && (
        <section className="container mx-auto px-32 py-12 bg-[#FAFAFA]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Reading List</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {readingList.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* Books For You */}
      {booksForYou.length > 0 && (
        <section className="container mx-auto px-32 py-12 bg-[#FAFAFA]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Books For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {booksForYou.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}