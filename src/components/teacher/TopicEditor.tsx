
import React from 'react';
import { Topic } from '@/models/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TopicForm } from './TopicForm';

interface TopicEditorProps {
  topic: Topic | null;
  subjectId: string;
  onSave: (topic: Topic) => void;
  onCancel: () => void;
}

export const TopicEditor: React.FC<TopicEditorProps> = ({
  topic,
  subjectId,
  onSave,
  onCancel
}) => {
  const isCreating = !topic;

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader className="bg-blue-50">
        <CardTitle>
          {isCreating ? 'Create New Topic' : `Edit Topic: ${topic.title}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <TopicForm
          topic={topic}
          subjectId={subjectId}
          onSave={onSave}
          onCancel={onCancel}
        />
      </CardContent>
    </Card>
  );
};
