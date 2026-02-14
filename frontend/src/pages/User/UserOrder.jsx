import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { FaEye, FaTerminal } from "react-icons/fa";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const statusBadge = (isTrue) => (
    <div className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
      isTrue 
      ? "bg-green-500/10 text-green-500 border border-green-500/20" 
      : "bg-red-500/10 text-red-500 border border-red-500/20"
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isTrue ? "bg-green-500" : "bg-red-500"}`}></span>
      {isTrue ? "Verified" : "Pending"}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12">
      <div className="container mx-auto px-4">
        
        {/* --- Header --- */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-green-500/10 rounded-2xl border border-green-500/20">
            <FaTerminal className="text-green-500 text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">Order Archives</h2>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mt-1">Registry of all past acquisitions</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : error ? (
          <Message variant="danger">{error?.data?.error || error.error}</Message>
        ) : (
          <div className="overflow-x-auto rounded-[2rem] border border-gray-800/50 bg-[#1e293b]/10 backdrop-blur-md shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Asset</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Deployment ID</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Date</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Total</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Payment</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Logistics</th>
                  <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/50">
                {orders.map((order) => (
                  <tr key={order._id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative h-16 w-16 bg-[#0f172a] rounded-xl border border-gray-800 overflow-hidden p-2 group-hover:border-green-500/50 transition-all">
                        <img
                          src={order.orderItems[0].image}
                          alt="product"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <code className="text-[10px] font-bold text-gray-400 bg-gray-900 px-2 py-1 rounded">
                        #{order._id.substring(0, 8)}...
                      </code>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-300">
                      {order.createdAt.substring(0, 10)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-green-500 font-black text-sm">$ {order.totalPrice}</span>
                    </td>

                    <td className="px-6 py-4">
                      {statusBadge(order.isPaid)}
                    </td>

                    <td className="px-6 py-4">
                      {statusBadge(order.isDelivered)}
                    </td>

                    <td className="px-6 py-4">
                      <Link to={`/order/${order._id}`}>
                        <button className="flex items-center gap-2 bg-white hover:bg-green-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-white/5">
                          <FaEye className="text-sm" />
                          Inspect
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;