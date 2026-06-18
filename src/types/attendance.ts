export interface Attendance {
  createdAt: string;
  deletedAt: string | null;
  employeeId: number;
  type: "CLOCK_IN" | "CLOCK_OUT";
  id: number;
  startTime: string;
  updatedAt: string;
}
