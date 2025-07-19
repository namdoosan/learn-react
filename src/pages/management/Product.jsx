import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

import ProductCard from "@/components/ProductCard/ProductCard";
import Dropdown from "@/components/Dropdown/Dropdown";
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
  const [isLoadingProducts, setIsLoadingProducts] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    try {
      await fetch(`https://dummyjson.com/products/${deleteId}`, {
        method: "DELETE",
      });

      setSuccessMessage("Product deleted successfully!");
      setShowSuccessPopup(true);
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Error: Failed to delete product. Please try again.");
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
      setIsLoadingProducts(true); // Start loading
      const skip = (page - 1) * limit;
      let result;

      try {
        if (search.trim() !== "") {
          result = await searchProducts(search, limit, skip);
        } else {
          result = await fetchProducts(limit, skip);
        }

        setProducts(result.products);
        setTotal(result.total);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoadingProducts(false); 
      }
    };

    const updatedProduct = location.state?.updatedProduct;
    const successFromState = location.state?.success;

    if (successFromState && updatedProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setSuccessMessage("Product updated successfully!");
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
    <div className="h-[calc(100vh-120px)] px-0 py-0 overflow-y-auto font-sans">
      <div className="bg-white/100 backdrop-blur-md px-6 py-4 rounded-b-xl
                      shadow-lg shadow-gray-200/50 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-auto flex-grow">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Resets the page to 1 on search
              }}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg
                         text-gray-800 placeholder-gray-400 focus:outline-none
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                         transition-all duration-200 bg-gray-50 shadow-inner"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            <Dropdown
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              options={[
                { label: "Sort by Price", value: "" },
                { label: "Price: Low to High", value: "asc" },
                { label: "Price: High to Low", value: "desc" },
              ]}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-800
                         bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400
                         focus:border-blue-500 transition-all duration-200 cursor-pointer"
            />
          </div>
        </div>
      </div>

  
      {isLoadingProducts ? (
        <div className="flex justify-center items-center h-[calc(100vh-250px)] text-gray-600">
          <svg className="animate-spin h-8 w-8 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mt-4">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={() => navigate(`/management/product/${p.id}`)}
              onDelete={() => confirmDelete(p.id)}
              onViewDetails={() => navigate(`/management/product/${p.id}`)} // New prop for card click
            />
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500 text-lg mt-8">
              No products found. Try a different search or filter.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 p-6
                      bg-white/95 rounded-xl shadow-inner border border-gray-100">
        
        <div>
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-800
                       bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400
                       focus:border-blue-500 transition-all duration-200 cursor-pointer"
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
            className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700
                       hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            &laquo;
          </button>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700
                       hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
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
                  {isGap && <span className="px-2 text-gray-500">...</span>}
                  <button
                    onClick={() => setPage(num)}
                    className={`px-4 py-1.5 rounded-md font-semibold border-2 border-gray-300
                      ${
                        page === num
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/50"
                          : "text-gray-700 hover:bg-blue-100"
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
            className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700
                       hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            &rsaquo;
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700
                       hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            &raquo;
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />


      {showSuccessPopup && (
        <SuccessPopup
          message={successMessage}
          onClose={handleCloseSuccessPopup}
        />
      )}
    </div>
  );
}