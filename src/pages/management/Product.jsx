// src/pages/ProductPage/ProductPage.jsx

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ProductCard from "@/components/ProductCard/ProductCard";
import Dropdown from "@/components/Dropdown/Dropdown";
import ActionButton from "@/components/ActionButton/ActionButton";
import deleteIcon from "@/assets/delete.png";
import editIcon from "@/assets/edit.png";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import SuccessPopup from "@/components/Popup/SuccessPopup";
import { fetchProducts, searchProducts } from "@/api/productAPI";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    try {
      // Dummy delete request to dummyjson.com (will not actually delete on server)
      await fetch(`https://dummyjson.com/products/${deleteId}`, { method: "DELETE" });

      setSuccessMessage("Product deleted successfully with love!");
      setShowSuccessPopup(true);
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Oops! Failed to delete product. Try again!");
    } finally {
      setShowConfirm(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    setSuccessMessage("");
  };

  useEffect(() => {
  const loadProducts = async () => {
    const skip = (page - 1) * limit;
    let result;

    if (search.trim() !== "") {
      result = await searchProducts(search, limit, skip);
    } else {
      result = await fetchProducts(limit, skip);
    }

    setProducts(result.products);
    setTotal(result.total);
  };

  const updatedProduct = location.state?.updatedProduct;
  const successFromState = location.state?.success;

  if (successFromState && updatedProduct) {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setSuccessMessage("Product updated with a sweet touch!");
    setShowSuccessPopup(true);
    window.history.replaceState({}, document.title, window.location.pathname);
  } else {
    loadProducts();
  }
}, [limit, page, location.state, search]);


  const totalPages = Math.ceil(total / limit);

  const filteredProducts = [...products].sort((a, b) => {
    if (sortBy === "asc") return a.price - b.price;
    if (sortBy === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="h-[calc(100vh-120px)] px- py-0 overflow-y-auto">
      {/* Header & Filter Section */}
      <div className="bg-pink-100/70 backdrop-blur-md px-6 py-4 rounded-b-3xl shadow-xl shadow-pink-200/50 sticky top-0 z-10 border-b border-pink-200">
        {/* Mengubah layout agar search dan dropdown tetap di tengah/kanan tanpa tombol add */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search for sweet products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Resets the page to 1 on search
          }}
          className="w-full md:w-auto flex-grow px-4 py-2 border-2 border-pink-300 rounded-xl text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all duration-200 bg-pink-50/70 shadow-inner"
        />
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            <Dropdown
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              options={[
                { label: "Sort by Price", value: "" },
                { label: "Price: Low to High", value: "asc" },
                { label: "Price: High to Low", value: "desc" },
              ]}
              className="px-4 py-2 border-2 border-pink-300 rounded-xl text-pink-800 bg-pink-50/70 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all duration-200 cursor-pointer"
            />
            {/* Tombol Add Product DIHAPUS */}
          </div>
        </div>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mt-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="relative group">
            <ProductCard product={p} />
            <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ActionButton
                    icon={editIcon}
                    alt="Edit"
                    title="Edit Produk"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/management/product/${p.id}`);
                    }}
                    className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-lg"
                />
                <ActionButton
                    icon={deleteIcon}
                    alt="Delete"
                    title="Hapus Produk"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(p.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 p-3 rounded-full shadow-lg"
                />
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-pink-500 text-lg mt-8">No sweet products found. Add some love!</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 p-6 bg-pink-50/50 rounded-xl shadow-inner border border-pink-100">
        {/* Dropdown Limit */}
        <div>
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="px-4 py-2 border-2 border-pink-300 rounded-xl text-pink-800 bg-pink-50/70 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all duration-200 cursor-pointer"
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
          </select>
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            &laquo;
          </button>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            &lsaquo;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((num) => {
              const isFirstOrLast = num === 1 || num === totalPages;
              const isNearCurrent = num >= page - 1 && num <= page + 1;
              return isFirstOrLast || isNearCurrent;
            })
            .map((num, idx, arr) => {
              const prevNum = arr[idx - 1];
              const isGap = prevNum && num - prevNum > 1;

              return (
                <span key={num} className="flex items-center gap-1">
                  {isGap && <span className="px-2 text-pink-500">...</span>}
                  <button
                    onClick={() => setPage(num)}
                    className={`px-4 py-1.5 rounded-full font-semibold border-2 border-pink-300
                      ${
                        page === num
                          ? "bg-pink-500 text-white shadow-md shadow-pink-300/50"
                          : "text-pink-700 hover:bg-pink-100"
                      } transition-all duration-200`}
                  >
                    {num}
                  </button>
                </span>
              );
            })}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            &rsaquo;
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            &raquo;
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Are you sure you want to delete this lovely product?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />

      {/* Popup Sukses */}
      {showSuccessPopup && (
        <SuccessPopup message={successMessage} onClose={handleCloseSuccessPopup} />
      )}
    </div>
  );
}