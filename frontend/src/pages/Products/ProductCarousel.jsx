import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div className="absolute bottom-10">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-1 bg-gray-700 rounded-full transition-all duration-300 hover:bg-green-500 [.slick-active_&]:bg-green-500 [.slick-active_&]:w-8"></div>
    ),
  };

  if (isLoading) return <div className="h-[30rem] w-full bg-[#1e293b]/50 animate-pulse rounded-[3rem] border border-gray-800" />;

  if (error) return (
    <Message variant="danger">
      {error?.data?.message || error.error}
    </Message>
  );

  return (
    <div className="w-full relative px-2">
      <Slider {...settings} className="w-full group">
        {products.map(({ image, _id, name, price, description }) => (
          <div key={_id} className="outline-none py-4 px-2">
            <div className="relative flex flex-col md:flex-row items-center bg-[#1e293b]/20 backdrop-blur-xl border border-gray-800 rounded-[3rem] overflow-hidden min-h-[35rem] md:h-[40rem] transition-all duration-500 group-hover:border-green-500/30">
              
              {/* --- Background Ambient Glow --- */}
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-[120px] rounded-full"></div>

              {/* --- Product Image Sector --- */}
              <div className="w-full md:w-1/2 h-full flex justify-center items-center p-12 relative z-10">
                <Link to={`/product/${_id}`} className="w-full h-full flex justify-center perspective-1000">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full max-h-[350px] object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)] transform transition-all duration-1000 group-hover:scale-110 group-hover:rotate-3"
                  />
                </Link>
              </div>

              {/* --- Content Sector --- */}
              <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[2px] bg-green-500"></span>
                  <h2 className="text-green-500 text-[10px] uppercase tracking-[0.5em] font-black">
                    Premium Gear
                  </h2>
                </div>

                <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                  {name}
                </h1>
                
                <p className="text-gray-400 text-sm md:text-lg mb-8 line-clamp-3 max-w-md font-medium leading-relaxed">
                  {description}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Price Unit</span>
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                      ${price}
                    </span>
                  </div>

                  <Link
                    to={`/product/${_id}`}
                    className="group/btn relative overflow-hidden bg-white text-black font-black px-10 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
                  >
                    <span className="relative z-10 uppercase text-xs tracking-widest">Explore Specs</span>
                    <div className="absolute inset-0 bg-green-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;