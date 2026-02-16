import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { BASE_URL } from "../redux/constants";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart) || {};
  const cartItems = cart.cartItems || [];

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* --- Navigation --- */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors mb-10 font-black text-xs uppercase tracking-[0.3em]"
        >
          <FaArrowLeft /> Continue Acquisition
        </Link>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#1e293b]/10 rounded-[2rem] border border-dashed border-gray-800">
            <div className="p-6 bg-gray-800/50 rounded-full mb-6 text-gray-600">
                <FaShoppingCart size={40} />
            </div>
            <p className="text-xl font-black uppercase tracking-widest text-gray-500 mb-6">Inventory Empty</p>
            <Link to="/shop" className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-500 transition-all">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* --- LEFT: Item List --- */}
            <div className="flex-grow space-y-4">
              <h1 className="text-4xl font-black tracking-tighter mb-8">
                Your <span className="text-green-500">Cart</span>
              </h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-6 p-4 bg-[#1e293b]/20 border border-gray-800 rounded-[2rem] backdrop-blur-sm group hover:border-gray-700 transition-all"
                >
                  <div className="h-24 w-24 bg-[#0f172a] rounded-2xl border border-gray-800 p-2 overflow-hidden flex-shrink-0">
                    <img
                      src={BASE_URL + item.image} // 2. Updated with BASE_URL
                      alt={item.name}
                      className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-white font-black uppercase text-sm tracking-tight hover:text-green-400 transition-colors truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{item.brand}</p>
                    <p className="text-green-500 font-black mt-2">$ {item.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                      className="bg-[#0f172a] text-white border border-gray-800 p-2 px-4 rounded-xl font-bold focus:border-green-500 outline-none appearance-none cursor-pointer"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock || 0).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>

                    <button
                      className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* --- RIGHT: Summary Box --- */}
            <div className="w-full lg:w-[380px]">
              <div className="bg-white text-black p-8 rounded-[2.5rem] shadow-2xl sticky top-10">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Total Units</span>
                    <span className="font-black text-xl">
                      {cartItems.reduce((acc, item) => acc + (item.qty || 0), 0)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Grand Total</span>
                    <span className="text-4xl font-black tracking-tighter">
                      <span className="text-sm align-top mr-1">$</span>
                      {cartItems
                        .reduce(
                          (acc, item) => acc + (item.qty || 0) * (item.price || 0),
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-500 hover:text-black transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>

                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight text-center mt-6">
                  Tax and shipping calculated at checkout
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;