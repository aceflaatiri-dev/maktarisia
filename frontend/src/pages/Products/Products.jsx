import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Rating from "./Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import moment from "moment";
import ProductTabs from "./Tabs";
import HeartIcon from "./HeartIcon";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Deployment successful: Item added to cart", {
       theme: "dark",
       position: "bottom-right"
    });
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Data Logged: Review submitted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const statItemClass = "flex items-center gap-4 p-4 bg-[#0f172a]/50 rounded-2xl border border-gray-800/50 hover:border-green-500/30 transition-colors";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* --- Navigation --- */}
        <Link
          to="/"
          className="group inline-flex items-center gap-3 text-gray-500 hover:text-green-400 transition-all mb-12 font-black text-xs uppercase tracking-[0.3em]"
        >
          <FaArrowLeft className="group-hover:-translate-x-2 transition-transform" /> 
          Back to Terminal
        </Link>

        {isLoading ? (
          <div className="flex justify-center items-center h-96"><Loader /></div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              
              {/* --- LEFT: Image & Visual Presence --- */}
              <div className="w-full lg:w-1/2 relative">
                <div className="sticky top-10">
                  <div className="relative bg-gradient-to-b from-[#1e293b]/40 to-transparent border border-gray-800 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl overflow-hidden group">
                    {/* Ambient Glow */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full group-hover:bg-green-500/20 transition-colors duration-700"></div>
                    
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto max-h-[550px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] z-10 transform group-hover:scale-105 transition-transform duration-1000"
                    />
                    
                    <div className="absolute top-8 right-8 z-20">
                      <HeartIcon product={product} />
                    </div>
                  </div>
                </div>
              </div>

              {/* --- RIGHT: Product Intel --- */}
              <div className="w-full lg:w-1/2 flex flex-col pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[1px] w-8 bg-green-500"></span>
                  <span className="text-green-500 font-black uppercase tracking-[0.5em] text-[10px]">
                    {product.brand} // Authorized Hardware
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-6 mb-8">
                  <Rating value={product.rating} />
                  <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase">
                    {product.numReviews} Verified Logs
                  </span>
                </div>

                <p className="text-gray-400 leading-relaxed mb-10 text-lg font-medium max-w-xl">
                  {product.description}
                </p>

                <div className="text-6xl font-black text-white mb-12 flex items-baseline gap-2 tracking-tighter">
                  <span className="text-2xl text-green-500 font-bold">$</span>
                  {product.price}
                </div>

                {/* --- Hardware Stats Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  <div className={statItemClass}>
                    <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><FaStore /></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest">Origin</span>
                      <span className="text-sm font-bold">{product.brand}</span>
                    </div>
                  </div>
                  <div className={statItemClass}>
                    <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><FaClock /></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest">Release</span>
                      <span className="text-sm font-bold">{moment(product.createdAt).format('MM.YYYY')}</span>
                    </div>
                  </div>
                  <div className={statItemClass}>
                    <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><FaBox /></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest">Available Units</span>
                      <span className="text-sm font-bold">{product.countInStock}</span>
                    </div>
                  </div>
                  <div className={statItemClass}>
                    <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><FaShoppingCart /></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest">Loadout</span>
                      <span className="text-sm font-bold">{product.quantity} Pack</span>
                    </div>
                  </div>
                </div>

                {/* --- Transaction Console --- */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  {product.countInStock > 0 && (
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="bg-[#0f172a] text-white font-black border border-gray-700 p-5 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none sm:min-w-[120px] appearance-none text-center cursor-pointer"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          QTY: {x + 1}
                        </option>
                      ))}
                    </select>
                  )}

                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="flex-grow bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-green-500 transition-all duration-500 shadow-2xl shadow-white/5 active:scale-95 disabled:opacity-20 disabled:grayscale"
                  >
                    {product.countInStock > 0 ? "Initialize Purchase" : "Out of Circuit"}
                  </button>
                </div>
              </div>
            </div>

            {/* --- Technical Tabs Section --- */}
            <div className="mt-32 pt-20 border-t border-gray-900">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;