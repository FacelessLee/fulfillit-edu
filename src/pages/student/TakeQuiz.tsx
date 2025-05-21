
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, submitQuizAttempt } from '@/services/quizService';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Quiz, Question } from '@/models/curriculum';
import { Clock, Check, X } from 'lucide-react';

const TakeQuiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<Quiz | undefined>();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  
  // Load quiz data
  useEffect(() => {
    if (quizId) {
      const loadedQuiz = getQuizById(quizId);
      if (!loadedQuiz) {
        toast({
          title: 'Quiz Not Found',
          description: 'The requested quiz could not be found.',
          variant: 'destructive',
        });
        navigate('/student/subjects');
        return;
      }
      
      setQuiz(loadedQuiz);
      setTimeRemaining(loadedQuiz.timeLimit * 60); // Convert minutes to seconds
      
      // Initialize answers object
      const initialAnswers: Record<string, string | string[]> = {};
      loadedQuiz.questions.forEach(q => {
        initialAnswers[q.id] = '';
      });
      setAnswers(initialAnswers);
    }
  }, [quizId, navigate, toast]);
  
  // Timer logic
  useEffect(() => {
    if (!quiz || quizSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quiz, quizSubmitted]);
  
  // Format time remaining
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleNextQuestion = () => {
    if (!quiz) return;
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitQuiz = async () => {
    if (!quiz || !user) return;
    
    if (confirmSubmit || timeRemaining <= 0) {
      try {
        // Submit quiz
        const result = submitQuizAttempt(user.id, quiz.id, answers);
        
        setQuizSubmitted(true);
        
        toast({
          title: 'Quiz Submitted',
          description: `Your score: ${result.score}/${result.maxScore} (${Math.round((result.score / result.maxScore) * 100)}%)`,
        });
        
        // Navigate back after a short delay
        setTimeout(() => {
          navigate(`/student/subjects/${quiz.subjectId}`);
        }, 3000);
      } catch (error) {
        toast({
          title: 'Submission Error',
          description: 'There was an error submitting your quiz. Please try again.',
          variant: 'destructive',
        });
        console.error('Error submitting quiz:', error);
      }
    } else {
      setConfirmSubmit(true);
    }
  };
  
  const cancelSubmit = () => {
    setConfirmSubmit(false);
  };
  
  if (!quiz) {
    return (
      <DashboardLayout title="Take Quiz">
        <div className="flex justify-center items-center h-64">
          <p>Loading quiz...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <DashboardLayout title={quiz.title}>
      <div className="space-y-6">
        {quizSubmitted ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Quiz Submitted</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Check className="h-16 w-16 text-green-500" />
              <p className="text-lg text-center">
                Your quiz has been successfully submitted. You will be redirected shortly.
              </p>
            </CardContent>
          </Card>
        ) : confirmSubmit ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Confirm Submission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center">
                Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <Button variant="outline" onClick={cancelSubmit}>
                  Go Back
                </Button>
                <Button onClick={handleSubmitQuiz}>
                  Yes, Submit Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Quiz header with progress and timer */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
              <div>
                <h1 className="text-xl font-semibold">{quiz.title}</h1>
                <p className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </p>
              </div>
              <div className="flex items-center bg-red-50 px-3 py-1 rounded-md">
                <Clock className="h-4 w-4 mr-2 text-red-500" />
                <span className="font-medium text-red-700">{formatTimeRemaining()}</span>
              </div>
            </div>
            
            {/* Question card */}
            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">{currentQuestion.text}</p>
                
                {/* Multiple choice question */}
                {currentQuestion.type === 'multiple-choice' && (
                  <RadioGroup
                    value={answers[currentQuestion.id] as string || ''}
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                
                {/* True/False question */}
                {currentQuestion.type === 'true-false' && (
                  <RadioGroup
                    value={answers[currentQuestion.id] as string || ''}
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="True" id="true" />
                      <Label htmlFor="true">True</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="False" id="false" />
                      <Label htmlFor="false">False</Label>
                    </div>
                  </RadioGroup>
                )}
                
                {/* Short answer question */}
                {currentQuestion.type === 'short-answer' && (
                  <div>
                    <Label htmlFor="short-answer">Your Answer</Label>
                    <Textarea
                      id="short-answer"
                      placeholder="Type your answer here..."
                      value={answers[currentQuestion.id] as string || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      rows={4}
                    />
                  </div>
                )}
                
                {/* Navigation buttons */}
                <div className="flex justify-between items-center pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentQuestionIndex < quiz.questions.length - 1 ? (
                    <Button onClick={handleNextQuestion}>
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmitQuiz}>
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation dots */}
            <div className="flex justify-center space-x-1 py-4">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentQuestionIndex === index 
                      ? 'bg-blue-500' 
                      : answers[quiz.questions[index].id] 
                        ? 'bg-green-300'
                        : 'bg-gray-300'
                  }`}
                  aria-label={`Go to question ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TakeQuiz;
