import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const inputClass = "w-full p-4 bg-[#0f172a] border border-gray-700 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300";
  const labelClass = "block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <ProgressSteps step1 step2 />

      <div className="flex justify-center items-center mt-12">
        <section className="relative w-full max-w-[600px]">
          {/* Decorative Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>

          <div className="relative bg-[#1e293b]/40 backdrop-blur-xl border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
                Shipping Details
              </h1>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">
                Deployment Destination
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label className={labelClass}>Street Address</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="123 Cyber Way"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Neo-Tunis"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Postal Code</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="1000"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Country</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Tunisia"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-gray-800">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">
                  Select Payment Protocol
                </label>
                <div className="flex items-center gap-4 bg-[#0f172a] p-4 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    className="w-5 h-5 accent-green-500 cursor-pointer"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    id="paypal"
                  />
                  <label htmlFor="paypal" className="text-sm font-bold text-gray-300 cursor-pointer flex-1">
                    PayPal or Global Credit Card
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-lg shadow-green-500/20 active:scale-95"
              >
                Continue to Review
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shipping;