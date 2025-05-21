
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getTeacherSubjects } from '@/services/subjectService';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Subject } from '@/models/curriculum';

const TeacherSubjects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = React.useState<Subject[]>([]);

  React.useEffect(() => {
    if (user?.id) {
      const teacherSubjects = getTeacherSubjects(user.id);
      setSubjects(teacherSubjects);
    }
  }, [user]);

  return (
    <DashboardLayout title="My Subjects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-lms-dark">My Subjects</h1>
        </div>

        {subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Subjects Assigned</h2>
            <p className="text-gray-500 mb-6">
              You don't have any subjects assigned to you yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{subject.name}</span>
                    <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {subject.code}
                    </span>
                  </CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {subject.topics?.length || 0} topics
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Last updated: May 15, 2025
                      </span>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        onClick={() => navigate(`/teacher/subjects/${subject.id}/topics`)}
                        className="flex-1"
                      >
                        Manage Topics
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/teacher/subjects/${subject.id}/quizzes`)}
                        className="flex-1"
                      >
                        Quizzes
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

export default TeacherSubjects;
