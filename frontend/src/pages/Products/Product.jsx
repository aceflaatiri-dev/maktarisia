import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { BASE_URL } from "../redux/constants"; // Add this import

const Product = ({ product }) => {
  return (
    <div className="group relative bg-[#1e293b]/30 backdrop-blur-md border border-gray-800 rounded-3xl p-4 transition-all duration-500 hover:border-green-500/40 hover:shadow-[0_0_50px_-12px_rgba(34,197,94,0.15)] flex flex-col h-full">
      
      {/* --- Image/Asset Container --- */}
      <div className="relative mb-5 aspect-[4/5] bg-[#0f172a] overflow-hidden rounded-2xl flex justify-center items-center border border-gray-800/50">
        
        {/* Decorative Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <img
          /* Concatenate BASE_URL to the image path */
          src={BASE_URL + product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-8 transform transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* ... (rest of your component remains the same) ... */}
        <div className="absolute top-0 right-0 z-20">
          <HeartIcon product={product} />
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-[#0f172a]/80 backdrop-blur-md text-[8px] font-black text-green-500/80 px-2 py-1 rounded-md border border-green-500/20 uppercase tracking-[0.2em]">
            {product.brand || "Maktarisia"}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
           <div className="bg-white text-black px-3 py-1.5 rounded-xl text-xs font-black shadow-2xl">
             ${product.price}
           </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow px-1">
        <div className="mb-4">
          <p className="text-gray-500 text-[9px] uppercase tracking-[0.3em] font-bold mb-1">
            {product.category || "Hardware"}
          </p>
          <Link to={`/product/${product._id}`}>
            <h3 className="text-white font-black text-base leading-tight hover:text-green-400 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-800/50 flex items-center justify-between">
          <span className="text-white font-black text-lg tracking-tighter group-hover:text-green-500 transition-colors">
            ${product.price}
          </span>
          
          <Link 
            to={`/product/${product._id}`}
            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            Details 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;