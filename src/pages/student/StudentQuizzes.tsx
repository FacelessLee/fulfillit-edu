
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getQuizzesBySubject, hasAttemptedQuiz } from '@/services/quizService';
import { getSubjectById } from '@/services/subjectService';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Clock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/models/curriculum';
import { format } from 'date-fns';

const StudentQuizzes = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);
  const [subject, setSubject] = React.useState(() => 
    subjectId ? getSubjectById(subjectId) : undefined
  );

  React.useEffect(() => {
    if (subjectId) {
      const foundSubject = getSubjectById(subjectId);
      setSubject(foundSubject);
      
      if (foundSubject) {
        const subjectQuizzes = getQuizzesBySubject(subjectId);
        setQuizzes(subjectQuizzes);
      }
    }
  }, [subjectId]);

  const getQuizStatus = (quiz: Quiz) => {
    const now = new Date();
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);
    
    if (now < startDate) {
      return { status: 'upcoming', label: 'Upcoming' };
    } else if (now > endDate) {
      return { status: 'expired', label: 'Expired' };
    } else {
      return { status: 'active', label: 'Active' };
    }
  };

  const isQuizAttempted = (quiz: Quiz) => {
    if (!user) return false;
    return hasAttemptedQuiz(user.id, quiz.id);
  };

  return (
    <DashboardLayout title={subject ? `${subject.name} - Quizzes` : 'Quizzes'}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-lms-dark">
              {subject ? `${subject.name} - Quizzes` : 'Quizzes'}
            </h1>
            {subject && (
              <p className="text-gray-600">{subject.description}</p>
            )}
          </div>
          
          <Button variant="outline" onClick={() => navigate(`/student/subjects/${subjectId}`)}>
            Back to Subject
          </Button>
        </div>

        {quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Quizzes Available</h2>
            <p className="text-gray-500 mb-6">
              There are no quizzes available for this subject yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => {
              const quizStatus = getQuizStatus(quiz);
              const attempted = isQuizAttempted(quiz);
              
              return (
                <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{quiz.title}</CardTitle>
                      <Badge 
                        className={`
                          ${quizStatus.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                          ${quizStatus.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : ''}
                          ${quizStatus.status === 'expired' ? 'bg-gray-100 text-gray-800' : ''}
                        `}
                      >
                        {quizStatus.label}
                      </Badge>
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
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
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {quiz.questions.length} questions
                          </span>
                        </div>
                      </div>
                      
                      {attempted ? (
                        <div className="flex items-center justify-center p-2 bg-green-50 border border-green-200 rounded-md">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-green-700">Quiz Completed</span>
                        </div>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => navigate(`/student/quizzes/${quiz.id}/take`)}
                          disabled={quizStatus.status !== 'active'}
                        >
                          {quizStatus.status === 'upcoming' ? 'Quiz Not Yet Available' : 
                           quizStatus.status === 'expired' ? 'Quiz Expired' : 
                           'Start Quiz'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentQuizzes;
