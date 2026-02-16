import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { BASE_URL } from "../../redux/constants";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added to neuro-link (cart)", {
      autoClose: 1000,
    });
  };

  return (
    <div className="relative bg-[#101724] border border-slate-800 rounded-[2rem] p-5 w-[20rem] transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] group">
      {/* Brand Badge & Heart Icon */}
      <section className="relative">
        <span className="absolute top-2 left-2 bg-[#050505] text-[#22c55e] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-20">
          {p?.brand}
        </span>
        <div className="absolute top-2 right-2 z-20">
          <HeartIcon product={p} />
        </div>

        {/* The Tilted Image Container */}
        <div className="relative mb-6 flex justify-center items-center h-[200px]">
          <img
            className="w-full h-full object-contain transform -rotate-6 transition-transform group-hover:rotate-0 duration-500 z-10"
            src={BASE_URL + p?.image} // 2. Add BASE_URL here
            alt={p?.name}
          />
          
          {/* Neon Price Tag */}
          <div className="absolute bottom-4 -right-2 bg-[#22c55e] text-black font-black py-2 px-6 rounded-l-full shadow-[5px_5px_20px_rgba(34,197,94,0.4)] z-20">
            ${p?.price}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-[#22c55e] text-xl font-black tracking-tight">
            {p?.name}
          </h5>
        </div>

        <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2">
          {p?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center gap-4">
          <Link
            to={`/product/${p._id}`}
            className="flex-grow inline-flex items-center justify-center px-4 py-3 text-xs font-black text-white uppercase tracking-[0.2em] bg-[#1a2333] border border-slate-700 rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
          >
            Access Data
          </Link>

          <button
            onClick={() => addToCartHandler(p, 1)}
            className="p-4 bg-[#22c55e] rounded-2xl text-black hover:bg-[#4ade80] transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-90"
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;