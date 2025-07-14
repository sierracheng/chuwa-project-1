import axios from "axios";
import type { IProduct } from "../models/Product";

/**
 * Get products from database
 * @param page Where page user in right now
 * @param limit How many products need to be displayed per time
 */
export async function getAllProductAPI(page: number, limit: number) {
  try {
    const response = await axios.get(
      `http://localhost:3003/products?page=${page}&limit=${limit}`
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function findProductAPI(name: string) {
  try {
    const response = await axios.get(`http://localhost:3003/products/${name}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function createProductAPI(
  name: string,
  description: string,
  category: "Electronics" | "Clothing" | "Books" | "Home" | "Others",
  price: number,
  stock: number,
  imageUrl?: string
) {
  try {
    const response = await axios.post("http://localhost:3003/products", {
      name: name.trim(),
      description,
      category,
      price,
      stock,
      imageUrl: imageUrl ? imageUrl.trim() : undefined,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function updateProductAPI(name: string, updateData: IProduct) {
  try {
    const response = await axios.put(
      `http://localhost:3003/products/${name}`,
      updateData
    );
    return {
      success: true,
      product: response.data.product,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
