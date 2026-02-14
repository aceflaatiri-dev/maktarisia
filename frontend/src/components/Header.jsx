import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import Message from "./Message";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <Message variant="danger">
          {error?.data?.message || "Failed to load featured products"}
        </Message>
      </div>
    );
  }

  return (
    <header className="w-full flex flex-col items-center">
      {/* --- Featured Carousel Section --- */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <ProductCarousel />
      </div>

      {/* --- Top Rated Products Grid --- */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 mb-10">
        <div className="flex flex-col mb-8">
          <h2 className="text-xs font-black text-green-500 uppercase tracking-[0.4em] mb-2">
            Top Rated
          </h2>
          <div className="w-12 h-1 bg-green-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {data && data.length > 0 ? (
            data.slice(0, 4).map((product) => (
              <div 
                key={product._id} 
                className="animate-in fade-in slide-in-from-bottom-5 duration-700"
              >
                <SmallProduct product={product} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No top products available.</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;