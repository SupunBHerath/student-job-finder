export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  type: 'Part-time' | 'Internship' | 'Full-time' | 'Contract';
  featured: boolean;
}

export interface User {
  email: string;
  role: 'admin' | 'student';
}

export type View = 'student' | 'admin';

// Fix: Add and export missing types used by ImageGenerator and CvGenerator components.
export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface CvData {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string;
}
