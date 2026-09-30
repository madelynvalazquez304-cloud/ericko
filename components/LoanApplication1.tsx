import React, { useState } from 'react';

interface LoanApplication1Props {
  onNext: (data: any) => void;
}

const LoanApplication1: React.FC<LoanApplication1Props> = ({ onNext }) => {
  const [loanType, setLoanType] = useState('Personal Loan');
  const [loanAmount, setLoanAmount] = useState('5000');
  const [loanTerm, setLoanTerm] = useState('12 Months');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ loanType, loanAmount, loanTerm, purpose });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300 p-8 sm:p-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Loan Application</h1>
        <p className="text-gray-500 text-sm mb-6">Step 1 of 3</p>
        
        {/* Progress Bar */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
          <div className="h-1 w-12 bg-gray-200 rounded-full"></div>
          <div className="h-1 w-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Loan Type
          </label>
          <select
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium appearance-none"
            required
          >
            <option value="Personal Loan">Personal Loan</option>
            <option value="Business Loan">Business Loan</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Education Loan">Education Loan</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Loan Term
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium appearance-none"
            required
          >
            <option value="6 Months">6 Months</option>
            <option value="12 Months">12 Months</option>
            <option value="18 Months">18 Months</option>
            <option value="36 Months">36 Months</option>
            <option value="48 Months">48 Months</option>
            <option value="60 Months">60 Months</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Purpose of Loan
          </label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="What will you use the loan for?"
            rows={3}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium resize-none placeholder-gray-400"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full group bg-[#3b82f6] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-widest text-sm mt-8"
        >
          Next Step
        </button>
      </form>
    </div>
  );
};

export default LoanApplication1;
