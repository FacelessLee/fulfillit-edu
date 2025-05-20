
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeroProps {
  redirectToDashboard: () => string;
}

const Hero = ({ redirectToDashboard }: HeroProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gradient-to-r from-lms-green to-lms-green/80 text-white">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8" />
            <span className="text-xl font-bold">FulfillIT LMS</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-lms-gold transition">Features</a>
            <a href="#benefits" className="hover:text-lms-gold transition">Benefits</a>
            <a href="#testimonials" className="hover:text-lms-gold transition">Testimonials</a>
          </div>
          <div>
            {isAuthenticated ? (
              <Link to={redirectToDashboard()}>
                <Button variant="outline" className="bg-white text-lms-green hover:bg-lms-gold hover:text-white">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="bg-white text-lms-green hover:bg-lms-gold hover:text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Nigerian Education Through Technology</h1>
          <p className="text-lg mb-8">A comprehensive learning management system designed specifically for Nigerian secondary schools, bridging the gap between classroom and continuous learning.</p>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button className="bg-lms-gold text-lms-dark hover:bg-white hover:text-lms-green">
                Get Started
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" className="border-white hover:bg-white hover:text-lms-green">
                Learn More
              </Button>
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/placeholder.svg" alt="Nigerian students learning" className="rounded-lg shadow-lg max-w-full animate-fade-in" style={{ maxHeight: '400px' }} />
        </div>
      </div>
    </header>
  );
};

export default Hero;
