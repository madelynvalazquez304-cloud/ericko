import React, { useState } from 'react';

interface LoanApplication2Props {
  onNext: (data: any) => void;
  onPrev: () => void;
}

const LoanApplication2: React.FC<LoanApplication2Props> = ({ onNext, onPrev }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ firstName, lastName, email });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300 p-8 sm:p-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Loan Application</h1>
        <p className="text-gray-500 text-sm mb-6">Step 2 of 3</p>
        
        {/* Progress Bar */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
          <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
          <div className="h-1 w-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@example.com"
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onPrev}
            className="w-1/2 bg-gray-100 text-gray-600 font-bold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 uppercase tracking-widest text-sm"
          >
            Previous
          </button>
          <button
            type="submit"
            className="w-1/2 bg-[#3b82f6] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-widest text-sm"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplication2;
