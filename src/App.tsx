
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Teacher routes
import TeacherSubjects from "./pages/teacher/TeacherSubjects";
import TeacherTopics from "./pages/teacher/TeacherTopics";
import TeacherQuizzes from "./pages/teacher/TeacherQuizzes";
import QuizEditor from "./pages/teacher/QuizEditor";

// Student routes
import StudentSubjects from "./pages/student/StudentSubjects";
import StudentSubjectDetail from "./pages/student/StudentSubjectDetail";
import StudentQuizzes from "./pages/student/StudentQuizzes";
import TakeQuiz from "./pages/student/TakeQuiz";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/subjects" element={<TeacherSubjects />} />
            <Route path="/teacher/subjects/:subjectId/topics" element={<TeacherTopics />} />
            <Route path="/teacher/quizzes" element={<TeacherQuizzes />} />
            <Route path="/teacher/quizzes/create" element={<QuizEditor />} />
            <Route path="/teacher/quizzes/:quizId/edit" element={<QuizEditor />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/subjects" element={<StudentSubjects />} />
            <Route path="/student/subjects/:subjectId" element={<StudentSubjectDetail />} />
            <Route path="/student/subjects/:subjectId/quizzes" element={<StudentQuizzes />} />
            <Route path="/student/quizzes/:quizId/take" element={<TakeQuiz />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
