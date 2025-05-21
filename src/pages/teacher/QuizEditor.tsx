
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { getQuizById, createQuiz, updateQuiz } from '@/services/quizService';
import { getTeacherSubjects } from '@/services/subjectService';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Quiz, Question, Subject } from '@/models/curriculum';
import { X, Plus, FileText, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type QuizFormValues = {
  title: string;
  description: string;
  subjectId: string;
  topicId?: string;
  timeLimit: number;
  startDate: string;
  endDate: string;
  questions: {
    id?: string;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string | string[];
    points: number;
  }[];
};

const QuizEditor = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<{ id: string; title: string }[]>([]);
  const isEditing = quizId !== 'create';
  
  // Initialize form with existing quiz data or defaults
  const form = useForm<QuizFormValues>({
    defaultValues: async () => {
      if (isEditing && quizId) {
        const quiz = getQuizById(quizId);
        if (quiz) {
          // Convert dates to string format for the form
          return {
            ...quiz,
            startDate: new Date(quiz.startDate).toISOString().split('T')[0],
            endDate: new Date(quiz.endDate).toISOString().split('T')[0],
            questions: quiz.questions.map(q => ({
              ...q
            }))
          };
        }
      }
      
      // Default values for new quiz
      return {
        title: '',
        description: '',
        subjectId: '',
        timeLimit: 15,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        questions: [
          {
            text: '',
            type: 'multiple-choice',
            options: ['', '', '', ''],
            correctAnswer: '',
            points: 5
          }
        ]
      };
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions'
  });

  // Load teacher's subjects
  useEffect(() => {
    if (user?.id) {
      const teacherSubjs = getTeacherSubjects(user.id);
      setSubjects(teacherSubjs);
      
      // If we already have a subject ID in the form, load its topics
      const currentSubjectId = form.getValues('subjectId');
      if (currentSubjectId) {
        const subject = teacherSubjs.find(s => s.id === currentSubjectId);
        if (subject && subject.topics) {
          setTopics(subject.topics.map(t => ({ id: t.id, title: t.title })));
        }
      }
    }
  }, [user]);

  // When subject changes, update the topics dropdown
  const handleSubjectChange = (value: string) => {
    form.setValue('subjectId', value);
    form.setValue('topicId', undefined); // Reset topic when subject changes
    
    const subject = subjects.find(s => s.id === value);
    if (subject && subject.topics) {
      setTopics(subject.topics.map(t => ({ id: t.id, title: t.title })));
    } else {
      setTopics([]);
    }
  };

  const addQuestion = () => {
    append({
      text: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 5
    });
  };

  const handleQuestionTypeChange = (index: number, value: 'multiple-choice' | 'true-false' | 'short-answer') => {
    form.setValue(`questions.${index}.type`, value);
    
    // Reset options based on question type
    if (value === 'multiple-choice') {
      form.setValue(`questions.${index}.options`, ['', '', '', '']);
    } else if (value === 'true-false') {
      form.setValue(`questions.${index}.options`, ['True', 'False']);
    } else {
      form.setValue(`questions.${index}.options`, undefined);
    }
    
    // Reset correct answer when type changes
    form.setValue(`questions.${index}.correctAnswer`, '');
  };

  const onSubmit = (data: QuizFormValues) => {
    try {
      // Validate that at least one question exists
      if (data.questions.length === 0) {
        toast({
          title: 'Validation Error',
          description: 'Please add at least one question to the quiz.',
          variant: 'destructive',
        });
        return;
      }
      
      // Process the form data into a Quiz object
      const quizData: Omit<Quiz, 'id'> = {
        title: data.title,
        description: data.description,
        subjectId: data.subjectId,
        topicId: data.topicId,
        timeLimit: data.timeLimit,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        questions: data.questions.map(q => ({
          id: q.id || `temp-${Math.random().toString(36).substr(2, 9)}`,
          text: q.text,
          type: q.type,
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: q.points
        }))
      };
      
      if (isEditing && quizId) {
        // Update existing quiz
        updateQuiz(quizId, quizData);
        toast({
          title: 'Quiz Updated',
          description: 'The quiz has been successfully updated.',
        });
      } else {
        // Create new quiz
        createQuiz(quizData);
        toast({
          title: 'Quiz Created',
          description: 'A new quiz has been successfully created.',
        });
      }
      
      // Navigate back to quizzes list
      navigate('/teacher/quizzes');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while saving the quiz. Please try again.',
        variant: 'destructive',
      });
      console.error('Error saving quiz:', error);
    }
  };

  return (
    <DashboardLayout title={isEditing ? 'Edit Quiz' : 'Create New Quiz'}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Quiz Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Quiz Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quiz Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter quiz title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Limit (minutes)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Time limit in minutes"
                              min="1"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 15)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of this quiz"
                            {...field}
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subjectId">Subject</Label>
                      <select
                        id="subjectId"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={form.watch('subjectId')}
                        onChange={(e) => handleSubjectChange(e.target.value)}
                      >
                        <option value="" disabled>Select a subject</option>
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="topicId">Topic (Optional)</Label>
                      <select
                        id="topicId"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={form.watch('topicId') || ''}
                        onChange={(e) => form.setValue('topicId', e.target.value)}
                        disabled={!form.watch('subjectId') || topics.length === 0}
                      >
                        <option value="">All topics (General quiz)</option>
                        {topics.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topic.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Questions Section */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Questions</h3>
                    <Button type="button" onClick={addQuestion} variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </div>
                  
                  {fields.length === 0 ? (
                    <div className="text-center py-8 border border-dashed rounded-md">
                      <p className="text-gray-500">No questions added yet. Click "Add Question" to begin.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {fields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md bg-gray-50 relative">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            onClick={() => remove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Question {index + 1}</h4>
                              <div className="flex items-center space-x-2">
                                <Label htmlFor={`questions.${index}.points`} className="text-sm">Points:</Label>
                                <Input
                                  id={`questions.${index}.points`}
                                  type="number"
                                  className="w-20"
                                  min="1"
                                  {...form.register(`questions.${index}.points`, {
                                    valueAsNumber: true,
                                    min: 1
                                  })}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor={`questions.${index}.text`}>Question Text</Label>
                              <Textarea
                                id={`questions.${index}.text`}
                                placeholder="Enter your question"
                                {...form.register(`questions.${index}.text`)}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`questions.${index}.type`}>Question Type</Label>
                              <select
                                id={`questions.${index}.type`}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={form.watch(`questions.${index}.type`)}
                                onChange={(e) => handleQuestionTypeChange(
                                  index, 
                                  e.target.value as 'multiple-choice' | 'true-false' | 'short-answer'
                                )}
                              >
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="true-false">True/False</option>
                                <option value="short-answer">Short Answer</option>
                              </select>
                            </div>
                            
                            {/* Options for multiple-choice or true-false */}
                            {(form.watch(`questions.${index}.type`) === 'multiple-choice' ||
                              form.watch(`questions.${index}.type`) === 'true-false') && (
                              <>
                                <div className="space-y-3">
                                  <Label>Options</Label>
                                  {form.watch(`questions.${index}.options`)?.map((_, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center space-x-2">
                                      <Input
                                        placeholder={`Option ${optionIndex + 1}`}
                                        {...form.register(`questions.${index}.options.${optionIndex}`)}
                                        readOnly={form.watch(`questions.${index}.type`) === 'true-false'}
                                      />
                                      <input
                                        type="radio"
                                        name={`correctOption${index}`}
                                        checked={form.watch(`questions.${index}.correctAnswer`) === 
                                                form.watch(`questions.${index}.options.${optionIndex}`)}
                                        onChange={() => form.setValue(
                                          `questions.${index}.correctAnswer`, 
                                          form.watch(`questions.${index}.options.${optionIndex}`)
                                        )}
                                        className="h-4 w-4"
                                      />
                                      <Label className="text-sm">Correct</Label>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                            
                            {/* Short answer */}
                            {form.watch(`questions.${index}.type`) === 'short-answer' && (
                              <div>
                                <Label htmlFor={`questions.${index}.correctAnswer`}>Correct Answer</Label>
                                <Input
                                  id={`questions.${index}.correctAnswer`}
                                  placeholder="Enter the correct answer"
                                  {...form.register(`questions.${index}.correctAnswer`)}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  For short answer questions, students' responses will be compared to this answer.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/teacher/quizzes')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? 'Update Quiz' : 'Create Quiz'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default QuizEditor;
