import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { data: paypal, isLoading: loadingPaPal, error: errorPayPal } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal?.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid && !window.paypal) {
        loadingPaPalScript();
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order paid successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }],
    }).then((orderID) => orderID);
  }

  function onError(err) { toast.error(err.message); }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order marked as delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader /></div>;
  if (error) return <Message variant="danger">{error.data.message}</Message>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- Left Column: Product Table --- */}
        <div className="lg:w-2/3">
          <div className="bg-[#1e293b]/30 border border-gray-800 rounded-3xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6 border-b border-gray-800 pb-4">
              Order Items
            </h2>
            
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-800">
                      <th className="pb-4 font-black">Product</th>
                      <th className="pb-4 font-black text-center">Qty</th>
                      <th className="pb-4 font-black text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-800/50 group">
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-gray-700" />
                            <Link to={`/product/${item.product}`} className="text-sm font-bold text-gray-300 hover:text-green-400 transition-colors">
                              {item.name}
                            </Link>
                          </div>
                        </td>
                        <td className="py-4 text-center font-bold text-gray-400">{item.qty}</td>
                        <td className="py-4 text-right font-bold text-white">$ {(item.qty * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* --- Right Column: Shipping & Summary --- */}
        <div className="lg:w-1/3 space-y-6">
          
          {/* Shipping & Payment Status */}
          <div className="bg-[#1e293b]/30 border border-gray-800 rounded-3xl p-6 backdrop-blur-md">
            <h2 className="text-sm font-black uppercase tracking-widest text-green-500 mb-4">Logistics</h2>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400">ID: <span className="text-gray-200 font-mono">{order._id}</span></p>
              <p className="text-gray-400">Address: <span className="text-gray-200">{order.shippingAddress.address}, {order.shippingAddress.city}</span></p>
              <p className="text-gray-400">Method: <span className="text-gray-200 uppercase font-bold text-xs">{order.paymentMethod}</span></p>
            </div>
            <div className="mt-6">
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt.substring(0, 10)}</Message>
              ) : (
                <Message variant="danger">Pending Payment</Message>
              )}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-green-500 text-black rounded-3xl p-6 shadow-lg shadow-green-500/10">
            <h2 className="text-sm font-black uppercase tracking-widest mb-4">Financial Summary</h2>
            <div className="space-y-2 border-b border-black/10 pb-4 mb-4 font-bold">
              <div className="flex justify-between"><span>Subtotal</span><span>${order.itemsPrice}</span></div>
              <div className="flex justify-between text-black/60 font-medium"><span>Shipping</span><span>${order.shippingPrice}</span></div>
              <div className="flex justify-between text-black/60 font-medium"><span>Tax</span><span>${order.taxPrice}</span></div>
            </div>
            <div className="flex justify-between text-xl font-black uppercase tracking-tighter">
              <span>Total</span><span>${order.totalPrice}</span>
            </div>
          </div>

          {/* Action Buttons (PayPal / Deliver) */}
          <div className="pt-4">
            {!order.isPaid && (
              <div className="w-full">
                {isPending ? <Loader /> : (
                  <div className="rounded-2xl overflow-hidden border border-gray-800 p-4 bg-white">
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
                  </div>
                )}
              </div>
            )}

            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <button
                onClick={deliverHandler}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Mark As Dispatched
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Order;