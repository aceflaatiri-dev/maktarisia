import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { FaFilter, FaRedoAlt } from "react-icons/fa";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch, categoriesQuery.isLoading]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        return (
          product.price.toString().includes(priceFilter) ||
          product.price === parseInt(priceFilter, 10) ||
          priceFilter === ""
        );
      });

      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, filteredProductsQuery.isLoading]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const resetFilters = () => {
    setPriceFilter("");
    dispatch(setChecked([]));
    // Note: If your radio state is in Redux, dispatch a reset for it here too.
  };

  const SectionHeading = ({ children }) => (
    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-6 flex items-center gap-2">
      <span className="h-px w-4 bg-green-500/30"></span> {children}
    </h2>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10">
      <div className="max-w-[1600px] mx-auto px-4">
        
        {/* --- Mobile Header --- */}
        <div className="md:hidden flex justify-between items-center mb-6 bg-[#1e293b]/30 p-4 rounded-2xl border border-gray-800">
          <span className="font-black uppercase tracking-widest text-xs">Inventory Filters</span>
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="bg-green-500 text-black px-4 py-2 rounded-xl text-xs font-black uppercase"
          >
            {isFilterVisible ? "Close" : <FaFilter />}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* --- SIDEBAR CONSOLE --- */}
          <aside
            className={`${
              isFilterVisible ? "block" : "hidden"
            } md:block md:w-1/4 lg:w-1/5 space-y-8`}
          >
            <div className="sticky top-10 p-8 bg-[#1e293b]/20 border border-gray-800 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
              
              {/* Category Filter */}
              <section className="mb-10">
                <SectionHeading>Categories</SectionHeading>
                <div className="space-y-3">
                  {categories?.map((c) => (
                    <label key={c._id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="w-5 h-5 rounded-lg bg-[#0f172a] border-gray-800 text-green-500 focus:ring-green-500/20 transition-all cursor-pointer"
                      />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors">{c.name}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Brand Filter */}
              <section className="mb-10">
                <SectionHeading>Manufacturer</SectionHeading>
                <div className="space-y-3">
                  {uniqueBrands?.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        id={brand}
                        name="brand"
                        onChange={() => handleBrandClick(brand)}
                        className="w-5 h-5 bg-[#0f172a] border-gray-800 text-green-500 focus:ring-green-500/20 transition-all cursor-pointer"
                      />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Price Filter */}
              <section className="mb-10">
                <SectionHeading>Price Range</SectionHeading>
                <input
                  type="text"
                  placeholder="Min-Max Value"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl text-white font-bold text-sm focus:border-green-500/50 outline-none transition-all placeholder:text-gray-700"
                />
              </section>

              <button
                className="w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-black/20"
                onClick={resetFilters}
              >
                <FaRedoAlt /> Reset Parameters
              </button>
            </div>
          </aside>

          {/* --- PRODUCT GRID --- */}
          <main className="md:w-3/4 lg:w-4/5">
            <header className="flex justify-between items-center mb-10 px-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase">
                Inventory <span className="text-gray-500">[{products?.length}]</span>
              </h2>
              <div className="h-px flex-grow mx-8 bg-gray-800 hidden lg:block"></div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProductsQuery.isLoading ? (
                <div className="col-span-full flex justify-center py-40">
                  <Loader />
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full py-40 text-center border border-dashed border-gray-800 rounded-[3rem]">
                  <p className="text-gray-600 font-black uppercase tracking-widest">No assets match selected parameters</p>
                </div>
              ) : (
                products?.map((p) => (
                  <div key={p._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;