import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export const MFormField = ({ id, label, error, children }: FormFieldProps) => (
  <div className="space-y-2">
    <label
      className="block text-sm font-medium"
      htmlFor={id}
    >
      {label}
    </label>
    {children}
    {error && (
      <p
        id={`${id}-error`}
        className="text-sm text-danger"
      >
        {error}
      </p>
    )}
  </div>
);
