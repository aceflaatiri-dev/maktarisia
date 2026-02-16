import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { BASE_URL } from "../../redux/constants";

const SmallProduct = ({ product }) => {
  return (
    <div className="group p-2 transition-all duration-500 hover:-translate-y-1">
      {/* --- Image Asset Pocket --- */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-[#0f172a]/80 border border-gray-800 flex items-center justify-center p-3 transition-all duration-500 group-hover:border-green-500/40 group-hover:shadow-[0_0_20px_-5px_rgba(34,197,94,0.2)]">
        
        {/* Subtle HUD Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
        
        <Link to={`/product/${product._id}`} className="w-full h-full z-10">
          <img
            /* 2. Update the src with BASE_URL */
            src={BASE_URL + product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
        
        {/* Compact Heart Icon */}
        <div className="absolute top-1.5 right-1.5 z-20 scale-75 origin-top-right">
          <HeartIcon product={product} />
        </div>

        {/* Brand Micro-Label */}
        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm border border-white/5 rounded text-[8px] font-black uppercase text-gray-500 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          {product.brand}
        </div>
      </div>

      {/* --- Data Readout --- */}
      <div className="mt-2.5 px-0.5">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-white text-[11px] font-black uppercase tracking-wider truncate group-hover:text-green-400 transition-colors mb-1">
            {product.name}
          </h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-0.5">
              <span className="text-green-500 text-[9px] font-bold">$</span>
              <span className="text-white font-black text-xs tracking-tighter">
                {product.price}
              </span>
            </div>
            
            <div className="h-1 w-1 rounded-full bg-gray-800 group-hover:bg-green-500 transition-colors"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;