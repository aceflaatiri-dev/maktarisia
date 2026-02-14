import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-800 pb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
            Your <span className="text-green-500">Collection</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">
            Curated Favorites & Wishlist
          </p>
        </div>
        
        <div className="text-sm font-black text-gray-400 uppercase tracking-widest">
          {favorites.length} Items Saved
        </div>
      </div>

      {/* --- Grid Section --- */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[#1e293b]/20 rounded-3xl border border-dashed border-gray-800">
          <AiOutlineShopping size={50} className="text-gray-700 mb-4" />
          <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest">Your list is empty</h2>
          <p className="text-gray-600 text-sm mt-2 mb-8 uppercase tracking-tighter">Start adding items you love</p>
          <Link 
            to="/shop" 
            className="bg-white text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-green-500 transition-all shadow-xl shadow-white/5"
          >
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((product) => (
            <div key={product._id} className="animate-in fade-in zoom-in duration-500">
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;