const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-4 bg-[#1e293b]/20 border border-gray-800 rounded-2xl backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className="w-full py-3 px-5 bg-[#0f172a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300"
            placeholder="Enter category name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button 
            type="submit"
            className="flex-grow bg-green-500 text-black font-black uppercase tracking-widest text-xs py-3 px-6 rounded-xl hover:bg-green-400 transition-all duration-300 shadow-lg shadow-green-500/10 active:scale-95"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button" // Specified type to prevent accidental form submission
              onClick={handleDelete}
              className="bg-transparent border border-red-500/50 text-red-500 font-bold uppercase tracking-widest text-[10px] py-3 px-6 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;