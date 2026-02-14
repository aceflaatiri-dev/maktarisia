import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review synchronized successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to neural link (Cart)");
  };

  const iconStyles = "mr-3 text-green-500 text-lg";
  const labelStyles = "flex items-center text-gray-400 text-sm font-medium py-2 border-b border-gray-800/50";

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <Link 
        to="/" 
        className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-500 hover:text-green-500 transition-colors mb-10 group"
      >
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
        Return to Matrix
      </Link>

      {isLoading ? (
        <div className="flex justify-center items-center h-96"><Loader /></div>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT: Asset Display --- */}
          <div className="lg:col-span-7 relative group">
            <div className="bg-[#1e293b]/20 backdrop-blur-xl border border-gray-800 rounded-[3rem] p-8 md:p-16 flex justify-center items-center relative overflow-hidden">
              {/* Aesthetic Radial Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent opacity-50"></div>
              
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-h-[500px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 transform group-hover:scale-105 transition-transform duration-700" 
              />
              
              <div className="absolute top-8 right-8 z-20">
                <HeartIcon product={product} />
              </div>
            </div>
          </div>

          {/* --- RIGHT: Tech Specs & Controls --- */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
                {product.brand} // Hardware Unit
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-4">
                {product.name}
              </h1>
              <Ratings value={product.rating} text={`${product.numReviews} Database Entries`} />
            </div>

            <p className="text-gray-400 leading-relaxed mb-8 text-lg font-medium">
              {product.description}
            </p>

            <div className="text-5xl font-black text-white tracking-tighter mb-10">
              ${product.price}
            </div>

            {/* --- Data Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-10">
              <p className={labelStyles}><FaStore className={iconStyles} /> Brand: <span className="text-white ml-2">{product.brand}</span></p>
              <p className={labelStyles}><FaClock className={iconStyles} /> Logged: <span className="text-white ml-2">{moment(product.createdAt).fromNow()}</span></p>
              <p className={labelStyles}><FaBox className={iconStyles} /> Inventory: <span className="text-white ml-2">{product.countInStock} Units</span></p>
              <p className={labelStyles}><FaShoppingCart className={iconStyles} /> Capacity: <span className="text-white ml-2">{product.quantity}</span></p>
            </div>

            {/* --- Action Cluster --- */}
            <div className="flex flex-col sm:flex-row gap-4">
              {product.countInStock > 0 && (
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-[#0f172a] border border-gray-700 text-white p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-32 font-bold"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>QTY: {x + 1}</option>
                  ))}
                </select>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="flex-grow bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest py-4 px-8 rounded-2xl transition-all shadow-lg shadow-green-500/20 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {product.countInStock > 0 ? "Initialize Acquisition" : "Out of Stock"}
              </button>
            </div>
          </div>

          {/* --- TABS: Reviews & Discussion --- */}
          <div className="lg:col-span-12 mt-16 border-t border-gray-800 pt-16">
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
        </div>
      )}
    </div>
  );
};

export default ProductDetails;