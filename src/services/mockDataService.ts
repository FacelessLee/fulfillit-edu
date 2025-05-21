
import { Subject, Topic, Quiz, Assignment, Announcement } from '../models/curriculum';

// Mock Subjects
export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
    description: 'Fundamental concepts in mathematics including algebra, geometry, and trigonometry.',
  },
  {
    id: '2',
    name: 'English Language',
    code: 'ENG101',
    description: 'Comprehensive study of English grammar, literature, and composition.',
  },
  {
    id: '3',
    name: 'Biology',
    code: 'BIO101',
    description: 'Study of living organisms and their interactions with the environment.',
  },
  {
    id: '4',
    name: 'Chemistry',
    code: 'CHEM101',
    description: 'Exploration of chemical elements, compounds, reactions, and laboratory techniques.',
  },
  {
    id: '5',
    name: 'Physics',
    code: 'PHY101',
    description: 'Study of matter, energy, and their interactions through space and time.',
  },
  {
    id: '6',
    name: 'Agricultural Science',
    code: 'AGRIC101',
    description: 'Principles and practices of agriculture, crop production, and animal husbandry.',
  }
];

// Mock Topics
export const mockTopics: Topic[] = [
  {
    id: '101',
    title: 'Algebra: Linear Equations',
    description: 'Solving linear equations and inequalities',
    subjectId: '1',
    content: 'Linear equations are equations where each term is either a constant or the product of a constant and a single variable raised to the power of 1.',
    order: 1,
    resources: [
      {
        id: '1001',
        title: 'Linear Equations Introduction',
        type: 'pdf',
        url: '/resources/linear_equations.pdf',
        topicId: '101'
      }
    ]
  },
  {
    id: '102',
    title: 'Algebra: Quadratic Equations',
    description: 'Solving quadratic equations using various methods',
    subjectId: '1',
    content: 'Quadratic equations are polynomial equations of the second degree, having the form ax² + bx + c = 0.',
    order: 2,
    resources: [
      {
        id: '1002',
        title: 'Quadratic Formula Explained',
        type: 'pdf',
        url: '/resources/quadratic_formula.pdf',
        topicId: '102'
      }
    ]
  },
  {
    id: '201',
    title: 'Grammar: Parts of Speech',
    description: 'Understanding nouns, verbs, adjectives, and other parts of speech',
    subjectId: '2',
    content: 'Parts of speech are categories of words based on their function within a sentence.',
    order: 1,
    resources: [
      {
        id: '2001',
        title: 'Parts of Speech Guide',
        type: 'pdf',
        url: '/resources/parts_of_speech.pdf',
        topicId: '201'
      }
    ]
  }
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Linear Equations Assessment',
    description: 'Test your understanding of linear equations',
    subjectId: '1',
    topicId: '101',
    timeLimit: 30,
    startDate: new Date('2025-05-25T09:00:00'),
    endDate: new Date('2025-05-25T23:59:59'),
    questions: [
      {
        id: 'q1',
        text: 'Solve for x: 3x + 5 = 14',
        type: 'multiple-choice',
        options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
        correctAnswer: 'x = 3',
        points: 5
      },
      {
        id: 'q2',
        text: 'Is the equation 5x - 10 = 5(x - 2) an identity?',
        type: 'true-false',
        correctAnswer: 'true',
        points: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Grammar Quiz: Parts of Speech',
    description: 'Test your knowledge of the parts of speech',
    subjectId: '2',
    topicId: '201',
    timeLimit: 20,
    startDate: new Date('2025-05-26T10:00:00'),
    endDate: new Date('2025-05-26T23:59:59'),
    questions: [
      {
        id: 'q3',
        text: 'Which of these is a noun?',
        type: 'multiple-choice',
        options: ['Run', 'Beautiful', 'Quickly', 'School'],
        correctAnswer: 'School',
        points: 2
      },
      {
        id: 'q4',
        text: 'Identify the verb in the sentence: "The students studied for their exam."',
        type: 'short-answer',
        correctAnswer: 'studied',
        points: 3
      }
    ]
  }
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Quadratic Equations Practice',
    description: 'Solve the provided quadratic equations using the methods discussed in class.',
    subjectId: '1',
    topicId: '102',
    dueDate: new Date('2025-05-28T23:59:59'),
    maxScore: 20
  },
  {
    id: '2',
    title: 'Essay: Analysis of Literary Devices',
    description: 'Write a 2-page essay analyzing the literary devices used in the provided passage.',
    subjectId: '2',
    dueDate: new Date('2025-05-30T23:59:59'),
    maxScore: 25
  }
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'End of Term Examinations',
    content: 'End of term examinations will commence on June 15th. Please review all course materials.',
    createdAt: new Date('2025-05-15T10:30:00'),
    createdBy: '2', // Teacher ID
    targetAudience: 'all'
  },
  {
    id: '2',
    title: 'Mathematics Competition',
    content: 'The annual mathematics competition will be held on June 5th. Interested students should register by May 30th.',
    createdAt: new Date('2025-05-18T14:45:00'),
    createdBy: '2', // Teacher ID
    targetAudience: ['1'] // Mathematics subject ID
  }
];

// Service functions to access mock data
export const getSubjectsForStudent = (studentId: string): Promise<Subject[]> => {
  // In a real app, this would filter subjects based on student enrollment
  return Promise.resolve(mockSubjects);
};

export const getSubjectsForTeacher = (teacherId: string): Promise<Subject[]> => {
  // In a real app, this would filter subjects assigned to the teacher
  return Promise.resolve(mockSubjects.filter((_, index) => index < 4)); // Just return first 4 for demo
};

export const getTopicsForSubject = (subjectId: string): Promise<Topic[]> => {
  return Promise.resolve(mockTopics.filter(topic => topic.subjectId === subjectId));
};

export const getQuizzesForStudent = (studentId: string): Promise<Quiz[]> => {
  // In a real app, this would filter quizzes based on student's subjects
  return Promise.resolve(mockQuizzes);
};

export const getAssignmentsForStudent = (studentId: string): Promise<Assignment[]> => {
  // In a real app, this would filter assignments based on student's subjects
  return Promise.resolve(mockAssignments);
};

export const getAnnouncementsForUser = (userId: string, role: string): Promise<Announcement[]> => {
  // In a real app, this would filter announcements based on user role and subjects
  return Promise.resolve(mockAnnouncements);
};
