
import React, { ReactNode } from 'react';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <DashboardHeader title={title} />
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
