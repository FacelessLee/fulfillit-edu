
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, FileText, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  if (!user || user.role !== 'teacher') {
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
        <h1 className="text-2xl font-bold mb-6 text-lms-dark">Teacher Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-blue flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                My Courses
              </CardTitle>
              <CardDescription>Manage your teaching courses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-gray-500">Active courses</p>
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
              <p className="text-2xl font-bold">120</p>
              <p className="text-sm text-gray-500">Total students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-gold flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Assignments
              </CardTitle>
              <CardDescription>Track assignments and grading</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-500">Pending reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-green flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Resources
              </CardTitle>
              <CardDescription>Educational materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">25</p>
              <p className="text-sm text-gray-500">Available resources</p>
            </CardContent>
          </Card>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-lms-dark">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-4">
              <div className="pb-3 border-b">
                <p className="font-medium">JS101: Assignment grading completed</p>
                <p className="text-sm text-gray-500">Today, 10:30 AM</p>
              </div>
              <div className="pb-3 border-b">
                <p className="font-medium">BIO202: New student enrolled</p>
                <p className="text-sm text-gray-500">Yesterday, 2:15 PM</p>
              </div>
              <div className="pb-3 border-b">
                <p className="font-medium">PHY101: Course materials updated</p>
                <p className="text-sm text-gray-500">May 18, 2025</p>
              </div>
              <div>
                <p className="font-medium">ENG202: New forum discussion</p>
                <p className="text-sm text-gray-500">May 17, 2025</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
