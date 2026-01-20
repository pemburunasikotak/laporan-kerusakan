/**
 * Utility functions for date and time formatting
 */

/**
 * Format epoch timestamp to readable date time
 * Supports both seconds and milliseconds automatically
 * @param {number} epochTime - Epoch time in seconds or milliseconds
 * @param {string} format - Format type: 'datetime', 'date', or 'time'
 * @returns {string} Formatted date/time string
 */
export const formatEpochTime = (epochTime, format = 'datetime') => {
  if (!epochTime) return '-';
  
  try {
    // Auto-detect if timestamp is in seconds or milliseconds
    // If timestamp < 10000000000, it's likely in seconds (before year 2286)
    let timestamp = epochTime;
    if (epochTime < 10000000000) {
      timestamp = epochTime * 1000; // Convert seconds to milliseconds
    }
    
    const date = new Date(timestamp);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return '-';
    
    switch (format) {
      case 'date':
        return date.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      
      case 'time':
        return date.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
      
      case 'datetime':
      default:
        // Format: "20 Januari 2026 pukul 11:50:32"
        const dateStr = date.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        const timeStr = date.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        return `${dateStr} pukul ${timeStr}`;
    }
  } catch (error) {
    console.error('Error formatting epoch time:', error);
    return '-';
  }
};

/**
 * Format epoch timestamp to relative time (e.g., "2 hours ago")
 * Supports both seconds and milliseconds automatically
 * @param {number} epochTime - Epoch time in seconds or milliseconds
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (epochTime) => {
  if (!epochTime) return '-';
  
  try {
    // Auto-detect if timestamp is in seconds or milliseconds
    let timestamp = epochTime;
    if (epochTime < 10000000000) {
      timestamp = epochTime * 1000; // Convert seconds to milliseconds
    }
    
    const now = new Date().getTime();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (seconds < 60) return `${seconds} detik yang lalu`;
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days < 30) return `${days} hari yang lalu`;
    if (months < 12) return `${months} bulan yang lalu`;
    return `${years} tahun yang lalu`;
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '-';
  }
};

/**
 * Format epoch timestamp with custom format string
 * Supports both seconds and milliseconds automatically
 * @param {number} epochTime - Epoch time in seconds or milliseconds
 * @param {string} formatStr - Format string (e.g., 'DD/MM/YYYY HH:mm:ss')
 * @returns {string} Formatted date/time string
 */
export const formatCustomTime = (epochTime, formatStr = 'DD/MM/YYYY HH:mm') => {
  if (!epochTime) return '-';
  
  try {
    // Auto-detect if timestamp is in seconds or milliseconds
    let timestamp = epochTime;
    if (epochTime < 10000000000) {
      timestamp = epochTime * 1000; // Convert seconds to milliseconds
    }
    
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) return '-';
    
    const pad = (num) => String(num).padStart(2, '0');
    
    const replacements = {
      'YYYY': date.getFullYear(),
      'YY': String(date.getFullYear()).slice(-2),
      'MM': pad(date.getMonth() + 1),
      'DD': pad(date.getDate()),
      'HH': pad(date.getHours()),
      'mm': pad(date.getMinutes()),
      'ss': pad(date.getSeconds())
    };
    
    let result = formatStr;
    for (const [key, value] of Object.entries(replacements)) {
      result = result.replace(key, value);
    }
    
    return result;
  } catch (error) {
    console.error('Error formatting custom time:', error);
    return '-';
  }
};
