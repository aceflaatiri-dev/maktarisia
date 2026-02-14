import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <AdminMenu />

      <div className="container mx-auto px-6 py-12">
        <header className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            Transaction <span className="text-gray-500">Logs</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium tracking-wide">
            Monitoring global asset movement and credit transfers.
          </p>
        </header>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto bg-[#1e293b]/10 border border-gray-800 rounded-[2rem] backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Asset</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">ID</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Identity</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Date</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Amount</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Payment</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Logistics</th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-12 object-contain rounded-lg bg-[#0f172a] border border-gray-800 p-1"
                      />
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                      {order._id.slice(-8)}
                    </td>

                    <td className="px-6 py-4 text-sm font-bold">
                      {order.user ? order.user.username : "DELETED_USER"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-400">
                      {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm font-black text-green-500">
                      ${order.totalPrice}
                    </td>

                    <td className="px-6 py-4">
                      {order.isPaid ? (
                        <span className="px-3 py-1 text-[9px] font-black uppercase tracking-tighter bg-green-500/10 text-green-500 border border-green-500/20 rounded-md">
                          Confirmed
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-[9px] font-black uppercase tracking-tighter bg-red-500/10 text-red-500 border border-red-500/20 rounded-md">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {order.isDelivered ? (
                        <span className="px-3 py-1 text-[9px] font-black uppercase tracking-tighter bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-md">
                          Shipped
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-[9px] font-black uppercase tracking-tighter bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-md">
                          In-Transit
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/order/${order._id}`}
                        className="text-[10px] font-black uppercase tracking-widest text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all"
                      >
                        Details
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

export default OrderList;