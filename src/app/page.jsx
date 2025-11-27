'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import MobileMenu from '@/components/MobileMenu';
import Breadcrumb from '@/components/BreadCrumb';
import ImageCarousel from '@/components/ImageCarousel';
import ProductDetail from '@/components/ProductDetail';
import BookCard from '@/components/BookCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { getReadingList, fetchBooks, transformBookData, searchBooksByTitle } from '@/services/bookService';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuredBook, setFeaturedBook] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [booksForYou, setBooksForYou] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const booksForYouRef = useRef(null);
  const BOOKS_PER_PAGE = 8;
  
  // Search states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [booksData, reading, booksForYouData] = await Promise.all([
          fetchBooks({ page: 1, year: 2023 }),
          getReadingList(),
          fetchBooks({ page: 1, year: 2023 })
        ]);

        // Transform and set all books for carousel
        if (booksData.books && booksData.books.length > 0) {
          const transformedBooks = booksData.books.map(transformBookData);
          setAllBooks(transformedBooks);
          setFeaturedBook(transformedBooks[0]);
          setCurrentBookIndex(0);
        }

        setReadingList(reading);
        
        // Set Books For You with pagination
        if (booksForYouData.books && booksForYouData.books.length > 0) {
          const transformedBooks = booksForYouData.books.map(transformBookData);
          setBooksForYou(transformedBooks.slice(0, BOOKS_PER_PAGE));
          
          // Calculate total pages from pagination info or books length
          if (booksForYouData.pagination && booksForYouData.pagination.total_pages) {
            setTotalPages(booksForYouData.pagination.total_pages);
          } else {
            setTotalPages(Math.ceil(transformedBooks.length / BOOKS_PER_PAGE));
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePreviousBook = async () => {
    if (allBooks.length === 0) return;
    
    setCarouselLoading(true);
    
    const newIndex = currentBookIndex === 0 ? allBooks.length - 1 : currentBookIndex - 1;
    
    setCurrentBookIndex(newIndex);
    setFeaturedBook(allBooks[newIndex]);
    
    setTimeout(() => {
      setCarouselLoading(false);
    }, 300);
  };

  const handleNextBook = async () => {
    if (allBooks.length === 0) return;
    
    setCarouselLoading(true);
    
    const newIndex = currentBookIndex === allBooks.length - 1 ? 0 : currentBookIndex + 1;
    
    setCurrentBookIndex(newIndex);
    setFeaturedBook(allBooks[newIndex]);
    
    setTimeout(() => {
      setCarouselLoading(false);
    }, 300);
  };

  const handlePageChange = useCallback(async (newPage) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;
    
    setPaginationLoading(true);
    
    try {
      const booksData = await fetchBooks({ page: newPage, year: 2023 });
      
      if (booksData.books && booksData.books.length > 0) {
        const transformedBooks = booksData.books.map(transformBookData);
        setBooksForYou(transformedBooks.slice(0, BOOKS_PER_PAGE));
        setCurrentPage(newPage);
        
        if (booksData.pagination && booksData.pagination.total_pages) {
          setTotalPages(booksData.pagination.total_pages);
        }
        
        if (booksForYouRef.current) {
          booksForYouRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    } catch (err) {
      console.error('Error loading page:', err);
    } finally {
      setPaginationLoading(false);
    }
  }, [currentPage, totalPages, BOOKS_PER_PAGE]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    
    if (!query || query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    setSearchLoading(true);
    
    try {
      const booksData = await searchBooksByTitle(query);
      
      if (booksData.books && booksData.books.length > 0) {
        const transformedBooks = booksData.books.map(transformBookData);
        setSearchResults(transformedBooks);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error searching books:', err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
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
      <Header 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
        isMenuOpen={isMenuOpen}
        onSearchToggle={handleSearchToggle}
      />
      <SearchBar 
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          setSearchQuery('');
          setSearchResults([]);
        }}
        onSearch={handleSearch}
      />
      <MobileMenu isOpen={isMenuOpen} />
      
      {/* Search Results */}
      {searchQuery && isSearchOpen ? (
        <section className="container mx-auto px-32 py-12 bg-[#FAFAFA] min-h-screen">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Search Results for "{searchQuery}"
          </h2>
          
          {searchLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent mb-4"></div>
                <p className="text-gray-600">Searching...</p>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {searchResults.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-2">No books found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm">Try different keywords or check the spelling</p>
            </div>
          )}
        </section>
      ) : (
        <>
          <Breadcrumb />
      
      {/* Product Section */}
      {featuredBook && (
        <section className="container mx-auto px-32 py-8 bg-[#FAFAFA]">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <ImageCarousel 
              images={featuredBook.images} 
              onPrevious={handlePreviousBook}
              onNext={handleNextBook}
              isLoading={carouselLoading}
            />
            <ProductDetail book={featuredBook} />
          </div>
          {allBooks.length > 0 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Book {currentBookIndex + 1} of {allBooks.length}
            </div>
          )}
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
        <section ref={booksForYouRef} className="container mx-auto px-32 py-12 bg-[#FAFAFA]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Books For You</h2>
          
          {paginationLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent mb-4"></div>
                <p className="text-gray-600">Loading books...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {booksForYou.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={paginationLoading}
                />
              )}
            </>
          )}
        </section>
      )}
        </>
      )}
    </div>
  );
}