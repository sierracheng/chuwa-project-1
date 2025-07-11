import axios from "axios";
import type { IProduct } from "../models/Product";

export async function findProductAPI() {}

export async function createProductAPI() {}

export async function updateProductAPI(name: string, updateData: IProduct) {
  try {
    const response = await axios.put(
      `http://localhost:3003/products/${name}`,
      updateData
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
