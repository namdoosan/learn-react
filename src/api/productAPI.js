import { BASE_URL } from "./baseURL.js";
import axios from "axios";

export const fetchProducts = async (limit = 10, skip = 0) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    );

    console.log(res, "isi response");

    // if (res.data.data.length === 0) {
    //   return { products: [], total: 0 }; // Return empty array if no products found
    // }

    return res.data;
  } catch (err) {
    console.error("Error fetching product list:", err);
    return { products: [], total: 0 };
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error get product by id:", err);
    throw err;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/${id}`, data);
    return response.data;
  } catch (err) {
    console.error("Error updating product:", err);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting product:", err);
    return null;
  }
};

export const searchProducts = async (query, limit = 10, skip = 0) => {
  try {
    const res = await axios.get(`${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
    return res.data;
  } catch (err) {
    console.error("Error searching products:", err);
    return { products: [], total: 0 };
  }
};