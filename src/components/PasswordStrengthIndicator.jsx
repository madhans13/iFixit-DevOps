import React from 'react';
import { Check, X } from 'lucide-react';
import '../componentStyles/PasswordStrengthIndicator.css';

const PasswordStrengthIndicator = ({ password }) => {
  const requirements = [
    {
      label: 'At least 8 characters',
      test: () => password.length >= 8
    },
    {
      label: 'Contains uppercase letter',
      test: () => /[A-Z]/.test(password)
    },
    {
      label: 'Contains number',
      test: () => /[0-9]/.test(password)
    },
    {
      label: 'Contains special character',
      test: () => /[!@#$%^&*]/.test(password)
    }
  ];

  const getStrengthLevel = () => {
    const passedTests = requirements.filter(req => req.test()).length;
    if (passedTests === 0) return 'none';
    if (passedTests === 1) return 'weak';
    if (passedTests === 2) return 'fair';
    if (passedTests === 3) return 'good';
    return 'strong';
  };

  const strengthLevel = getStrengthLevel();
  const strengthText = {
    none: 'No Password',
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong'
  };

  return (
    <div className="password-strength-container">
      <div className="strength-meter">
        <div className={`strength-meter-fill ${strengthLevel}`} />
      </div>
      
      <div className="strength-text">
        Password Strength: <span className={strengthLevel}>{strengthText[strengthLevel]}</span>
      </div>

      <div className="requirements-list">
        {requirements.map((req, index) => (
          <div key={index} className={`requirement ${req.test() ? 'passed' : ''}`}>
            {req.test() ? (
              <Check size={16} className="check-icon" />
            ) : (
              <X size={16} className="x-icon" />
            )}
            <span>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator; 