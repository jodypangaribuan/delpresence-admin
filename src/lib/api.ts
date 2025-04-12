import axios from "axios";

// API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth endpoints
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  // User endpoints
  users: {
    lecturers: "/users/lecturers",
    assistants: "/users/assistants",
    students: "/users/students",
  },
  // Course endpoints
  courses: {
    list: "/courses",
    groups: "/courses/groups",
    detail: (id: string) => `/courses/${id}`,
  },
  // Schedule endpoints
  schedules: {
    list: "/schedules",
    manage: "/schedules/manage",
    import: "/schedules/import",
    rooms: "/schedules/rooms",
    conflicts: "/schedules/conflicts",
  },
  // Room endpoints
  rooms: {
    list: "/rooms",
    detail: (id: string) => `/rooms/${id}`,
  },
  // Attendance endpoints
  attendance: {
    list: "/attendance",
    summary: "/attendance/summary",
    reports: "/attendance/reports",
  },
};

// API functions
export const apiFunctions = {
  // Auth functions
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await api.post(endpoints.auth.login, credentials);
      return response.data;
    },
    register: async (data: {
      email: string;
      password: string;
      name: string;
      role: string;
    }) => {
      const response = await api.post(endpoints.auth.register, data);
      return response.data;
    },
    logout: async () => {
      const response = await api.post(endpoints.auth.logout);
      return response.data;
    },
    refresh: async () => {
      const response = await api.post(endpoints.auth.refresh);
      return response.data;
    },
  },
  // User functions
  users: {
    getLecturers: async () => {
      const response = await api.get(endpoints.users.lecturers);
      return response.data;
    },
    getAssistants: async () => {
      const response = await api.get(endpoints.users.assistants);
      return response.data;
    },
    getStudents: async () => {
      const response = await api.get(endpoints.users.students);
      return response.data;
    },
  },
  // Course functions
  courses: {
    getCourses: async () => {
      const response = await api.get(endpoints.courses.list);
      return response.data;
    },
    getCourseGroups: async () => {
      const response = await api.get(endpoints.courses.groups);
      return response.data;
    },
    getCourseDetail: async (id: string) => {
      const response = await api.get(endpoints.courses.detail(id));
      return response.data;
    },
    createCourseGroup: async (data: {
      name: string;
      code: string;
      department: string;
      semester: number;
      credits: number;
    }) => {
      const response = await api.post(endpoints.courses.groups, data);
      return response.data;
    },
    updateCourseGroup: async (
      id: string,
      data: {
        name: string;
        code: string;
        department: string;
        semester: number;
        credits: number;
      }
    ) => {
      const response = await api.put(`${endpoints.courses.groups}/${id}`, data);
      return response.data;
    },
    deleteCourseGroup: async (id: string) => {
      const response = await api.delete(`${endpoints.courses.groups}/${id}`);
      return response.data;
    },
  },
  // Schedule functions
  schedules: {
    getSchedules: async () => {
      const response = await api.get(endpoints.schedules.list);
      return response.data;
    },
    manageSchedule: async (data: {
      courseId: string;
      lecturerId: string;
      roomId: string;
      day: string;
      startTime: string;
      endTime: string;
      semester: string;
      academicYear: string;
    }) => {
      const response = await api.post(endpoints.schedules.manage, data);
      return response.data;
    },
    importSchedule: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post(endpoints.schedules.import, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    getRoomSchedules: async () => {
      const response = await api.get(endpoints.schedules.rooms);
      return response.data;
    },
    checkConflicts: async () => {
      const response = await api.get(endpoints.schedules.conflicts);
      return response.data;
    },
  },
  // Attendance functions
  attendance: {
    getAttendance: async () => {
      const response = await api.get(endpoints.attendance.list);
      return response.data;
    },
    getAttendanceSummary: async () => {
      const response = await api.get(endpoints.attendance.summary);
      return response.data;
    },
    getAttendanceReports: async () => {
      const response = await api.get(endpoints.attendance.reports);
      return response.data;
    },
  },
  // Room functions
  rooms: {
    getRooms: async () => {
      const response = await api.get(endpoints.rooms.list);
      return response.data;
    },
    getRoom: async (id: string) => {
      const response = await api.get(endpoints.rooms.detail(id));
      return response.data;
    },
    createRoom: async (data: {
      code: string;
      name: string;
      building: string;
      floor: number;
      capacity: number;
      type: string;
    }) => {
      const response = await api.post(endpoints.rooms.list, data);
      return response.data;
    },
    updateRoom: async (
      id: string,
      data: {
        code: string;
        name: string;
        building: string;
        floor: number;
        capacity: number;
        type: string;
      }
    ) => {
      const response = await api.put(endpoints.rooms.detail(id), data);
      return response.data;
    },
    deleteRoom: async (id: string) => {
      const response = await api.delete(endpoints.rooms.detail(id));
      return response.data;
    },
  },
};

export default api;
