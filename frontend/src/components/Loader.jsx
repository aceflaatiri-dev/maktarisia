const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        {/* Outer Glowing Ring */}
        <div className="absolute inset-0 rounded-full blur-md bg-green-500/30 animate-pulse"></div>
        
        {/* Main Spinner */}
        <div className="relative h-16 w-16 border-4 border-gray-800 border-t-green-500 rounded-full animate-spin shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
        
        {/* Inner Logo/Dot (Optional) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
      </div>
    </div>
  );
};

export default Loader;