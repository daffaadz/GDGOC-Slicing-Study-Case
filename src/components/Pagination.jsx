import React from 'react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

const Pagination = ({ currentPage, totalPages, onPageChange, isLoading }) => {
    return (
        <div className="flex items-center justify-center gap-3 mt-8">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700 transition-all cursor-pointer font-medium"
                aria-label="Previous page"
            >
                <CaretLeftIcon size={18} weight="bold" />
                <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Info */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded">
                <span className="text-gray-600 font-medium">
                    Page <span className="text-teal-600 font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                </span>
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700 transition-all cursor-pointer font-medium"
                aria-label="Next page"
            >
                <span className="hidden sm:inline">Next</span>
                <CaretRightIcon size={18} weight="bold" />
            </button>
        </div>
    );
};

export default Pagination;
