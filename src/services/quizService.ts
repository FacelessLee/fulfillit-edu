
import { Quiz, Question } from '@/models/curriculum';

// Mock quizzes data
const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Mathematics: Algebra Basics',
    description: 'Test your understanding of algebraic expressions and equations.',
    subjectId: 'subject-1', // Mathematics
    topicId: 'topic-subject-1-1',
    questions: [
      {
        id: 'q1-quiz-1',
        text: 'If x + 5 = 10, what is the value of x?',
        type: 'multiple-choice',
        options: ['3', '5', '7', '15'],
        correctAnswer: '5',
        points: 5
      },
      {
        id: 'q2-quiz-1',
        text: 'Is the expression 2x + 3y a linear expression?',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 'True',
        points: 3
      },
      {
        id: 'q3-quiz-1',
        text: 'Solve for x: 3x - 7 = 11',
        type: 'multiple-choice',
        options: ['4', '6', '7', '9'],
        correctAnswer: '6',
        points: 5
      }
    ],
    timeLimit: 15, // 15 minutes
    startDate: new Date('2025-05-25T09:00:00'),
    endDate: new Date('2025-06-30T23:59:59')
  },
  {
    id: 'quiz-2',
    title: 'English Language: Grammar Test',
    description: 'Assess your knowledge of English grammar rules and usage.',
    subjectId: 'subject-2', // English Language
    topicId: 'topic-subject-2-2',
    questions: [
      {
        id: 'q1-quiz-2',
        text: 'Which of the following is a proper noun?',
        type: 'multiple-choice',
        options: ['book', 'Nigeria', 'happiness', 'teacher'],
        correctAnswer: 'Nigeria',
        points: 4
      },
      {
        id: 'q2-quiz-2',
        text: 'Identify the verb in the sentence: "The students study diligently."',
        type: 'multiple-choice',
        options: ['The', 'students', 'study', 'diligently'],
        correctAnswer: 'study',
        points: 4
      }
    ],
    timeLimit: 10, // 10 minutes
    startDate: new Date('2025-05-20T09:00:00'),
    endDate: new Date('2025-06-20T23:59:59')
  },
  {
    id: 'quiz-3',
    title: 'Biology: Cell Structure',
    description: 'Test your knowledge of cell structures and functions.',
    subjectId: 'subject-3', // Biology
    topicId: 'topic-subject-3-3',
    questions: [
      {
        id: 'q1-quiz-3',
        text: 'Which organelle is responsible for protein synthesis?',
        type: 'multiple-choice',
        options: ['Nucleus', 'Ribosome', 'Golgi apparatus', 'Mitochondria'],
        correctAnswer: 'Ribosome',
        points: 5
      },
      {
        id: 'q2-quiz-3',
        text: 'Is the cell membrane permeable to all substances?',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 'False',
        points: 3
      },
      {
        id: 'q3-quiz-3',
        text: 'What is the main function of mitochondria?',
        type: 'short-answer',
        correctAnswer: 'Energy production',
        points: 5
      }
    ],
    timeLimit: 20, // 20 minutes
    startDate: new Date('2025-05-22T10:00:00'),
    endDate: new Date('2025-06-25T23:59:59')
  }
];

// Map to store quiz attempts by students
const quizAttempts: Record<string, Record<string, {
  answers: Record<string, string | string[]>,
  score: number,
  maxScore: number,
  submittedAt: Date
}>> = {
  // studentId -> quizId -> attempt data
};

export const getAllQuizzes = (): Quiz[] => {
  return [...mockQuizzes];
};

export const getQuizById = (quizId: string): Quiz | undefined => {
  return mockQuizzes.find(quiz => quiz.id === quizId);
};

export const getQuizzesBySubject = (subjectId: string): Quiz[] => {
  return mockQuizzes.filter(quiz => quiz.subjectId === subjectId);
};

export const getQuizzesByTopic = (topicId: string): Quiz[] => {
  return mockQuizzes.filter(quiz => quiz.topicId === topicId);
};

