const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center w-full max-w-2xl mx-auto py-8 px-4">
      {/* --- Step 1: Login --- */}
      <div className="flex flex-col items-center relative flex-1">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
          step1 ? "bg-green-500 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "bg-[#0f172a] border-gray-700 text-gray-500"
        }`}>
          {step1 ? <span className="text-black font-black text-xs">✓</span> : <span className="text-xs font-bold">1</span>}
        </div>
        <span className={`mt-3 text-[10px] uppercase tracking-[0.2em] font-black transition-colors ${step1 ? "text-green-400" : "text-gray-600"}`}>
          Login
        </span>
        {/* Connector Line to Step 2 */}
        <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 transition-colors duration-500 ${step2 ? "bg-green-500" : "bg-gray-800"}`} />
      </div>

      {/* --- Step 2: Shipping --- */}
      <div className="flex flex-col items-center relative flex-1">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
          step2 ? "bg-green-500 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "bg-[#0f172a] border-gray-700 text-gray-500"
        }`}>
          {step2 ? <span className="text-black font-black text-xs">✓</span> : <span className="text-xs font-bold">2</span>}
        </div>
        <span className={`mt-3 text-[10px] uppercase tracking-[0.2em] font-black transition-colors ${step2 ? "text-green-400" : "text-gray-600"}`}>
          Shipping
        </span>
        {/* Connector Line to Step 3 */}
        <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 transition-colors duration-500 ${step3 ? "bg-green-500" : "bg-gray-800"}`} />
      </div>

      {/* --- Step 3: Summary --- */}
      <div className="flex flex-col items-center relative">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
          step3 ? "bg-green-500 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "bg-[#0f172a] border-gray-700 text-gray-500"
        }`}>
          {step3 ? <span className="text-black font-black text-xs">✓</span> : <span className="text-xs font-bold">3</span>}
        </div>
        <span className={`mt-3 text-[10px] uppercase tracking-[0.2em] font-black transition-colors ${step3 ? "text-green-400" : "text-gray-600"}`}>
          Summary
        </span>
      </div>
    </div>
  );
};

export default ProgressSteps;