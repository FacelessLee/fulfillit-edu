
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Topic, Resource } from '@/models/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface TopicEditorProps {
  topic: Topic | null;
  subjectId: string;
  onSave: (topic: Topic) => void;
  onCancel: () => void;
}

type ResourceFormType = Omit<Resource, 'id' | 'topicId'>;

export const TopicEditor: React.FC<TopicEditorProps> = ({
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
    <Card className="border-2 border-blue-200">
      <CardHeader className="bg-blue-50">
        <CardTitle>
          {isCreating ? 'Create New Topic' : `Edit Topic: ${topic.title}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
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

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base">Resources</Label>
                <Button type="button" variant="outline" size="sm" onClick={addResource}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Resource
                </Button>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-4 text-gray-500 border border-dashed border-gray-300 rounded-md">
                  No resources added yet. Click "Add Resource" to add materials.
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-md p-4 bg-gray-50 relative">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor={`resources.${index}.title`}>Resource Title</Label>
                          <Input
                            id={`resources.${index}.title`}
                            {...form.register(`resources.${index}.title`)}
                            placeholder="Resource title"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`resources.${index}.type`}>Type</Label>
                          <select
                            id={`resources.${index}.type`}
                            {...form.register(`resources.${index}.type`)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="pdf">PDF</option>
                            <option value="video">Video</option>
                            <option value="image">Image</option>
                            <option value="link">Link</option>
                            <option value="document">Document</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`resources.${index}.url`}>URL or Link</Label>
                        <Input
                          id={`resources.${index}.url`}
                          {...form.register(`resources.${index}.url`)}
                          placeholder="https://example.com/resource"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
      </CardContent>
    </Card>
  );
};
