import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AdminProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: productData, isLoading, error } = useGetProductByIdQuery(id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || productData.category || "");
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Uplink successful: Image replaced.");
      setImage(res.image);
    } catch (err) {
      toast.error("Image uplink failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        productId: id,
        name, description, price, category, quantity, brand,
        countInStock: stock,
        image,
      };

      const result = await updateProduct(updatedProduct).unwrap();
      toast.success(`Asset "${result.name}" successfully re-configured.`);
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error(err?.data?.message || "Update protocol failed.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Confirm permanent asset deletion?")) return;
    try {
      await deleteProduct(id).unwrap();
      toast.success("Asset purged from registry.");
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Purge failed: Access denied.");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <AdminMenu />
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-5xl mx-auto bg-[#1e293b]/20 border border-gray-800 p-8 rounded-[2.5rem] backdrop-blur-md">
          <header className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">Modify <span className="text-blue-500">Asset</span></h1>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">Protocol: Update/Delete Registry {id.slice(-6)}</p>
            </div>
            <button onClick={handleDelete} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-2 rounded-xl text-xs font-black uppercase transition-all border border-red-500/20">
              Purge Asset
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Media & Description */}
            <div className="space-y-6">
              <div className="relative group aspect-video bg-[#0f172a] rounded-3xl border border-gray-800 overflow-hidden">
                <img src={image} alt={name} className="w-full h-full object-contain p-6" />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all backdrop-blur-sm">
                  <span className="text-xs font-black uppercase tracking-widest">Replace Hardware Image</span>
                  <input type="file" className="hidden" onChange={uploadFileHandler} />
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Technical Description</label>
                <textarea 
                  className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-blue-500 transition-all outline-none min-h-[160px] text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Right: Data Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Hardware Designation</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-blue-500 outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Price (Credits)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-blue-500 outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Quantity</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-blue-500 outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Manufacturer</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-blue-500 outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Stock Level</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-blue-500 outline-none" />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Asset Classification</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#0f172a] border border-gray-800 p-4 rounded-2xl focus:border-blue-500 outline-none">
                  {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                </select>
              </div>

              <button onClick={handleSubmit} className="col-span-2 mt-4 bg-white text-black font-black uppercase tracking-[0.3em] py-5 rounded-2xl hover:bg-blue-500 transition-all active:scale-95 shadow-lg">
                Confirm Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;