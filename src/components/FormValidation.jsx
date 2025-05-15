import React from 'react';
import { AlertCircle } from 'lucide-react';
import '../componentStyles/FormValidation.css';

export const FormError = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="form-error">
      <AlertCircle size={16} className="error-icon" />
      <span>{message}</span>
    </div>
  );
};

export const FormField = ({ label, error, children }) => {
  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      {label && <label className="form-label">{label}</label>}
      {children}
      <FormError message={error} />
    </div>
  );
}; 