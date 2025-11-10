import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

const KYCVerification = () => {
  const { token } = useAuth();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const initiateKYC = async () => {
    setStatus('loading');
    setError('');

    try {
      const res = await axios.post(
        '/api/kyc/initiate/',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { session_url } = res.data;
      setStatus('redirecting');
      window.location.href = session_url;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to start KYC');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">
      <div className="w-[90%] sm:w-[400px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center relative">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"></div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <ShieldCheck className="text-blue-600 w-10 h-10" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Verify Your Identity
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Complete KYC verification to unlock access. It only takes a few minutes.
        </p>

        {/* States */}
        {status === 'idle' && (
          <button
            onClick={initiateKYC}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            Start Verification
          </button>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 w-8 h-8 mb-2" />
            <p className="text-gray-500">Preparing secure session...</p>
          </div>
        )}

        {status === 'redirecting' && (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 w-8 h-8 mb-2" />
            <p className="text-gray-500">Redirecting to secure KYC provider...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg w-full text-sm text-left">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-4 h-4 mr-2" />
              <p className="font-semibold">Error</p>
            </div>
            <p>{error}</p>
            <button
              onClick={initiateKYC}
              className="mt-3 text-blue-600 font-medium hover:underline text-sm"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerification;
