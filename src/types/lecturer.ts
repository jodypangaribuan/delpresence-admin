export interface Lecturer {
  id: number;
  employeeId: number;
  lecturerId: number;
  identityNumber: string;
  fullName: string;
  email: string;
  departmentId: number;
  department: string;
  academicRank: string;
  academicRankDesc: string;
  educationLevel: string;
  lecturerNumber: string;
  campusUserId: number;
  lastSyncAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LecturerResponse {
  message: string;
  data: Lecturer[];
}

export interface LecturerSyncResponse {
  message: string;
  data: Lecturer[];
}
