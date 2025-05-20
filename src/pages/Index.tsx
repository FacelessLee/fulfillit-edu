
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Hero from '../components/index/Hero';
import Features from '../components/index/Features';
import Benefits from '../components/index/Benefits';
import Testimonials from '../components/index/Testimonials';
import Footer from '../components/index/Footer';

const Index = () => {
  const { user } = useAuth();

  const redirectToDashboard = () => {
    if (!user) return '/login';
    
    switch(user.role) {
      case 'student': return '/student/dashboard';
      case 'teacher': return '/teacher/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/login';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Hero redirectToDashboard={redirectToDashboard} />
      <Features />
      <Benefits />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
