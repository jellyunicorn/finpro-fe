import type { Attendance } from "./attendance";

export interface EmployeeAttendance {
  id: number;
  fullName: string;
  attendance: Attendance[];
}

