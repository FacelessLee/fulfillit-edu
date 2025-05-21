
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BookOpen, 
  FileText, 
  Users, 
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const TeacherSidebar = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarItems = [
    {
      icon: BookOpen,
      label: 'My Subjects',
      href: '/teacher/subjects'
    },
    {
      icon: FileText,
      label: 'Quizzes',
      href: '/teacher/quizzes'
    },
    {
      icon: Calendar,
      label: 'Assignments',
      href: '/teacher/assignments'
    },
    {
      icon: Users,
      label: 'Students',
      href: '/teacher/students'
    }
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!isCollapsed && <h2 className="font-semibold text-lg">Teacher Panel</h2>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="ml-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <div className="p-2 flex-grow">
        <nav className="space-y-1">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="text-sm text-gray-500">
            Logged in as <span className="font-medium">{user?.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
