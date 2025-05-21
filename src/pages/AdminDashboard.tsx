
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated or not an admin
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/');
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the admin dashboard.',
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

  if (!user || user.role !== 'admin') {
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
        <h1 className="text-2xl font-bold mb-6 text-lms-dark">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-blue flex items-center">
                <Users className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">526</p>
              <p className="text-sm text-gray-500">Total users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-purple flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Subjects
              </CardTitle>
              <CardDescription>Curriculum management</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-gray-500">Active subjects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-gold flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Teachers
              </CardTitle>
              <CardDescription>Faculty members</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">32</p>
              <p className="text-sm text-gray-500">Active teachers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lms-green flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Students
              </CardTitle>
              <CardDescription>Enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">482</p>
              <p className="text-sm text-gray-500">Total students</p>
            </CardContent>
          </Card>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-lms-dark">System Activity</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-4">
              <div className="pb-3 border-b">
                <p className="font-medium">New teacher account created</p>
                <p className="text-sm text-gray-500">Today, 10:30 AM</p>
              </div>
              <div className="pb-3 border-b">
                <p className="font-medium">Subject "Advanced Mathematics" added to curriculum</p>
                <p className="text-sm text-gray-500">Yesterday, 2:15 PM</p>
              </div>
              <div className="pb-3 border-b">
                <p className="font-medium">System backup completed</p>
                <p className="text-sm text-gray-500">May 18, 2025</p>
              </div>
              <div>
                <p className="font-medium">10 new student accounts activated</p>
                <p className="text-sm text-gray-500">May 17, 2025</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
