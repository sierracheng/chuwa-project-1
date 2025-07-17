import axios from "axios";
import type { IProduct } from "../models/Product";

/**
 * Get products from database
 * @param page Where page user in right now
 * @param limit How many products need to be displayed per time
 * @param sortOption Sort based on
 */
export async function getAllProductAPI(
  page: number,
  limit: number,
  sortOption?: string
) {
  try {
    let sortQuery = {};
    switch (sortOption) {
      case "priceUp":
        sortQuery = { price: 1 };
        break;
      case "priceDown":
        sortQuery = { price: -1 };
        break;
      case "lastAdded":
      default:
        sortQuery = { _id: -1 };
        break;
    }
    const response = await axios.get(`http://localhost:3003/products`, {
      params: {
        page,
        limit,
        sort: JSON.stringify(sortQuery),
      },
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

export async function findProductAPI(id: string) {
  try {
    const response = await axios.get(`http://localhost:3003/products/${id}`);
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

export async function updateProductAPI(id: string, updateData: IProduct) {
  try {
    const response = await axios.put(
      `http://localhost:3003/products/${id}`,
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

export async function applyCouponAPI(couponCode: string, price: number) {
  try {
    const response = await axios.post("http://localhost:3003/coupon/apply", {
      couponCode,
      price,
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
