// API URL for backend proxy to campus authentication
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
const CAMPUS_LOGIN_PROXY_URL = `${API_URL}/auth/campus/login`;
const LECTURER_PROFILE_URL = `${API_URL}/lecturer/profile`;

// Types for API responses
export interface CampusTokens {
  token: string;
  refresh_token: string;
}

export interface UserPosition {
  struktur_jabatan_id: number;
  jabatan: string;
}

export interface CampusUser {
  user_id: number;
  username: string;
  email: string;
  role: string;
  status: number;
  jabatan: UserPosition[];
  // Optional admin fields
  access_level?: string;
  position?: string;
  department?: string;
  avatar?: string;
  // Optional lecturer fields
  expertise?: string;
  education?: string;
  office_hours?: string;
}

export interface CampusLoginResponse {
  result: boolean;
  error: string;
  success: string;
  user: CampusUser;
  token: string;
  refresh_token: string;
}

// Role types for the application
export enum UserRole {
  STUDENT = "Mahasiswa",
  LECTURER = "Dosen",
  ASSISTANT = "Asisten Dosen",
  ADMIN = "Admin",
  UNKNOWN = "Unknown",
}

// Login function
export async function login(
  username: string,
  password: string
): Promise<CampusLoginResponse> {
  // Create form data
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    // First try to login with campus API
    const response = await fetch(CAMPUS_LOGIN_PROXY_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Parse response
      const data = await response.json();

      // Save auth data to cookies if login successful
      if (data.result) {
        saveTokens({
          token: data.token,
          refresh_token: data.refresh_token,
        });
        saveUserInfo(data.user);

        // For lecturer and assistant, fetch and save profile
        if (
          data.user.role === UserRole.LECTURER ||
          data.user.role === UserRole.ASSISTANT
        ) {
          try {
            // Fetch lecturer or assistant profile as appropriate
            if (data.user.role === UserRole.LECTURER) {
              // Fetch lecturer profile
              const profileResponse = await fetch(LECTURER_PROFILE_URL, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${data.token}`,
                  "Content-Type": "application/json",
                },
              });

              if (profileResponse.ok) {
                console.log("Lecturer profile synchronized");
              }
            } else {
              // Fetch assistant profile
              const profileResponse = await fetch(
                `${API_URL}/assistant/profile`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${data.token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (profileResponse.ok) {
                console.log("Assistant profile synchronized");
              }
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        }
      }

      return data;
    }

    // If campus login fails, try admin login
    return tryAdminLogin(username, password);
  } catch (error) {
    // If campus API is down or network error, try admin login
    console.error("Campus login error:", error);
    return tryAdminLogin(username, password);
  }
}

// Try admin login if campus login fails
async function tryAdminLogin(
  username: string,
  password: string
): Promise<CampusLoginResponse> {
  try {
    // Try admin login
    const adminResponse = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // Parse response
    const adminData = await adminResponse.json();

    // If admin login is successful
    if (adminResponse.ok && adminData.result) {
      // Save auth data to cookies
      saveTokens({
        token: adminData.token,
        refresh_token: adminData.refresh_token,
      });
      saveUserInfo(adminData.user);

      return adminData;
    }

    // If admin login also fails
    throw new Error(
      adminData.error || "Login gagal. Periksa username dan password Anda."
    );
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Login gagal. Periksa username dan password Anda.");
  }
}

// Save tokens to cookies
export function saveTokens(tokens: CampusTokens): void {
  // Assuming token expires in 1 hour (3600 seconds)
  const expiryTime = 3600;

  document.cookie = `access_token=${tokens.token}; path=/; max-age=${expiryTime}; SameSite=Strict`;
  document.cookie = `refresh_token=${tokens.refresh_token}; path=/; max-age=604800; SameSite=Strict`; // 7 days
  document.cookie = `token_expiry=${
    Date.now() + expiryTime * 1000
  }; path=/; max-age=${expiryTime}; SameSite=Strict`;

  // Also save as campus_token for campus API integration
  document.cookie = `campus_token=${tokens.token}; path=/; max-age=${expiryTime}; SameSite=Strict`;
}

// Save user info to cookies
export function saveUserInfo(user: CampusUser): void {
  document.cookie = `user=${JSON.stringify(
    user
  )}; path=/; max-age=604800; SameSite=Strict`;
  document.cookie = `user_role=${user.role}; path=/; max-age=604800; SameSite=Strict`;
  document.cookie = `campus_user_id=${user.user_id}; path=/; max-age=604800; SameSite=Strict`;
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
  // Clear cookies
  document.cookie = "access_token=; path=/; max-age=0";
  document.cookie = "refresh_token=; path=/; max-age=0";
  document.cookie = "token_expiry=; path=/; max-age=0";
  document.cookie = "user=; path=/; max-age=0";
  document.cookie = "user_role=; path=/; max-age=0";
  document.cookie = "campus_user_id=; path=/; max-age=0";
  document.cookie = "campus_token=; path=/; max-age=0";
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

// Get user role
export function getUserRole(): UserRole {
  if (typeof window === "undefined") return UserRole.UNKNOWN;

  const role = getCookie("user_role");

  if (role === UserRole.LECTURER) return UserRole.LECTURER;
  if (role === UserRole.ASSISTANT) return UserRole.ASSISTANT;
  if (role === UserRole.ADMIN) return UserRole.ADMIN;

  return UserRole.UNKNOWN;
}

// Check if user is a student
export function isStudent(): boolean {
  return getUserRole() === UserRole.STUDENT;
}

// Check if user is a lecturer
export function isLecturer(): boolean {
  return getUserRole() === UserRole.LECTURER;
}

// Check if user is an assistant
export function isAssistant(): boolean {
  return getUserRole() === UserRole.ASSISTANT;
}

// Check if user is logged in as admin
export function isAdmin(): boolean {
  const userRole = getCookie("user_role");
  return userRole === UserRole.ADMIN;
}

// Get authenticated user
export function getUser(): CampusUser | null {
  if (typeof window === "undefined") return null;

  const userJson = getCookie("user");
  if (!userJson) return null;

  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

// Get campus API token for admin operations
export function getCampusToken(): string | null {
  // First try to get the token from cookies
  const token = getCookie("campus_token");

  // Log the token status to console
  console.log("getCampusToken called. Token exists:", !!token);

  // If we have a token, return it
  if (token) {
    return token;
  }

  console.log("No campus token found in cookies, trying to refresh...");

  // If we don't have a token in cookies, try to get a fresh one
  // This is done in an async way, so we still return null here
  // and let the caller handle the case when no token is available
  refreshCampusToken().catch((err) =>
    console.error("Failed to refresh campus token:", err)
  );

  return null;
}

/**
 * Refresh the campus token by making a request to the backend
 * This function is used internally by getCampusToken
 */
export async function refreshCampusToken(): Promise<string> {
  const token = getCookie("access_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}/auth/campus/token`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campus token");
  }

  const data = await response.json();

  // Store the campus token in a cookie
  if (data.token) {
    document.cookie = `campus_token=${data.token}; path=/; max-age=3000; SameSite=Strict`;
    return data.token;
  } else {
    throw new Error("Invalid campus token response");
  }
}

// Get user positions/roles
export function getUserPositions(): UserPosition[] {
  const user = getUser();
  return user?.jabatan || [];
}

// Convert role from API to UserRole enum
export function convertRoleToUserRole(role: string): UserRole {
  if (role === "Mahasiswa") return UserRole.STUDENT;
  if (role === "Dosen") return UserRole.LECTURER;
  if (role === "Asisten Dosen") return UserRole.ASSISTANT;
  if (role === "Admin") return UserRole.ADMIN;
  return UserRole.UNKNOWN;
}
