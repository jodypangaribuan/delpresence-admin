import { getCampusToken } from "./auth";
import {
  Lecturer,
  LecturerResponse,
  LecturerSyncResponse,
} from "@/types/lecturer";
import { API_URL } from "@/config/constants";

// Interface for lecturer profile details with readonly and editable fields
export interface LecturerDetails {
  readonly_fields: {
    id: number;
    uuid?: string;
    full_name: string;
    email: string;
    department: string;
    department_id?: number;
    lecturer_id?: number;
    employee_id?: number;
    identity_number?: string;
    academic_rank: string;
    academic_rank_desc: string;
    education_level: string;
    lecturer_number?: string;
    campus_user_id?: number;
    last_sync_at?: string;
  };
  editable_fields: {
    phone_number: string;
    avatar: string;
    publications: string;
    biography: string;
    address: string;
    office_hours?: string;
    research_interests?: string;
    social_media?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
}

/**
 * Fetch all lecturers from the API
 * @returns Promise<Lecturer[]>
 */
export const getLecturers = async (): Promise<Lecturer[]> => {
  const token = getCampusToken();

  console.log(
    "Getting lecturers with token:",
    token ? "Token exists" : "No token"
  );

  if (!token) {
    console.error("Authentication token is missing. Please login first.");
    throw new Error("Authentication required");
  }

  try {
    const url = `${API_URL}/api/v1/admin/lecturers`;
    console.log("Fetching from URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(
        `Failed to fetch lecturers: ${response.status} ${errorText}`
      );
    }

    const result = (await response.json()) as LecturerResponse;
    console.log("Response data:", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching lecturers:", error);
    throw error;
  }
};

/**
 * Fetch a single lecturer by ID
 * @param id - Lecturer ID
 * @returns Promise<Lecturer>
 */
export const getLecturerById = async (id: number): Promise<Lecturer> => {
  const token = getCampusToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/admin/lecturers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch lecturer: ${response.status} ${errorText}`
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching lecturer with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Update a lecturer
 * @param id - Lecturer ID
 * @param data - Updated lecturer data
 * @returns Promise<Lecturer>
 */
export const updateLecturer = async (
  id: number,
  data: Partial<Lecturer>
): Promise<Lecturer> => {
  const token = getCampusToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/admin/lecturers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update lecturer: ${response.status} ${errorText}`
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error updating lecturer with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Sync lecturers from campus API
 * @returns Promise<Lecturer[]>
 */
export const syncLecturers = async (): Promise<Lecturer[]> => {
  const token = getCampusToken();

  console.log(
    "Syncing lecturers with token:",
    token ? "Token exists" : "No token"
  );

  if (!token) {
    console.error("Authentication token is missing. Please login first.");
    throw new Error("Authentication required");
  }

  try {
    const url = `${API_URL}/api/v1/admin/lecturers/sync`;
    console.log("Syncing from URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Sync response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error sync response body:", errorText);
      throw new Error(
        `Failed to sync lecturers: ${response.status} ${errorText}`
      );
    }

    const result = (await response.json()) as LecturerSyncResponse;
    console.log("Sync response data:", result);
    return result.data;
  } catch (error) {
    console.error("Error syncing lecturers:", error);
    throw error;
  }
};

/**
 * Get lecturer profile (for personal profile)
 * @returns Promise<LecturerDetails>
 */
export const getLecturerProfile = async (): Promise<LecturerDetails> => {
  const token = getCampusToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/lecturer/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch lecturer profile: ${response.status} ${errorText}`
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching lecturer profile:", error);
    throw error;
  }
};

/**
 * Sync lecturer profile with campus API
 * @returns Promise<LecturerDetails>
 */
export const syncLecturerProfile = async (): Promise<LecturerDetails> => {
  const token = getCampusToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/lecturer/profile/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to sync lecturer profile: ${response.status} ${errorText}`
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error syncing lecturer profile:", error);
    throw error;
  }
};

/**
 * Update lecturer profile
 * @param data - Updated profile data
 * @returns Promise<LecturerDetails>
 */
export interface LecturerProfileUpdateData {
  publications?: string;
  avatar?: string;
  biography?: string;
  phone_number?: string;
  address?: string;
  office_hours?: string;
  research_interests?: string;
  social_media?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const updateLecturerProfile = async (
  data: LecturerProfileUpdateData
): Promise<LecturerDetails> => {
  const token = getCampusToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/lecturer/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update lecturer profile: ${response.status} ${errorText}`
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error updating lecturer profile:", error);
    throw error;
  }
};
