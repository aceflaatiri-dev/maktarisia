import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* --- Overlay (Backdrop) --- */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* --- Modal Content --- */}
      <div className="relative bg-[#1e293b] border border-gray-800 w-full max-w-md p-6 rounded-3xl shadow-2xl z-10 animate-in zoom-in-95 fade-in duration-300">
        
        {/* Close Button Area */}
        <div className="flex justify-end mb-2">
          <button
            className="text-gray-400 hover:text-white bg-gray-800/50 p-2 rounded-full transition-all duration-200 focus:outline-none"
            onClick={onClose}
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="text-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;