
export type Subject = {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId?: string;
  topics?: Topic[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  content: string;
  resources: Resource[];
  order: number;
};

export type Resource = {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'image' | 'link' | 'document';
  url: string;
  topicId: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  topicId?: string;
  questions: Question[];
  timeLimit: number; // in minutes
  startDate: Date;
  endDate: Date;
};

export type Question = {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  topicId?: string;
  dueDate: Date;
  maxScore: number;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  targetAudience: 'all' | 'students' | 'teachers' | string[]; // string[] for specific subjectIds
};

export const nigerianSubjects = [
  'Mathematics',
  'English Language',
  'Biology',
  'Chemistry',
  'Physics',
  'Agricultural Science',
  'Economics',
  'Government',
  'Literature in English',
  'Geography',
  'Accounting',
  'Commerce',
  'Computer Studies',
  'Civic Education',
  'History',
  'Islamic Religious Studies',
  'Christian Religious Studies',
  'Further Mathematics'
];
