/**
 * Format number to Indonesian Rupiah currency format
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string (e.g., "Rp 150.000")
 */
export const formatRupiah = (amount) => {
  if (!amount || amount === 0) return 'Rp 0';
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
