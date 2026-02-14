import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} established in registry.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Deployment failed. Registry rejection.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Update requires a designation.");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Registry updated: ${result.name}`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Protocol error: Update failed.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Purged: ${result.name}`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Decommissioning failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <AdminMenu />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left Panel: Creation */}
          <section className="w-full md:w-1/3 bg-[#1e293b]/20 p-8 rounded-[2rem] border border-gray-800 backdrop-blur-sm">
            <header className="mb-8">
              <h1 className="text-3xl font-black uppercase tracking-tighter">
                Manage <span className="text-gray-500">Classification</span>
              </h1>
              <p className="text-gray-500 text-xs mt-2 font-bold uppercase tracking-widest">
                Define hardware tiers
              </p>
            </header>

            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
            />
          </section>

          {/* Right Panel: Registry View */}
          <section className="w-full md:w-2/3">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-grow bg-gray-800"></div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-green-500">
                Active Categories
              </h2>
              <div className="h-[1px] flex-grow bg-gray-800"></div>
            </div>

            <div className="flex flex-wrap gap-4">
              {categories?.map((category) => (
                <button
                  key={category._id}
                  className="bg-transparent border border-gray-700 text-white py-3 px-6 rounded-2xl font-bold transition-all hover:border-green-500 hover:text-green-500 hover:bg-green-500/5 active:scale-95 shadow-xl"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Edit Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="p-4">
            <h3 className="text-xl font-black uppercase mb-6 text-white tracking-tight">
              Modify <span className="text-green-500">Class</span>
            </h3>
            <CategoryForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateCategory}
              buttonText="Update Registry"
              handleDelete={handleDeleteCategory}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;