
import React from 'react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Nigerian Educators Are Saying</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-lms-green">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">Mrs. Adebisi Oladele</h4>
                <p className="text-sm text-gray-600">Vice Principal, Lagos State Model College</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"This platform has transformed how we deliver education at our school. Students are more engaged, and our teachers can track progress effortlessly."</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-lms-blue">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">Mr. Emmanuel Nwachukwu</h4>
                <p className="text-sm text-gray-600">ICT Coordinator, Federal Government College, Abuja</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"The mobile-first approach is perfect for our students who primarily access the internet through smartphones. The interface is intuitive and works well even on slower connections."</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-lms-purple">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">Ms. Amina Ibrahim</h4>
                <p className="text-sm text-gray-600">Biology Teacher, Unity College, Kano</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"I can easily upload weekly topics and assignments that align with our curriculum. The fact that it reflects Nigerian educational standards makes it exceptionally valuable for our context."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
