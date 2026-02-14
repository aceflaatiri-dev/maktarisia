import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = (e) => {
    // Prevent the click from triggering parent Link navigation
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-4 right-4 z-10 cursor-pointer group"
      onClick={toggleFavorites}
    >
      <div className={`
        relative p-2.5 rounded-xl transition-all duration-300 backdrop-blur-md
        ${isFavorite 
          ? "bg-red-500/10 border border-red-500/20" 
          : "bg-[#0f172a]/40 border border-white/10 hover:border-red-500/40"}
      `}>
        {isFavorite ? (
          <FaHeart className="text-red-500 transition-transform duration-300 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" size={18} />
        ) : (
          <FaRegHeart className="text-gray-400 group-hover:text-red-400 transition-all duration-300" size={18} />
        )}

        {/* Subtle background pulse for active favorites */}
        {isFavorite && (
          <span className="absolute inset-0 rounded-xl bg-red-500/5 animate-pulse"></span>
        )}
      </div>
    </div>
  );
};

export default HeartIcon;