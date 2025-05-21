
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubjectById } from '@/services/subjectService';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Topic } from '@/models/curriculum';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, File, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const StudentSubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [subject, setSubject] = React.useState(() => 
    subjectId ? getSubjectById(subjectId) : undefined
  );

  React.useEffect(() => {
    if (subjectId) {
      const fetchedSubject = getSubjectById(subjectId);
      setSubject(fetchedSubject);
      
      if (!fetchedSubject) {
        navigate('/student/subjects');
        toast({
          title: 'Subject Not Found',
          description: 'The requested subject could not be found.',
          variant: 'destructive',
        });
      }
    }
  }, [subjectId, navigate, toast]);

  if (!subject) {
    return (
      <DashboardLayout title="Subject Detail">
        <div className="flex justify-center items-center h-64">
          <p>Loading subject information...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={subject.name}>
      <div className="space-y-6">
        {/* Header with subject info and actions */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-lms-dark">{subject.name}</h1>
              <span className="ml-3 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {subject.code}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{subject.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => navigate(`/student/subjects/${subject.id}/quizzes`)}
            >
              View Quizzes
            </Button>
            <Button
              onClick={() => navigate(`/student/subjects/${subject.id}/assignments`)}
            >
              Assignments
            </Button>
          </div>
        </div>

        {/* Topics list */}
        {subject.topics && subject.topics.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <h2 className="font-semibold flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-lms-blue" />
                Topics
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {subject.topics.map((topic: Topic) => (
                <AccordionItem key={topic.id} value={topic.id}>
                  <AccordionTrigger className="hover:bg-gray-50 px-4">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{topic.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <div className="space-y-4">
                      <p className="text-gray-600">{topic.description}</p>
                      
                      <div className="border rounded-md p-4 bg-gray-50">
                        <div className="prose prose-sm max-w-none" 
                          dangerouslySetInnerHTML={{ __html: topic.content }} />
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Resources:</h3>
                        {topic.resources.length > 0 ? (
                          <div className="space-y-2">
                            {topic.resources.map((resource) => (
                              <a 
                                key={resource.id} 
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-2 bg-white rounded border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                              >
                                <File className="mr-2 h-4 w-4 text-gray-500" />
                                <span className="flex-1">{resource.title}</span>
                                <span className="text-sm bg-gray-100 px-2 py-1 rounded mr-2">
                                  {resource.type}
                                </span>
                                <ExternalLink className="h-4 w-4 text-blue-500" />
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No resources available</p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Topics Available</h2>
            <p className="text-gray-500">
              This subject doesn't have any topics yet.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentSubjectDetail;
