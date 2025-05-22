
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';

interface ResourceItemProps {
  index: number;
  register: UseFormRegister<any>;
  onRemove: () => void;
}

export const ResourceItem: React.FC<ResourceItemProps> = ({
  index,
  register,
  onRemove
}) => {
  return (
    <div className="border rounded-md p-4 bg-gray-50 relative">
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor={`resources.${index}.title`}>Resource Title</Label>
          <Input
            id={`resources.${index}.title`}
            {...register(`resources.${index}.title`)}
            placeholder="Resource title"
          />
        </div>

        <div>
          <Label htmlFor={`resources.${index}.type`}>Type</Label>
          <select
            id={`resources.${index}.type`}
            {...register(`resources.${index}.type`)}
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
          {...register(`resources.${index}.url`)}
          placeholder="https://example.com/resource"
        />
      </div>
    </div>
  );
};
