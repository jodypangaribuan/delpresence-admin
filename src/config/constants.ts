// API URL for backend services
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// JWT storage key in localStorage
export const JWT_STORAGE_KEY = "delpresence_token";

// Session timeout in minutes
export const SESSION_TIMEOUT = 60; // 1 hour

// Default pagination settings
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

// Date format for displaying dates
export const DATE_FORMAT = "MMMM dd, yyyy";
export const TIME_FORMAT = "HH:mm";
export const DATETIME_FORMAT = "MMMM dd, yyyy HH:mm";

// Application title
export const APP_TITLE = "DelPresence Admin";

// Maximum file upload size in bytes
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
