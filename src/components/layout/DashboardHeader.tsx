
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface DashboardHeaderProps {
  title?: string;
}

const DashboardHeader = ({ title = 'FulfillIT LMS' }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  return (
    <header className="bg-lms-green text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold">{title}</span>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="hidden md:inline-block">Welcome, {user.name}</span>
            )}
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
  );
};

export default DashboardHeader;
