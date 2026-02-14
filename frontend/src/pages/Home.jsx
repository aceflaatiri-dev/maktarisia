import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-green-500 selection:text-black">
      {/* --- Aesthetic Background Elements --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <div className="relative z-10">
        {/* 1. Hero / Header Section */}
        {!keyword && (
          <header className="pt-6">
            <Header />
          </header>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-96 gap-4">
              <Loader />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 animate-pulse">
                Initializing Inventory...
              </p>
            </div>
          ) : isError ? (
            <div className="py-20">
              <Message variant="danger">
                {error?.data?.message || error?.message || "System error: Link failed"}
              </Message>
            </div>
          ) : (
            <section>
              {/* 2. Section Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-green-500"></span>
                    <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.4em]">Featured</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                    Elite <span className="text-gray-500">Gear</span>
                  </h1>
                  <p className="text-gray-500 font-medium text-sm md:text-base max-w-md">
                    High-performance components engineered for the next generation of digital architects.
                  </p>
                </div>

                <Link
                  to="/shop"
                  className="group relative inline-flex items-center justify-center px-12 py-4 font-black text-black transition-all duration-300 bg-white rounded-2xl hover:bg-green-500 active:scale-95"
                >
                  <span className="relative uppercase text-xs tracking-widest">Access Full Catalog</span>
                </Link>
              </div>

              {/* 3. Grid with Staggered Entrance Effect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {data?.products?.length > 0 ? (
                  data.products.map((product, index) => (
                    <div 
                      key={product._id} 
                      className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Product product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-32 border border-dashed border-gray-800 rounded-[3rem] text-center">
                    <p className="text-gray-600 font-black uppercase tracking-widest">No assets found in current registry.</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;  