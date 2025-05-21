
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, FileText, LogOut, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated or not a student
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'student') {
      navigate('/');
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the student dashboard.',
        variant: 'destructive',
      });
    }
  }, [user, navigate, toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  if (!user || user.role !== 'student') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-lms-green text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold">FulfillIT LMS</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline-block">Welcome, {user.name}</span>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-lms-green"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-lms-dark">Student Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-blue flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                My Subjects
              </CardTitle>
              <CardDescription>Your enrolled subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-gray-500">Active subjects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-purple flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Assignments
              </CardTitle>
              <CardDescription>Track your assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-gray-500">Pending submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-gold flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Quizzes
              </CardTitle>
              <CardDescription>Scheduled assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-gray-500">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-green flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Performance
              </CardTitle>
              <CardDescription>Your academic progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">78%</p>
              <p className="text-sm text-gray-500">Average score</p>
            </CardContent>
          </Card>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-lms-dark">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-4">
              <div className="pb-3 border-b">
                <p className="font-medium">Mathematics: New assignment posted</p>
                <p className="text-sm text-gray-500">Today, 10:30 AM</p>
              </div>
              <div className="pb-3 border-b">
                <p className="font-medium">Biology: Quiz score released</p>
                <p className="text-sm text-gray-500">Yesterday, 2:15 PM</p>
              </div>
              <div className="pb-3 border-b">
                <p className="font-medium">Physics: New learning materials available</p>
                <p className="text-sm text-gray-500">May 18, 2025</p>
              </div>
              <div>
                <p className="font-medium">English: Assignment feedback received</p>
                <p className="text-sm text-gray-500">May 17, 2025</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
