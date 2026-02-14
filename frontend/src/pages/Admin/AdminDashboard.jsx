import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import Loader from "../../components/Loader";
import AdminMenu from "./AdminMenu";

const AdminDashboard = () => {
  // Data Fetching
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingUsers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail, isLoading: loadingCharts } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
        background: "transparent",
        fontFamily: "Inter, sans-serif",
      },
      theme: { mode: "dark" },
      tooltip: { 
        theme: "dark",
        style: { fontSize: '12px', fontFamily: 'inherit' }
      },
      colors: ["#22c55e"], 
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      grid: {
        show: true,
        borderColor: "#1e293b",
        strokeDashArray: 5,
        position: 'back',
      },
      xaxis: {
        categories: [],
        labels: { style: { colors: "#64748b", fontWeight: 700 } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { 
            style: { colors: "#64748b", fontWeight: 700 },
            formatter: (val) => `$${val.toFixed(0)}`,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 90, 100],
          colorStops: [
            { offset: 0, color: "#22c55e", opacity: 0.4 },
            { offset: 100, color: "#3b82f6", opacity: 0.1 },
          ]
        },
      },
    },
    series: [{ name: "Revenue", data: [] }],
  });

  useEffect(() => {
    if (salesDetail && Array.isArray(salesDetail)) {
      const dates = salesDetail.map((item) => item._id);
      const amounts = salesDetail.map((item) => item.totalSales);

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: dates,
          },
        },
        series: [{ name: "Revenue", data: amounts }],
      }));
    }
  }, [salesDetail]);

  const StatCard = ({ title, value, label, colorClass, icon, isLoading }) => (
    <div className="relative group overflow-hidden bg-[#1e293b]/20 border border-gray-800 p-8 rounded-[2rem] w-full md:w-[calc(33.33%-1.5rem)] transition-all hover:border-green-500/50 hover:bg-[#1e293b]/40">
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -z-10 opacity-20 ${colorClass}`}></div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{label}</p>
        <div className="text-xl font-bold text-white bg-white/5 p-3 rounded-xl border border-white/10">{icon}</div>
      </div>
      <h1 className="text-4xl font-black tracking-tighter">
        {isLoading ? <div className="h-10 w-24 bg-gray-800 animate-pulse rounded-lg" /> : value}
      </h1>
      <p className="text-gray-600 text-xs mt-2 font-bold uppercase tracking-widest">{title}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <AdminMenu />

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-12 bg-green-500"></div>
            <p className="text-green-500 text-xs font-black uppercase tracking-widest">System Operational</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">
            Terminal <span className="text-gray-700">Overview</span>
          </h1>
          <p className="text-gray-500 font-medium mt-2 max-w-lg">
            Encrypted analytics uplink established. Monitoring real-time market movements and asset registry.
          </p>
        </header>

        {/* --- STATS SECTION --- */}
        <section className="flex flex-wrap gap-6 mb-16">
          <StatCard 
            label="Total Revenue" 
            // Safety: Fallback to 0 if data isn't loaded yet
            value={`$${(sales?.totalSales || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            title="Net Credits"
            colorClass="bg-green-500"
            icon="₿"
            isLoading={loadingSales}
          />
          <StatCard 
            label="Active Users" 
            value={customers?.length || 0} 
            title="Digital Identities"
            colorClass="bg-blue-500"
            icon="👤"
            isLoading={loadingUsers}
          />
          <StatCard 
            label="Total Orders" 
            value={orders?.totalOrders || 0} 
            title="Transactions"
            colorClass="bg-purple-500"
            icon="📦"
            isLoading={loadingOrders}
          />
        </section>

        {/* --- CHART SECTION --- */}
        <section className="bg-[#1e293b]/10 border border-gray-800 p-8 rounded-[3rem] backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-green-500 mb-1">Revenue Stream Analysis</h2>
                <p className="text-gray-500 text-xs">Temporal distribution of incoming transaction volume.</p>
            </div>
            <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Live Uplink Active</span>
            </div>
          </div>

          <div className="min-h-[400px] w-full">
            {loadingCharts ? (
               <div className="w-full h-[400px] flex items-center justify-center text-gray-600 font-black uppercase tracking-[0.5em] animate-pulse">
                  Syncing Data...
               </div>
            ) : (
              <Chart
                options={state.options}
                series={state.series}
                type="area"
                width="100%"
                height={400}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;