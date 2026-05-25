export type profilepersonalForm = {
    id:number,
  fullName: string;
  avatar: string;
  phone: string | null;
  birthDate: string | null;
};

export type profiledata = {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  role: "USER" | "ADMIN";
  avatar: string;
  verifiedAt: string;
  provider: "CREDENTIALS" | "GOOGLE";
  birthDate: string | null;
};