import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import '../componentStyles/RateLimitInfo.css';

const RateLimitInfo = ({ remainingAttempts, lockoutTime, onLockoutEnd }) => {
  const [timeLeft, setTimeLeft] = useState(lockoutTime);

  useEffect(() => {
    if (!lockoutTime) return;

    const timer = setInterval(() => {
      const newTimeLeft = Math.max(0, lockoutTime - Date.now());
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === 0) {
        clearInterval(timer);
        onLockoutEnd?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutTime, onLockoutEnd]);

  if (!remainingAttempts && !lockoutTime) return null;

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`rate-limit-info ${remainingAttempts < 3 ? 'warning' : ''}`}>
      <AlertTriangle size={20} />
      {lockoutTime ? (
        <div className="lockout-message">
          <p>Account temporarily locked</p>
          <p className="countdown">Try again in {formatTime(timeLeft)}</p>
        </div>
      ) : (
        <p>
          {remainingAttempts} login {remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining
        </p>
      )}
    </div>
  );
};

export default RateLimitInfo; 