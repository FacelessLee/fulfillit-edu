
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getSubjectById, 
  getTopicById, 
  addTopicToSubject,
  updateSubjectTopic 
} from '@/services/subjectService';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Topic } from '@/models/curriculum';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Plus, Edit, FileText, File } from 'lucide-react';
import { TopicEditor } from '@/components/teacher/TopicEditor';
import { useToast } from '@/components/ui/use-toast';

const TeacherTopics = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [subject, setSubject] = React.useState(() => 
    subjectId ? getSubjectById(subjectId) : undefined
  );
  
  const [editingTopic, setEditingTopic] = React.useState<Topic | null>(null);
  const [isCreatingTopic, setIsCreatingTopic] = React.useState(false);

  React.useEffect(() => {
    if (subjectId) {
      const fetchedSubject = getSubjectById(subjectId);
      setSubject(fetchedSubject);
      
      if (!fetchedSubject) {
        navigate('/teacher/subjects');
        toast({
          title: 'Subject Not Found',
          description: 'The requested subject could not be found.',
          variant: 'destructive',
        });
      }
    }
  }, [subjectId, navigate, toast]);

  const handleEditTopic = (topicId: string) => {
    if (!subjectId) return;
    
    const topic = getTopicById(subjectId, topicId);
    if (topic) {
      setEditingTopic(topic);
      setIsCreatingTopic(false);
    }
  };

  const handleCreateTopic = () => {
    setEditingTopic(null);
    setIsCreatingTopic(true);
  };

  const handleSaveTopic = (topic: Topic) => {
    if (!subjectId) return;
    
    if (isCreatingTopic) {
      // Creating a new topic
      const { id, ...topicWithoutId } = topic;
      addTopicToSubject(subjectId, {
        ...topicWithoutId,
        subjectId
      });
      
      toast({
        title: 'Topic Created',
        description: 'The new topic has been successfully created.',
      });
    } else {
      // Updating an existing topic
      updateSubjectTopic(subjectId, topic.id, topic);
      
      toast({
        title: 'Topic Updated',
        description: 'The topic has been successfully updated.',
      });
    }
    
    // Refresh the subject data
    setSubject(getSubjectById(subjectId));
    setEditingTopic(null);
    setIsCreatingTopic(false);
  };

  const handleCancelEdit = () => {
    setEditingTopic(null);
    setIsCreatingTopic(false);
  };

  if (!subject) {
    return (
      <DashboardLayout title="Topics">
        <div className="flex justify-center items-center h-64">
          <p>Loading subject information...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`${subject.name} - Topics`}>
      <div className="space-y-6">
        {/* Header with subject info and actions */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-lms-dark">{subject.name} Topics</h1>
            <p className="text-gray-600">{subject.description}</p>
          </div>
          <Button onClick={handleCreateTopic}>
            <Plus className="mr-2 h-4 w-4" />
            Add Topic
          </Button>
        </div>

        {/* Topic editor or creator */}
        {(editingTopic || isCreatingTopic) && (
          <TopicEditor
            topic={editingTopic}
            subjectId={subject.id}
            onSave={handleSaveTopic}
            onCancel={handleCancelEdit}
          />
        )}

        {/* Topics list */}
        {subject.topics && subject.topics.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {subject.topics.map((topic) => (
              <AccordionItem key={topic.id} value={topic.id}>
                <AccordionTrigger className="hover:bg-gray-50 px-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{topic.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2">
                  <div className="space-y-4">
                    <p className="text-gray-600">{topic.description}</p>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="font-medium mb-2">Resources:</div>
                      {topic.resources.length > 0 ? (
                        <div className="space-y-2">
                          {topic.resources.map((resource) => (
                            <div 
                              key={resource.id} 
                              className="flex items-center p-2 bg-white rounded border border-gray-200"
                            >
                              <File className="mr-2 h-4 w-4 text-gray-500" />
                              <span className="flex-1">{resource.title}</span>
                              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {resource.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No resources available</p>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditTopic(topic.id)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Topic
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Topics Available</h2>
            <p className="text-gray-500 mb-6">
              This subject doesn't have any topics yet. Add your first topic to get started.
            </p>
            <Button onClick={handleCreateTopic}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Topic
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeacherTopics;
