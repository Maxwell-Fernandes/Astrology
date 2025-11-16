import { type ReactNode } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { Input, Label } from '@/components/atoms';

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
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
  const errorId = error ? `${name}-error` : undefined;

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
          aria-describedby={errorId}
          fullWidth
          {...register}
        />
      )}
      {error && (
        <p id={errorId} className="text-sm text-red-600 animate-fade-in" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
