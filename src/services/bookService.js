const API_BASE_URL = "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1";

/**
 * Fetch books from API with optional filters
 * @param {Object} params - Query parameters (page, year, genre, keyword)
 */
export const fetchBooks = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    // Add query parameters if provided
    if (params.page) queryParams.append("page", params.page);
    if (params.year) queryParams.append("year", params.year);
    if (params.genre) queryParams.append("genre", params.genre);
    if (params.keyword) queryParams.append("keyword", params.keyword);

    const url = `${API_BASE_URL}/book${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if API returns error message
    if (data.message) {
      console.log("API Message:", data.message);
      return { books: [], pagination: null };
    }

    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

/**
 * Fetch random book with optional filters
 * @param {Object} params - Query parameters (year, genre, keyword)
 */
export const fetchRandomBook = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.year) queryParams.append("year", params.year);
    if (params.genre) queryParams.append("genre", params.genre);
    if (params.keyword) queryParams.append("keyword", params.keyword);

    const url = `${API_BASE_URL}/random_book${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if API returns error message
    if (data.message) {
      console.log("API Message:", data.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching random book:", error);
    throw error;
  }
};

/**
 * Transform API book data to component structure
 */
export const transformBookData = (book) => {
  const extractPrice = (priceString) => {
    if (!priceString) return 0;
    const cleaned = priceString.replace(/[^\d]/g, "");
    return parseInt(cleaned) || 0;
  };

  const extractNumber = (str) => {
    if (!str) return 0;
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const price = extractPrice(book.details?.price);
  const displayPrice = price > 0 ? price : 0;
  const originalPrice = price > 0 ? price + 50000 : 0;

  return {
    id: book._id || Math.random().toString(36).substr(2, 9),
    title: book.title || "Untitled",
    price: parseFloat(displayPrice),
    originalPrice: parseFloat(originalPrice),
    availability: "In Stock",
    description: book.summary || "No description available",
    pages: extractNumber(book.details?.total_pages) || 0,
    publisher: book.publisher || "Unknown Publisher",
    isbn: book.details?.isbn || "N/A",
    published: book.details?.published_date || "Unknown",
    category: book.category?.name || "General",
    categories: [book.category?.name || "General"],
    image:
      book.cover_image ||
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&q=80",
    images: [
      book.cover_image ||
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80",
    ],
    author: book.author?.name || "Unknown Author",
    tags: book.tags || [],
    buyLinks: book.buy_links?.url || [],
    size: book.details?.size || "N/A",
    format: book.details?.format || "N/A",
  };
};

/**
 * Get featured book (random book with year 2023)
 */
export const getFeaturedBook = async () => {
  try {
    const book = await fetchRandomBook({ year: 2023 });

    if (book) {
      return transformBookData(book);
    }

    const data = await fetchBooks({ page: 1 });
    if (data.books && data.books.length > 0) {
      return transformBookData(data.books[0]);
    }

    return null;
  } catch (error) {
    console.error("Error getting featured book:", error);
    return null;
  }
};

/**
 * Get reading list (Self-Improvement books from 2023)
 */
export const getReadingList = async () => {
  try {
    const data = await fetchBooks({
      page: 1,
      year: 2023,
      genre: "Self-Improvement",
    });

    if (data.books && data.books.length > 0) {
      return data.books.slice(0, 4).map(transformBookData);
    }

    // Fallback: get any books
    const fallbackData = await fetchBooks({ page: 1 });
    if (fallbackData.books && fallbackData.books.length > 0) {
      return fallbackData.books.slice(0, 4).map(transformBookData);
    }

    return [];
  } catch (error) {
    console.error("Error getting reading list:", error);
    return [];
  }
};

/**
 * Get books for you (books from 2023, max 8)
 */
export const getBooksForYou = async () => {
  try {
    const data = await fetchBooks({
      page: 1,
      year: 2023,
    });

    if (data.books && data.books.length > 0) {
      return data.books.slice(0, 8).map(transformBookData);
    }

    return [];
  } catch (error) {
    console.error("Error getting books for you:", error);
    return [];
  }
};

/**
 * Search books with filters
 * @param {Object} filters - Search filters (page, year, genre, keyword)
 */
export const searchBooks = async (filters = {}) => {
  try {
    const data = await fetchBooks(filters);

    if (data.books && data.books.length > 0) {
      return {
        books: data.books.map(transformBookData),
        pagination: data.pagination,
      };
    }

    return {
      books: [],
      pagination: null,
    };
  } catch (error) {
    console.error("Error searching books:", error);
    return {
      books: [],
      pagination: null,
    };
  }
};
