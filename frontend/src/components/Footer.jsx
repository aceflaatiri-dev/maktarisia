import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-gray-800 bg-[#0f172a]/80 backdrop-blur-xl">
      {/* Subtle bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* --- Brand Section --- */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4 group cursor-default">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
                <span className="text-black font-black text-lg">M</span>
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">
                MAKTARISIA
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
              The next generation of tech commerce. Engineered for performance and premium aesthetics.
            </p>
          </div>

          {/* --- Social Links --- */}
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-green-400 transition-colors duration-300">
              <FaGithub size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-green-400 transition-colors duration-300">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-green-400 transition-colors duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-green-400 transition-colors duration-300">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* --- Bottom Credits --- */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium tracking-wide">
            © {currentYear} <span className="text-gray-300">MAKTARISIA</span>. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold">
            Built with <span className="text-green-500">React</span> & <span className="text-blue-500">Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;