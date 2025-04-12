// API base URL for the application
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Default headers for API requests
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000; // 30 seconds
