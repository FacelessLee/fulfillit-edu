
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, role: string) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Append role to email if not already included
    const loginEmail = email.includes(role) ? email : `${role}@example.com`;

    try {
      await login(loginEmail, password);
      toast({
        title: 'Login successful',
        description: 'Welcome to FulfillIT LMS!',
      });
      
      // Redirect based on role
      if (loginEmail.includes('student')) {
        navigate('/student/dashboard');
      } else if (loginEmail.includes('teacher')) {
        navigate('/teacher/dashboard');
      } else if (loginEmail.includes('admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-lms-green/10 mb-4">
            <GraduationCap className="h-8 w-8 text-lms-green" />
          </div>
          <h1 className="text-2xl font-bold">Sign in to FulfillIT LMS</h1>
          <p className="text-gray-500 mt-2 text-sm">Access the Learning Management System</p>
        </div>
        
        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="student">
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e, 'student')}>
              <div className="space-y-2">
                <label htmlFor="email-student" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email-student"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password-student" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password-student"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-lms-green hover:bg-lms-green/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in as Student"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="teacher">
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e, 'teacher')}>
              <div className="space-y-2">
                <label htmlFor="email-teacher" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email-teacher"
                  type="email"
                  placeholder="teacher@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password-teacher" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password-teacher"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-lms-green hover:bg-lms-green/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in as Teacher"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="admin">
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e, 'admin')}>
              <div className="space-y-2">
                <label htmlFor="email-admin" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email-admin"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password-admin" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password-admin"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-lms-green hover:bg-lms-green/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in as Admin"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-4">
          <a href="/" className="text-lms-green hover:text-lms-green/80 text-sm">
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
