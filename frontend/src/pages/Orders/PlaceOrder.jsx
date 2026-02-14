import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || "Order creation failed");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <ProgressSteps step1 step2 step3 />

      <div className="flex flex-col lg:flex-row gap-8 mt-12">
        {/* --- Left Column: Item Table --- */}
        <div className="lg:w-2/3">
          <div className="bg-[#1e293b]/30 border border-gray-800 rounded-3xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Review Cart</h2>
            
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-800">
                      <th className="pb-4">Product</th>
                      <th className="pb-4 text-center">Qty</th>
                      <th className="pb-4 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.cartItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-800/40 group transition-colors hover:bg-white/5">
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-gray-700" />
                            <Link to={`/product/${item.product}`} className="text-sm font-bold text-gray-300 hover:text-green-400">
                              {item.name}
                            </Link>
                          </div>
                        </td>
                        <td className="py-4 text-center text-gray-400 font-bold">{item.qty}</td>
                        <td className="py-4 text-right text-white font-bold">${(item.qty * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* --- Right Column: Summary & Final Action --- */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-[#1e293b]/50 border border-gray-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Aesthetic Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 blur-3xl rounded-full"></div>

            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-green-500 mb-6">Final Summary</h2>
            
            <div className="space-y-4 text-sm font-bold">
              <div className="flex justify-between text-gray-400"><span>Items Price</span><span>${cart.itemsPrice}</span></div>
              <div className="flex justify-between text-gray-400"><span>Shipping</span><span>${cart.shippingPrice}</span></div>
              <div className="flex justify-between text-gray-400"><span>Tax</span><span>${cart.taxPrice}</span></div>
              <div className="pt-4 border-t border-gray-800 flex justify-between text-2xl font-black text-white tracking-tighter">
                <span>TOTAL</span><span>${cart.totalPrice}</span>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Shipping To</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}<br/>
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
              </div>

              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Payment Method</h3>
                <p className="text-xs font-black text-green-400 uppercase tracking-widest">{cart.paymentMethod}</p>
              </div>
            </div>

            {error && <div className="mt-4"><Message variant="danger">{error.data?.message || "Error"}</Message></div>}

            <button
              disabled={cart.cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
              className="w-full mt-8 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-lg shadow-green-500/20 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? <div className="scale-50"><Loader /></div> : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;