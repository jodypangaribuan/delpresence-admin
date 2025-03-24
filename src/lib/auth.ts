// Define the API URL from environment or use default
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Types for API responses
interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

interface User {
  id: number;
  user_id: number;
  user: {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    user_type: string;
    verified: boolean;
  };
}

interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User;
    tokens: Tokens;
    user_type: string;
  };
}

// Student registration interface
export interface StudentRegistrationInput {
  nim: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  email: string;
  password: string;
  major: string;
  faculty: string;
  batch: string;
}

// Lecture registration interface
export interface LectureRegistrationInput {
  nip: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  email: string;
  password: string;
  position: string;
}

// Registration response interface
export interface RegistrationResponse {
  status: string;
  message: string;
  data: User;
}

// Admin login function
export async function loginAdmin(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login");
  }

  return response.json();
}

// Register student function
export async function registerStudent(
  studentData: StudentRegistrationInput
): Promise<RegistrationResponse> {
  const response = await fetch(`${API_URL}/auth/register/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register student");
  }

  return response.json();
}

// Register lecture function
export async function registerLecture(
  lectureData: LectureRegistrationInput
): Promise<RegistrationResponse> {
  const response = await fetch(`${API_URL}/auth/register/lecture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lectureData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register lecturer");
  }

  return response.json();
}

// Save tokens to cookies
export function saveTokens(tokens: Tokens): void {
  // Set cookies with HttpOnly and Secure flags
  document.cookie = `access_token=${tokens.access_token}; path=/; max-age=${tokens.expires_in}; SameSite=Strict`;
  document.cookie = `refresh_token=${tokens.refresh_token}; path=/; max-age=604800; SameSite=Strict`; // 7 days
  document.cookie = `token_expiry=${
    Date.now() + tokens.expires_in * 1000
  }; path=/; max-age=${tokens.expires_in}; SameSite=Strict`;
}

// Save user info to cookies
export function saveUserInfo(user: User, userType: string): void {
  document.cookie = `user=${JSON.stringify(
    user
  )}; path=/; max-age=604800; SameSite=Strict`;
  document.cookie = `user_type=${userType}; path=/; max-age=604800; SameSite=Strict`;
}

// Get cookie by name
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Clear auth data
export function logout(): void {
  const refreshToken = getCookie("refresh_token");

  // Call logout API if refresh token exists
  if (refreshToken) {
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }).catch(() => {
      // Ignore errors during logout
    });
  }

  // Clear cookies
  document.cookie = "access_token=; path=/; max-age=0";
  document.cookie = "refresh_token=; path=/; max-age=0";
  document.cookie = "token_expiry=; path=/; max-age=0";
  document.cookie = "user=; path=/; max-age=0";
  document.cookie = "user_type=; path=/; max-age=0";
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  const token = getCookie("access_token");
  const expiry = getCookie("token_expiry");

  if (!token || !expiry) return false;

  // Check if token is expired
  return parseInt(expiry, 10) > Date.now();
}

// Check if user is admin
export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;

  const userType = getCookie("user_type");
  return userType === "admin";
}

// Get authenticated user
export function getUser(): User | null {
  if (typeof window === "undefined") return null;

  const userJson = getCookie("user");
  if (!userJson) return null;

  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}
