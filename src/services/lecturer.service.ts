import { getCampusToken } from "./auth";
import {
  Lecturer,
  LecturerResponse,
  LecturerSyncResponse,
} from "@/types/lecturer";
import { API_URL } from "@/config/constants";

/**
 * Fetch all lecturers from the API
 * @returns Promise<Lecturer[]>
 */
export const getLecturers = async (): Promise<Lecturer[]> => {
  const token = getCampusToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/admin/lecturers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch lecturers: ${response.status} ${errorText}`
      );
    }

    const result = (await response.json()) as LecturerResponse;
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

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/admin/lecturers/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to sync lecturers: ${response.status} ${errorText}`
      );
    }

    const result = (await response.json()) as LecturerSyncResponse;
    return result.data;
  } catch (error) {
    console.error("Error syncing lecturers:", error);
    throw error;
  }
};
