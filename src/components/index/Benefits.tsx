
import React from 'react';

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Benefits for the Nigerian Educational System</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/placeholder.svg" alt="Classroom in Nigeria" className="rounded-lg shadow-xl" />
          </div>
          <div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-lms-green rounded-full p-2 mr-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Improved Student Engagement</h3>
                  <p className="text-gray-600">Interactive digital content increases student participation and retention of knowledge compared to traditional methods.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-lms-green rounded-full p-2 mr-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
                  <p className="text-gray-600">Students can access educational materials beyond school hours, even during breaks or unexpected school closures.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-lms-green rounded-full p-2 mr-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Teacher Productivity</h3>
                  <p className="text-gray-600">Educators can efficiently create, distribute, and grade assignments while tracking student performance with detailed analytics.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-lms-green rounded-full p-2 mr-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Bridging Educational Gaps</h3>
                  <p className="text-gray-600">Helps standardize educational quality across different regions of Nigeria regardless of physical infrastructure limitations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
