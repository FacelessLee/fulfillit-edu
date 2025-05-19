
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { GraduationCap, Book, User, Users } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

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
      {/* Hero Section */}
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

      {/* Features */}
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

      {/* Benefits Section */}
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

      {/* Testimonial Section */}
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

      {/* Footer */}
      <footer className="bg-lms-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="w-6 h-6" />
                <span className="text-lg font-bold">FulfillIT LMS</span>
              </div>
              <p className="text-gray-400">Revolutionizing education across Nigeria through accessible, quality digital learning.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#benefits" className="text-gray-400 hover:text-white transition">Benefits</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Implementation Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Teacher Training</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">System Requirements</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Lagos, Nigeria</li>
                <li>info@fulfillitlms.ng</li>
                <li>+234 800 123 4567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 FulfillIT LMS. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
