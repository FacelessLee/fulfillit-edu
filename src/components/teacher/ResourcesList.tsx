
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { ResourceItem } from './ResourceItem';
import { UseFieldArrayReturn, UseFormRegister } from 'react-hook-form';

interface ResourcesListProps {
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
  register: UseFormRegister<any>;
}

export const ResourcesList: React.FC<ResourcesListProps> = ({
  fields,
  append,
  remove,
  register
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base">Resources</Label>
        <Button type="button" variant="outline" size="sm" onClick={append}>
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
            <ResourceItem
              key={field.id}
              index={index}
              register={register}
              onRemove={() => remove(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
