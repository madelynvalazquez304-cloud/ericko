import React, { useState } from 'react';

interface LoanCalculatorProps {
  onNext: () => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onNext }) => {
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(12);

  // Calculate monthly payment (8% flat rate as per the image example: 5000 + 8% = 5400 / 12 = 450)
  const calculateMonthly = () => {
    const total = amount * 1.08;
    return Math.round(total / term);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 p-8 sm:p-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Get Your Loan Approved Fast</h1>
        <p className="text-gray-500 text-sm">Quick approval • Competitive rates • Flexible terms</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Loan Calculator</h2>
        
        {/* Amount Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loan Amount</label>
            <span className="text-xl font-black text-blue-600">${amount.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="10000" 
            step="100"
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2 font-semibold">
            <span>$100</span>
            <span>$10,000</span>
          </div>
        </div>

        {/* Term Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loan Term</label>
            <span className="text-xl font-black text-blue-600">{term} months</span>
          </div>
          <input 
            type="range" 
            min="6" 
            max="60" 
            step="6"
            value={term} 
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2 font-semibold">
            <span>6 months</span>
            <span>60 months</span>
          </div>
        </div>

        {/* Monthly Payment Box */}
        <div className="bg-white p-5 rounded-xl border-2 border-gray-100 flex justify-between items-center shadow-sm">
          <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Monthly Payment</span>
          <span className="text-3xl font-black text-blue-600">${calculateMonthly().toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full group bg-[#3b82f6] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-widest text-base mb-8"
      >
        Apply Now
      </button>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-orange-500 text-2xl mb-1">⚡</div>
          <h3 className="text-xs font-bold text-gray-800">Fast Approval</h3>
          <p className="text-[10px] text-gray-500">Within 24 hours</p>
        </div>
        <div>
          <div className="text-yellow-500 text-2xl mb-1">💰</div>
          <h3 className="text-xs font-bold text-gray-800">Low Rates</h3>
          <p className="text-[10px] text-gray-500">From 8%</p>
        </div>
        <div>
          <div className="text-yellow-600 text-2xl mb-1">🔒</div>
          <h3 className="text-xs font-bold text-gray-800">Secure</h3>
          <p className="text-[10px] text-gray-500">Bank-level</p>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
