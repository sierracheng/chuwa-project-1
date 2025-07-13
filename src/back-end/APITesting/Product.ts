import axios from "axios";
import type { IProduct } from "../models/Product";

export async function getAllProductAPI() {
  try {
    const response = await axios.get("http://localhost:3003/products");
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
