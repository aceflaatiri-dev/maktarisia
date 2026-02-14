import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) return <div className="flex justify-center py-10"><Loader /></div>;

  const handleTabClick = (tabNumber) => setActiveTab(tabNumber);

  const TabButton = ({ number, label }) => (
    <button
      className={`relative py-5 px-8 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
        activeTab === number ? "text-green-500" : "text-gray-500 hover:text-gray-300"
      }`}
      onClick={() => handleTabClick(number)}
    >
      {label}
      {activeTab === number && (
        <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-in fade-in zoom-in duration-300" />
      )}
    </button>
  );

  return (
    <div className="w-full">
      {/* --- Tab Navigation --- */}
      <nav className="flex flex-wrap border-b border-gray-800/50 mb-12 overflow-x-auto no-scrollbar">
        <TabButton number={1} label="Log Review" />
        <TabButton number={2} label={`Archive (${product.reviews.length})`} />
        <TabButton number={3} label="Related Units" />
      </nav>

      {/* --- Content Area --- */}
      <div className="min-h-[400px]">
        {/* --- TAB 1: SUBMIT REVIEW --- */}
        {activeTab === 1 && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-700 max-w-3xl">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-8 bg-[#1e293b]/10 p-8 rounded-[2rem] border border-gray-800/50 backdrop-blur-md">
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-black text-xl tracking-tighter uppercase">Submit User Data</h3>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-4">Your feedback improves our neural network</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Calibration (Rating)</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl text-white font-bold focus:border-green-500/50 outline-none transition-all appearance-none"
                    >
                      <option value="0">Select Calibration...</option>
                      <option value="1">01 - Critical Failure</option>
                      <option value="2">02 - Operational</option>
                      <option value="3">03 - Optimized</option>
                      <option value="4">04 - Exceptional</option>
                      <option value="5">05 - Perfection</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Input Logs (Comment)</label>
                  <textarea
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#0f172a] border border-gray-800 p-5 rounded-2xl text-white font-medium focus:border-green-500/50 outline-none transition-all placeholder:text-gray-700"
                    placeholder="Provide technical feedback or personal experience..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-[0.2em] py-4 px-12 rounded-2xl transition-all shadow-xl shadow-green-500/10 active:scale-95 disabled:opacity-30"
                >
                  {loadingProductReview ? "Processing..." : "Commit Review"}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 bg-[#1e293b]/10 rounded-[2rem] border border-dashed border-gray-800">
                <p className="text-gray-500 font-bold uppercase tracking-widest mb-6">Access Restricted</p>
                <Link to="/login" className="bg-white text-black px-10 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-green-500 transition-colors">
                  Authorize Account
                </Link>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 2: REVIEW LIST --- */}
        {activeTab === 2 && (
          <div className="animate-in fade-in duration-700 space-y-6">
            {product.reviews.length === 0 ? (
              <div className="py-20 text-center border border-gray-800 rounded-[2rem]">
                <p className="text-gray-600 font-bold uppercase tracking-widest">No logs found for this unit.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.reviews.map((review) => (
                  <div key={review._id} className="bg-[#1e293b]/20 border border-gray-800/60 p-8 rounded-[2rem] group hover:border-green-500/30 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/5 font-black text-green-500">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-white font-black text-sm uppercase tracking-wider">{review.name}</h4>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{moment(review.createdAt).fromNow()}</p>
                        </div>
                      </div>
                      <Ratings value={review.rating} />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: RECOMMENDATIONS --- */}
        {activeTab === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.map((p) => (
                <div key={p._id} className="hover:-translate-y-2 transition-transform duration-500">
                  <SmallProduct product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;