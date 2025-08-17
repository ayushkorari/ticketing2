'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessMessage() {
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get('success');
    if (success) {
      setMessage(success);
      // Clear the message after 5 seconds
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!message) return null;

  return (
    <div className="container mt-3">
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        {message}
        <button 
          type="button" 
          className="btn-close" 
          onClick={() => setMessage('')}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}