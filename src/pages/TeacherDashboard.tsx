
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, FileText, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getTeacherSubjects } from '@/services/subjectService';
import { Button } from '@/components/ui/button';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get teacher's subjects
  const teacherSubjects = user ? getTeacherSubjects(user.id) : [];

  // Redirect if not authenticated or not a teacher
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'teacher') {
      navigate('/');
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the teacher dashboard.',
        variant: 'destructive',
      });
    }
  }, [user, navigate, toast]);

  if (!user || user.role !== 'teacher') {
    return null;
  }

  return (
    <DashboardLayout title="Teacher Dashboard">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-lms-dark">Teacher Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-blue flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                My Subjects
              </CardTitle>
              <CardDescription>Manage your teaching subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <p className="text-2xl font-bold">{teacherSubjects.length}</p>
                <p className="text-sm text-gray-500">Active subjects</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/teacher/subjects')}
                >
                  View Subjects
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-purple flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Students
              </CardTitle>
              <CardDescription>Your enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <p className="text-2xl font-bold">120</p>
                <p className="text-sm text-gray-500">Total students</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/teacher/students')}
                >
                  View Students
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-gold flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Quizzes
              </CardTitle>
              <CardDescription>Manage quizzes and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-500">Active quizzes</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/teacher/quizzes')}
                >
                  Manage Quizzes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-green flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Assignments
              </CardTitle>
              <CardDescription>Track assignments and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500">Pending assignments</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/teacher/assignments')}
                >
                  View Assignments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-lms-dark">Your Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teacherSubjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription>{subject.code}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{subject.description}</p>
                  <p className="text-sm text-gray-500">
                    {subject.topics?.length || 0} topics available
                  </p>
                  <Button 
                    className="mt-4 w-full" 
                    onClick={() => navigate(`/teacher/subjects/${subject.id}/topics`)}
                  >
                    Manage Content
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-lms-dark">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-4">
              <div className="pb-3 border-b">
                <p className="font-medium">Mathematics: Quiz grading completed</p>
                <p className="text-sm text-gray-500">Today, 10:30 AM</p>
              </div>
              <div className="pb-3 border-b">
                <p className="font-medium">Biology: New student enrolled</p>
                <p className="text-sm text-gray-500">Yesterday, 2:15 PM</p>
              </div>
              <div className="pb-3 border-b">
                <p className="font-medium">Physics: Course materials updated</p>
                <p className="text-sm text-gray-500">May 18, 2025</p>
              </div>
              <div>
                <p className="font-medium">English: New quiz published</p>
                <p className="text-sm text-gray-500">May 17, 2025</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
