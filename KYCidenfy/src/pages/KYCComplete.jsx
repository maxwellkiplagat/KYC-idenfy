// src/pages/KYCComplete.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const KYCComplete = () => {
  const [status, setStatus] = useState('checking');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('sessionId');
    const result = params.get('result'); // APPROVED, DENIED, etc.

    if (sessionId && result) {
      setStatus(result.toLowerCase());
    } else {
      setStatus('unknown');
    }
  }, [location]);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="mb-6">
        {status === 'approved' && (
          <div className="text-green-600">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold mt-4">KYC Approved!</h2>
            <p>You can now apply for loans.</p>
          </div>
        )}

        {status === 'denied' && (
          <div className="text-red-600">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h2 className="text-2xl font-bold mt-4">KYC Rejected</h2>
            <p>Please contact support.</p>
          </div>
        )}

        {status === 'checking' && (
          <p>Verifying your identity...</p>
        )}
      </div>

      <a
        href="/dashboard"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Go to Dashboard
      </a>
    </div>
  );
};

export default KYCComplete;