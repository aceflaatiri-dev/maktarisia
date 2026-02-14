import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-black uppercase tracking-widest">
        Critical Error: Failed to retrieve asset registry
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <AdminMenu />
      
      <div className="container mx-auto px-6 py-12">
        <header className="mb-10 flex justify-between items-end border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">
              Asset <span className="text-gray-500">Registry</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium tracking-wide">
              Managing {products?.length} unique hardware units.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {products?.map((product) => (
            <div
              key={product._id}
              className="group relative bg-[#1e293b]/20 border border-gray-800 rounded-[2rem] overflow-hidden hover:border-green-500/40 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row p-4 gap-6 items-center">
                {/* Image Section */}
                <div className="relative w-full md:w-64 h-48 bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-800 shadow-inner">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-green-500 uppercase">
                    ID: {product._id.slice(-6)}
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-grow flex flex-col justify-between h-full py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-green-500 transition-colors uppercase tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                        Registered: {moment(product.createdAt).format("MMM Do, YYYY")}
                      </p>
                    </div>
                    <div className="text-2xl font-black text-green-400 bg-green-500/5 px-4 py-2 rounded-xl border border-green-500/20">
                      ${product.price}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mt-4 leading-relaxed line-clamp-2 max-w-2xl">
                    {product.description}
                  </p>

                  <div className="flex gap-4 mt-6">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-green-500 transition-all shadow-lg active:scale-95"
                    >
                      Modify Data
                    </Link>
                    <Link
                      to={`/product/${product._id}`}
                      className="px-6 py-3 bg-[#0f172a] border border-gray-700 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:border-white hover:text-white transition-all"
                    >
                      Public View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;