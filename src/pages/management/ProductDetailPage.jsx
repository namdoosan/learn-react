import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { fetchProductById, updateProduct } from "@/api/productAPI";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { MdArrowBack } from "react-icons/md";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      setMainImageLoaded(false);
      try {
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
          setValue("title", data.title);
          setValue("sku", data.sku || "N/A");
          setValue("description", data.description);
          setValue("category", data.category);
          setValue("price", data.price);
          setValue("brand", data.brand);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to load product details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id, setValue]);

  const onSubmit = () => setShowConfirm(true);

  const handleConfirm = async () => {
    setShowConfirm(false);
    const formData = {
      title: control._formValues.title,
      description: control._formValues.description,
      category: control._formValues.category,
      price: Number(control._formValues.price),
      brand: control._formValues.brand,
    };
    try {
      const updated = await updateProduct(id, formData);
      setProduct((prev) => ({ ...prev, ...updated, ...formData }));
      navigate("/manage-product", {
        state: {
          success: true,
          updatedProduct: { ...product, ...formData },
        },
      });
    } catch (error) {
      alert("Failed to update product. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)] bg-gray-50">
        <div className="text-gray-600 text-lg flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading product details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)] bg-red-50 text-red-700 text-lg">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)] bg-gray-50 text-gray-500 text-lg">
        Product data is not available.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-120px)] font-sans overflow-y-auto">
      <div className="bg-white rounded-xl shadow-md p-5 mb-6 flex items-center justify-between border border-gray-100">
        <h2 className="text-3xl font-extrabold text-blue-800">Product Details</h2>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-200">
          <MdArrowBack className="text-xl" /> Back to Products
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-inner border border-gray-200">
          <div className="relative w-full max-w-md h-64 sm:h-80 lg:h-[400px] rounded-lg overflow-hidden">
            {!mainImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-lg">
                <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16.5V7a2 2 0 012-2h12a2 2 0 012 2v9.5a.5.5 0 01-.5.5H4.5a.5.5 0 01-.5-.5zM12 9a3 3 0 100 6 3 3 0 000-6zM8 12a1 1 0 11-2 0 1 1 0 012 0zM18 12a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
            )}
            <img
              src={product?.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
              alt={product.title}
              className={`w-full h-full object-contain rounded-lg border-2 border-blue-200 shadow-md transition-opacity duration-500 ${mainImageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setMainImageLoaded(true)}
              loading="lazy"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto p-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-colors"
                  onClick={() => {}}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:w-1/2 p-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">Edit Product Information</h3>

          <Controller name="sku" control={control} render={({ field }) => <Input label="SKU" {...field} disabled className="bg-gray-100 cursor-not-allowed" />} />
          <Controller name="title" control={control} rules={{ required: "Title is required" }} render={({ field, fieldState: { error } }) => <Input label="Title" {...field} error={error?.message} />} />
          <Controller name="description" control={control} rules={{ required: "Description is required" }} render={({ field, fieldState: { error } }) => <Input label="Description" multiline rows={4} {...field} error={error?.message} />} />
          <Controller name="category" control={control} rules={{ required: "Category is required" }} render={({ field, fieldState: { error } }) => <Input label="Category" {...field} error={error?.message} />} />
          <Controller name="price" control={control} rules={{ required: "Price is required", min: { value: 0, message: "Price cannot be negative" } }} render={({ field, fieldState: { error } }) => <Input label="Price" type="number" step="0.01" {...field} error={error?.message} />} />
          <Controller name="brand" control={control} rules={{ required: "Brand is required" }} render={({ field, fieldState: { error } }) => <Input label="Brand" {...field} error={error?.message} />} />

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <Button type="button" onClick={() => navigate(-1)} variant="secondary" className="min-w-[120px]">Cancel</Button>
            <Button type="submit" variant="primary" className="min-w-[120px]">Save Changes</Button>
          </div>
        </form>
      </div>

      {showConfirm && (
        <ConfirmModal
          isOpen={showConfirm}
          title="Confirm Product Update"
          message="Are you sure you want to save these changes to the product details?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
          confirmButtonText="Save Changes"
          cancelButtonText="Keep Editing"
        />
      )}
    </div>
  );
}
