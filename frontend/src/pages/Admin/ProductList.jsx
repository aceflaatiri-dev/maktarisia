import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  
  const navigate = useNavigate();
  const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Asset "${data.name}" registered successfully.`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      toast.error("Asset creation failed. Protocol rejection.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image Uplink Established");
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <AdminMenu />
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto bg-[#1e293b]/20 border border-gray-800 p-8 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
          <header className="mb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter">Initialize <span className="text-green-500">Asset</span></h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Registry Input Protocol</p>
          </header>

          {/* 1. Image Upload Section */}
          <div className="mb-8">
            {imageUrl ? (
              <div className="relative group w-full h-64 bg-[#0f172a] rounded-3xl border border-gray-800 overflow-hidden mb-4">
                <img src={imageUrl} alt="preview" className="w-full h-full object-contain p-4 transition-transform group-hover:scale-105" />
                <button onClick={() => setImageUrl(null)} className="absolute top-4 right-4 bg-red-500/20 hover:bg-red-500 p-2 rounded-full transition-colors">✕</button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-800 rounded-3xl cursor-pointer hover:border-green-500/50 hover:bg-green-500/5 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-400 font-bold uppercase tracking-widest">{isUploading ? "Uploading..." : "Upload High-Res Asset"}</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={uploadFileHandler} />
              </label>
            )}
          </div>

          {/* 2. Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Hardware Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Market Price (Credits)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Initial Quantity</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-green-500 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Manufacturer Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-green-500 transition-all outline-none" />
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Technical Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-green-500 transition-all outline-none min-h-[120px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Registry Category</label>
              <select onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-green-500 transition-all outline-none">
                <option value="">Select Tier</option>
                {categories?.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Inventory Stock Level</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-green-500 transition-all outline-none" />
            </div>
          </div>

          <button onClick={handleSubmit} className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-5 rounded-2xl mt-10 hover:bg-green-500 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
            Commit to Registry
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;