export const createQuiz = (quiz: Omit<Quiz, 'id'>): Quiz => {
  const newQuiz: Quiz = {
    id: `quiz-${mockQuizzes.length + 1}`,
    ...quiz,
    questions: quiz.questions.map((q, index) => ({
      ...q,
      id: `q${index + 1}-quiz-${mockQuizzes.length + 1}`
    }))
  };
  
  mockQuizzes.push(newQuiz);
  return newQuiz;
};

export const updateQuiz = (quizId: string, updates: Partial<Quiz>): Quiz | undefined => {
  const quizIndex = mockQuizzes.findIndex(quiz => quiz.id === quizId);
  if (quizIndex === -1) return undefined;
  
  mockQuizzes[quizIndex] = {
    ...mockQuizzes[quizIndex],
    ...updates
  };
  
  return mockQuizzes[quizIndex];
};

export const deleteQuiz = (quizId: string): boolean => {
  const initialLength = mockQuizzes.length;
  const newQuizzes = mockQuizzes.filter(quiz => quiz.id !== quizId);
  mockQuizzes.length = 0;
  mockQuizzes.push(...newQuizzes);
  
  return mockQuizzes.length < initialLength;
};

// Student attempts
export const submitQuizAttempt = (
  studentId: string,
  quizId: string,
  answers: Record<string, string | string[]>
): { score: number, maxScore: number } => {
  const quiz = getQuizById(quizId);
  if (!quiz) throw new Error('Quiz not found');
  
  let score = 0;
  const maxScore = quiz.questions.reduce((total, q) => total + q.points, 0);
  
  // Grade multiple-choice and true-false questions
  quiz.questions.forEach(question => {
    const studentAnswer = answers[question.id];
    
    if (!studentAnswer) return;
    
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      if (studentAnswer === question.correctAnswer) {
        score += question.points;
      }
    } 
    // For short-answer questions, we'd need teacher grading in a real application
    // Here we do a simple case-insensitive check for demo purposes
    else if (question.type === 'short-answer') {
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      
      if (typeof studentAnswer === 'string') {
        const normalizedStudentAnswer = studentAnswer.toLowerCase().trim();
        
        if (correctAnswers.some(ans => 
          typeof ans === 'string' && ans.toLowerCase().trim() === normalizedStudentAnswer
        )) {
          score += question.points;
        }
      }
    }
  });
  
  // Store the attempt
  if (!quizAttempts[studentId]) {
    quizAttempts[studentId] = {};
  }
  
  quizAttempts[studentId][quizId] = {
    answers,
    score,
    maxScore,
    submittedAt: new Date()
  };
  
  return { score, maxScore };
};

export const getStudentQuizAttempt = (
  studentId: string,
  quizId: string
): {
  answers: Record<string, string | string[]>,
  score: number,
  maxScore: number,
  submittedAt: Date
} | undefined => {
  return quizAttempts[studentId]?.[quizId];
};

export const getStudentQuizAttempts = (
  studentId: string
): Record<string, {
  answers: Record<string, string | string[]>,
  score: number,
  maxScore: number,
  submittedAt: Date
}> => {
  return quizAttempts[studentId] || {};
};

export const hasAttemptedQuiz = (studentId: string, quizId: string): boolean => {
  return !!quizAttempts[studentId]?.[quizId];
};

// Teacher functions
export const getQuizzesByTeacher = (teacherId: string, subjectIds: string[]): Quiz[] => {
  return mockQuizzes.filter(quiz => subjectIds.includes(quiz.subjectId));
};

export const getQuizResults = (quizId: string): Array<{
  studentId: string,
  score: number,
  maxScore: number,
  percentage: number,
  submittedAt: Date
}> => {
  const results: Array<{
    studentId: string,
    score: number,
    maxScore: number,
    percentage: number,
    submittedAt: Date
  }> = [];
  
  Object.entries(quizAttempts).forEach(([studentId, attempts]) => {
    if (attempts[quizId]) {
      const { score, maxScore, submittedAt } = attempts[quizId];
      results.push({
        studentId,
        score,
        maxScore,
        percentage: (score / maxScore) * 100,
        submittedAt
      });
    }
  });
  
  return results;
};
