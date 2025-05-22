
import React from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ResourcesList } from './ResourcesList';
import { useForm, useFieldArray } from 'react-hook-form';
import { Topic, Resource } from '@/models/curriculum';

type ResourceFormType = Omit<Resource, 'id' | 'topicId'>;

interface TopicFormProps {
  topic: Topic | null;
  subjectId: string;
  onSave: (topic: Topic) => void;
  onCancel: () => void;
}

export const TopicForm: React.FC<TopicFormProps> = ({
  topic,
  subjectId,
  onSave,
  onCancel
}) => {
  const isCreating = !topic;
  const defaultValues = isCreating
    ? {
        title: '',
        description: '',
        content: '',
        order: 1,
        subjectId,
        resources: [] as ResourceFormType[]
      }
    : {
        ...topic,
        resources: topic.resources.map(r => ({
          title: r.title,
          type: r.type,
          url: r.url
        }))
      };

  const form = useForm({
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'resources'
  });

  const onSubmit = (data: any) => {
    if (isCreating) {
      // Creating a new topic
      const newTopic: Topic = {
        id: `temp-id-${Date.now()}`, // This will be replaced by the service
        title: data.title,
        description: data.description,
        content: data.content,
        subjectId,
        order: data.order,
        resources: data.resources.map((r: ResourceFormType, index: number) => ({
          ...r,
          id: `temp-resource-id-${index}`, // This will be replaced by the service
          topicId: `temp-id` // This will be replaced by the service
        }))
      };
      onSave(newTopic);
    } else {
      // Updating existing topic
      const updatedTopic: Topic = {
        ...topic,
        title: data.title,
        description: data.description,
        content: data.content,
        order: data.order,
        resources: data.resources.map((r: ResourceFormType, index: number) => {
          const existingResource = topic.resources[index];
          return {
            ...r,
            id: existingResource?.id || `temp-resource-id-${index}`,
            topicId: topic.id
          };
        })
      };
      onSave(updatedTopic);
    }
  };

  const addResource = () => {
    append({ 
      title: '', 
      type: 'pdf', 
      url: '' 
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter topic title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Display order" 
                    {...field} 
                    onChange={e => field.onChange(parseInt(e.target.value) || 1)}
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
                  placeholder="Brief description of this topic" 
                  {...field}
                  rows={2} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Main content of this topic" 
                  {...field}
                  rows={6} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ResourcesList 
          fields={fields}
          append={addResource}
          remove={remove}
          register={form.register}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isCreating ? 'Create Topic' : 'Update Topic'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
