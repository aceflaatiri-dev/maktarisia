import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <>
      {favoriteCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
          {/* Breathing Animation Effect */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          
          {/* Main Badge */}
          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-red-500 text-[10px] font-black text-white border-2 border-[#0f172a]">
            {favoriteCount}
          </span>
        </span>
      )}
    </>
  );
};

export default FavoritesCount;