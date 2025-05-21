
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getTeacherSubjects } from '@/services/subjectService';
import { getAllQuizzes, getQuizzesBySubject } from '@/services/quizService';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Clock, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/models/curriculum';
import { format } from 'date-fns';

const TeacherQuizzes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);
  
  React.useEffect(() => {
    if (user?.id) {
      const teacherSubjects = getTeacherSubjects(user.id);
      const subjectIds = teacherSubjects.map(subject => subject.id);
      
      // Get all quizzes for the teacher's subjects
      const teacherQuizzes: Quiz[] = [];
      subjectIds.forEach(subjectId => {
        const subjectQuizzes = getQuizzesBySubject(subjectId);
        teacherQuizzes.push(...subjectQuizzes);
      });
      
      setQuizzes(teacherQuizzes);
    }
  }, [user]);

  return (
    <DashboardLayout title="My Quizzes">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-lms-dark">Quizzes & Assessments</h1>
          <Button onClick={() => navigate('/teacher/quizzes/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Quiz
          </Button>
        </div>

        {quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Quizzes Available</h2>
            <p className="text-gray-500 mb-6">
              You haven't created any quizzes yet for your subjects.
            </p>
            <Button onClick={() => navigate('/teacher/quizzes/create')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Quiz
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{quiz.title}</span>
                    <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {quiz.questions.length} questions
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{quiz.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Start: {format(new Date(quiz.startDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          End: {format(new Date(quiz.endDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {quiz.timeLimit} minutes
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          0 attempts
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/teacher/quizzes/${quiz.id}/results`)}
                        className="flex-1"
                      >
                        View Results
                      </Button>
                      
                      <Button 
                        onClick={() => navigate(`/teacher/quizzes/${quiz.id}/edit`)}
                        className="flex-1"
                      >
                        Edit Quiz
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherQuizzes;
