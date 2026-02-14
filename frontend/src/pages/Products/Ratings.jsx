import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color = "emerald-400" }) => {
  // Logic to determine star types
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0 && value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Map color prop to specific Tailwind classes to avoid purge issues
  const colorClass = {
    "yellow-500": "text-yellow-500",
    "emerald-400": "text-emerald-400",
    "green-500": "text-green-500",
  }[color] || "text-emerald-400";

  return (
    <div className="flex items-center gap-1 group cursor-default">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar 
          key={`full-${i}`} 
          className={`${colorClass} drop-shadow-[0_0_5px_rgba(52,211,153,0.3)] transition-transform group-hover:scale-110`} 
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <FaStarHalfAlt 
          className={`${colorClass} drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]`} 
        />
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar 
          key={`empty-${i}`} 
          className="text-gray-700" 
        />
      ))}

      {/* Label */}
      {text && (
        <span className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          {text}
        </span>
      )}
    </div>
  );
};

export default Ratings;