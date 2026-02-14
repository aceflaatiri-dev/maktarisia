import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/categorylist", label: "Categories" },
    { to: "/admin/productlist", label: "New Asset" },
    { to: "/admin/allproductslist", label: "Registry" },
    { to: "/admin/userlist", label: "Identities" },
    { to: "/admin/orderlist", label: "Transactions" },
  ];

  return (
    <>
      {/* 1. Toggle Button */}
      <button
        className={`${
          isMenuOpen ? "top-5 right-7 z-50" : "top-24 right-7 z-40"
        } p-3 fixed rounded-2xl bg-[#1e293b]/80 backdrop-blur-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300 shadow-xl group`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes className="text-white" size={20} />
        ) : (
          <div className="flex flex-col gap-1.5 px-1">
            <div className="w-6 h-[2px] bg-green-500 group-hover:w-4 transition-all"></div>
            <div className="w-4 h-[2px] bg-white ml-auto group-hover:w-6 transition-all"></div>
            <div className="w-6 h-[2px] bg-green-500 group-hover:w-4 transition-all"></div>
          </div>
        )}
      </button>

      {/* 2. Navigation HUD */}
      <div
        className={`fixed right-7 top-20 bg-[#0f172a]/95 backdrop-blur-2xl p-6 rounded-[2rem] border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
          isMenuOpen 
            ? "translate-x-0 opacity-100 scale-100" 
            : "translate-x-[120%] opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="mb-6 border-b border-gray-800 pb-4 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500">System Control</p>
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
        </div>

        <ul className="flex flex-col gap-1 min-w-[200px]">
          {navLinks.map((link, index) => (
            <li 
              key={link.to} 
              style={{ 
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                opacity: isMenuOpen ? 1 : 0,
                transitionProperty: 'transform, opacity',
                transitionDuration: '400ms'
              }}
            >
              <NavLink
                to={link.to}
                className="py-3 px-4 block rounded-xl font-bold text-sm transition-all hover:bg-white/5 group relative overflow-hidden"
                style={({ isActive }) => ({
                  color: isActive ? "#22c55e" : "#94a3b8",
                  background: isActive ? "rgba(34, 197, 94, 0.08)" : "transparent"
                })}
              >
                <div className="flex items-center justify-between relative z-10">
                  <span>{link.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[10px]">→</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Backdrop Blur */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-30 transition-opacity"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default AdminMenu;