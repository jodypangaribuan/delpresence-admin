// API URL for backend
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Interface for read-only lecturer fields (from campus API)
export interface ReadOnlyLecturerFields {
  identity_number: string;
  lecturer_number: string;
  full_name: string;
  email: string;
  department: string;
  academic_rank: string;
  academic_rank_desc: string;
  education_level: string;
  status: string;
}

// Interface for editable lecturer fields
export interface EditableLecturerFields {
  avatar: string;
  biography: string;
  publications: string;
  phone_number: string;
  address: string;
}

// Interface for lecturer profile
export interface LecturerDetails {
  id: number;
  lecturer_user_id: number;
  campus_user_id: number;
  last_sync_at: string;
  editable_fields: EditableLecturerFields;
  readonly_fields: ReadOnlyLecturerFields;
}

/**
 * Get lecturer profile for current user
 * @returns Lecturer profile details
 */
export async function getLecturerProfile(): Promise<LecturerDetails> {
  const token = getCookie("access_token");
  const campusUserID = getCookie("campus_user_id");

  if (!token) {
    throw new Error("Not authenticated");
  }

  // Add campus_user_id as query parameter if available
  let url = `${API_URL}/lecturer/profile`;
  if (campusUserID) {
    url += `?campus_user_id=${campusUserID}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch lecturer profile");
  }

  const data = await response.json();
  return data.lecturer;
}

/**
 * Sync lecturer profile with campus API data
 * @returns Updated lecturer profile details
 */
export async function syncLecturerProfile(): Promise<LecturerDetails> {
  const token = getCookie("access_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}/lecturer/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to sync lecturer profile with campus API");
  }

  const data = await response.json();
  return data.lecturer;
}

/**
 * Update editable lecturer profile fields
 * @param profileData Partial lecturer data with fields to update
 * @returns Updated lecturer profile
 */
export async function updateLecturerProfile(
  profileData: Partial<EditableLecturerFields>
): Promise<LecturerDetails> {
  const token = getCookie("access_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}/lecturer/profile`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to update lecturer profile");
  }

  const data = await response.json();
  return data.lecturer;
}

// Helper to get cookie value
function getCookie(name: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
