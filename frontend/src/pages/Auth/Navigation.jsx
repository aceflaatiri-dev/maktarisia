import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  AiOutlineHome, 
  AiOutlineShopping, 
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose 
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

// Redux
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const cartCount = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.qty, 0), 
  [cartItems]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = "flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-green-400 transition-all duration-300";

  return (
    <nav className="sticky top-0 z-[100] bg-[#0f172a]/80 backdrop-blur-xl border-b border-gray-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* --- Brand Logo --- */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-green-500 text-black font-black w-10 h-10 flex items-center justify-center rounded-xl text-xl shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
              M
            </div>
            <span className="text-xl font-black tracking-tighter text-white group-hover:text-green-400 transition-colors">
              MAKTARISIA
            </span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex gap-10 items-center">
            <Link to="/" className={navLinkClass}>
              <AiOutlineHome size={20} className="mb-0.5" /> Home
            </Link>
            <Link to="/shop" className={navLinkClass}>
              <AiOutlineShopping size={20} className="mb-0.5" /> Shop
            </Link>
          </div>

          {/* --- Right Section Actions --- */}
          <div className="flex items-center gap-2">
            
            {/* Favorites Icon */}
            <Link to="/favorite" className="relative p-3 text-gray-400 hover:text-red-500 hover:bg-gray-800/50 rounded-full transition-all group">
              <FaHeart size={20} />
              <div className="absolute top-1 right-1">
                 <FavoritesCount />
              </div>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-3 text-gray-400 hover:text-green-400 hover:bg-gray-800/50 rounded-full transition-all">
              <AiOutlineShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 bg-green-500 text-black text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#0f172a]">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Logic */}
            <div className="hidden md:flex items-center ml-4 border-l border-gray-800 pl-6">
              {!userInfo ? (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white">Login</Link>
                  <Link to="/register" className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-green-500 transition-all shadow-lg shadow-white/5">
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-3 bg-[#1e293b]/50 border px-4 py-2 rounded-xl transition-all ${dropdownOpen ? 'border-green-500 text-green-400' : 'border-gray-700 text-white hover:border-gray-500'}`}
                  >
                    <div className="w-6 h-6 bg-gradient-to-tr from-green-500 to-blue-600 rounded-full text-[10px] flex items-center justify-center font-bold text-black uppercase">
                      {userInfo.username.charAt(0)}
                    </div>
                    <span className="text-xs font-black tracking-widest uppercase">{userInfo.username}</span>
                    <svg className={`w-3 h-3 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#1e293b] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden p-2 animate-in fade-in slide-in-from-top-2">
                      {userInfo.isAdmin && (
                        <div className="mb-2 pb-2 border-b border-gray-800">
                          <span className="block px-4 py-2 text-[10px] text-gray-500 uppercase font-black tracking-widest">Admin Dashboard</span>
                          <Link className="block px-4 py-2.5 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-green-400 rounded-lg transition-all" to="/admin/dashboard" onClick={() => setDropdownOpen(false)}>Analytics</Link>
                          <Link className="block px-4 py-2.5 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-green-400 rounded-lg transition-all" to="/admin/productlist" onClick={() => setDropdownOpen(false)}>Product Inventory</Link>
                        </div>
                      )}
                      <Link className="block px-4 py-2.5 text-sm font-bold text-gray-300 hover:bg-gray-800 rounded-lg transition-all" to="/profile" onClick={() => setDropdownOpen(false)}>Account Settings</Link>
                      <button onClick={logoutHandler} className="w-full text-left mt-1 px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-900/20 rounded-lg transition-all">
                        Terminate Session
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-3 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-t border-gray-800 px-6 py-8 space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-black uppercase tracking-widest text-white">Home</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-black uppercase tracking-widest text-white">Shop</Link>
          {!userInfo && (
            <div className="flex flex-col gap-4 pt-6">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center p-4 border border-gray-700 rounded-2xl font-black uppercase tracking-widest text-sm text-gray-400">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center p-4 bg-green-500 text-black rounded-2xl font-black uppercase tracking-widest text-sm">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;