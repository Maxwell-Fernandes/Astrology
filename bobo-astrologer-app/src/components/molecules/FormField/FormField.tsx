import { type ReactNode } from 'react';
import { Input, Label } from '@/components/atoms';

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register?: any;
  children?: ReactNode;
}

export const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  required,
  register,
  children,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      {children || (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          error={!!error}
          fullWidth
          {...register}
        />
      )}
      {error && (
        <p className="text-sm text-red-600 animate-fade-in">{error}</p>
      )}
    </div>
  );
};
