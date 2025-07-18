import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { fetchProductById, updateProduct } from "@/api/productAPI";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import SuccessPopup from "@/components/Popup/SuccessPopup";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      if (data) {
        setProduct(data);
        setValue("title", data.title);
        setValue("sku", data.sku); // simulasi SKU
        setValue("description", data.description);
        setValue("category", data.category);
        setValue("price", data.price);
        setValue("brand", data.brand);
      }
    };
    loadProduct();
  }, [id, setValue]);

  const onSubmit = () => {
    setShowConfirm(true);
  };

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
      setProduct(prev => ({ ...prev, ...updated }));
      setShowSuccess(true);
    } catch (error) {
      console.error("Update gagal:", error);
    }
  };

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Product Detail</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={product?.images?.[0]}
            alt={product.title}
            className="rounded-lg w-full h-64 object-cover"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:w-1/2">
          <Controller
            name="sku"
            control={control}
            render={({ field }) => <Input label="SKU" {...field} disabled />}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input label="Title" {...field} />}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input label="Description" multiline {...field} />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => <Input label="Category" {...field} />}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input label="Price" type="number" {...field} />
            )}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => <Input label="Brand" {...field} />}
          />

          <div className="flex justify-between mt-6">
            <Button type="button" onClick={() => navigate(-1)}>
              Kembali
            </Button>
            <Button type="submit" variant="primary">
              Submit Changes
            </Button>
          </div>
        </form>
      </div>

      {showConfirm && (
        <ConfirmModal
          isOpen={showConfirm}
          title="Are you sure you want to update this product?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
        />
      )}

      {showSuccess && (
        <SuccessPopup
          message="Product updated successfully!"
          onClose={() => {
            setShowSuccess(false);
            navigate("/manage-product", {
              state: {
                success: true,
                updatedProduct: product,
              },
            });
          }}
        />
      )}
    </div>
  );
}
