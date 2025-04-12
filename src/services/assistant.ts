import { API_BASE_URL } from "@/config/api";

// API URL for backend
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Interface for read-only assistant fields (from campus API)
export interface ReadOnlyAssistantFields {
  identity_number: string;
  username: string;
  full_name: string;
  email: string;
  department: string;
  job_title: string;
  alias: string;
  status: string;
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

export interface Assistant {
  id: number;
  uuid?: string;
  assistant_user_id?: number;
  identity_number: string;
  full_name: string;
  email: string;
  department_id?: number;
  department: string;
  job_title?: string;
  campus_user_id?: number;
  username: string;
  alias?: string;

  // For backward compatibility with existing code
  assistantId?: number;
  identityNumber?: string;
  fullName?: string;
  departmentId?: number;
  jobTitle?: string;
  campusUserId?: number;

  avatar?: string;
  biography?: string;
  phone_number?: string;
  phoneNumber?: string;
  address?: string;
  status: string;
  last_sync_at?: string;
  lastSyncAt?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
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

/**
 * Fetches all assistants from the API
 */
export async function getAllAssistants(): Promise<Assistant[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/assistants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error response body:", errorBody);
      const errorText = response.statusText || "Unknown error";
      throw new Error(
        `Error fetching assistants: ${errorText} (${response.status})`
      );
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.data?.length || 0} assistants`);
    return data.data;
  } catch (error) {
    console.error("Error fetching assistants:", error);
    throw error;
  }
}

/**
 * Syncs assistants with the campus API
 */
export async function syncCampusAssistants(): Promise<{
  message: string;
  data: Assistant[];
}> {
  try {
    console.log("Requesting sync with campus API");

    const response = await fetch(`${API_BASE_URL}/admin/assistants/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Sync error response body:", errorBody);
      const statusText = response.statusText || "Unknown error";
      throw new Error(
        `Error syncing with campus API: ${statusText} (${response.status})`
      );
    }

    const data = await response.json();
    console.log(`Successfully synced ${data.data?.length || 0} assistants`);
    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Error syncing assistants with campus API:", error);
    throw error;
  }
}

/**
 * Get assistant by ID
 */
export async function getAssistantById(id: number): Promise<Assistant> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/assistants/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to get assistant with ID ${id}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error getting assistant with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Update assistant by ID
 */
export async function updateAssistant(
  id: number,
  updatedData: Partial<Assistant>
): Promise<Assistant> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/assistants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to update assistant with ID ${id}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error updating assistant with ID ${id}:`, error);
    throw error;
  }
}
