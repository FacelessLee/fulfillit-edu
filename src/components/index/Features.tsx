
import React from 'react';
import { Book, User, Users, GraduationCap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Book className="w-10 h-10 text-lms-green" />,
      title: "Nigerian Curriculum-Aligned Content",
      description: "Access digitized learning materials perfectly aligned with the Nigerian Secondary School curriculum standards."
    },
    {
      icon: <User className="w-10 h-10 text-lms-blue" />,
      title: "Personalized Learning Experience",
      description: "Each student receives a customized dashboard highlighting their specific courses, assignments, and announcements."
    },
    {
      icon: <Users className="w-10 h-10 text-lms-purple" />,
      title: "Teacher-Student Collaboration",
      description: "Seamless communication between educators and learners through announcements, assignments, and feedback."
    },
    {
      icon: <GraduationCap className="w-10 h-10 text-lms-gold" />,
      title: "Mobile-First Design",
      description: "Access your courses anytime, anywhere with our responsive platform optimized for all Nigerian mobile networks."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:border-lms-green transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
