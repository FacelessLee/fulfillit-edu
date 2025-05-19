
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        description: 'Welcome to FulfillIT LMS!',
      });
      
      // Determine where to redirect based on email domain
      if (email.includes('student')) {
        navigate('/student/dashboard');
      } else if (email.includes('teacher')) {
        navigate('/teacher/dashboard');
      } else if (email.includes('admin')) {
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
          <p className="text-gray-500 mt-2 text-sm">Enter your credentials below</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Hint: Use student@example.com, teacher@example.com, or admin@example.com
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              (Any password will work for demo purposes)
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-lms-green hover:bg-lms-green/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

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
