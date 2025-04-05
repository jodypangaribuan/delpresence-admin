import { getCookie } from "@/services/auth";

// API URL for backend
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Interface for read-only assistant fields (from campus API)
export interface ReadOnlyAssistantFields {
  identity_number: string; // nip - "0302230478"
  full_name: string; // nama - "Fajar Sam Hutabarat, S.T."
  email: string; // email - "faja.hutabarat@del.ac.id"
  department: string; // Institusi - "Institut Teknologi Del"
  job_title: string; // jabatan - "Laboran TE"
  struktur_id: number; // struktur_jabatan_id - 257
  employee_id: number; // pegawai_id - 536
  employee_status: string; // status_pegawai - "K"
  employee_status_text: string; // Teks status - "Keluar/Tidak aktif lagi"
  alias: string; // alias - "FSH"
  position: string; // posisi - "-"
  username: string; // user_name - "fajar.hutabarat"
}

// Interface for editable assistant fields
export interface EditableAssistantFields {
  avatar: string;
  biography: string;
  phone_number: string;
  address: string;
}

// Interface for assistant profile
export interface AssistantDetails {
  id: number;
  assistant_user_id: number;
  campus_user_id: number;
  last_sync_at: string;
  editable_fields: EditableAssistantFields;
  readonly_fields: ReadOnlyAssistantFields;
}

/**
 * Get assistant profile for current user
 * @returns Assistant profile details
 */
export async function getAssistantProfile(): Promise<AssistantDetails> {
  const token = getCookie("access_token");
  const campusUserID = getCookie("campus_user_id");

  if (!token) {
    throw new Error("Not authenticated");
  }

  // Add campus_user_id as query parameter if available
  let url = `${API_URL}/assistant/profile`;
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
    throw new Error("Failed to fetch assistant profile");
  }

  const data = await response.json();
  return data.assistant;
}

/**
 * Sync assistant profile with campus API data
 * @returns Updated assistant profile details
 */
export async function syncAssistantProfile(): Promise<AssistantDetails> {
  const token = getCookie("access_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}/assistant/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to sync assistant profile with campus API");
  }

  const data = await response.json();
  return data.assistant;
}

/**
 * Update editable assistant profile fields
 * @param profileData Partial assistant data with fields to update
 * @returns Updated assistant profile
 */
export async function updateAssistantProfile(
  profileData: Partial<EditableAssistantFields>
): Promise<AssistantDetails> {
  const token = getCookie("access_token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}/assistant/profile`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to update assistant profile");
  }

  const data = await response.json();
  return data.assistant;
}
