import Product from "../models/Product";
import { type Request, type Response } from "express";
import { reportError } from "./utils";

/**
 * HTTP Status Code:
 * 200 OK
 * 201 Created
 * 202 Accepted
 * 400 Bad request
 * 404 Not found
 * 500 Internal Server Error
 */

/**
 * TODO:
 * Create a new product
 * 1. Verify request body if the product name is unique
 * 2. Save the product to the database
 */
export async function createProduct(req: Request, res: Response) {}

/**
 * TODO:
 * Find an existing product by name
 * 1. Verify request body if the product name is existing in database
 * 2. Return the product details
 */
export async function findProduct(req: Request, res: Response) {}

/**
 * DONE:
 * Update an existing product by name
 * 1. Verify request body if the product name is existing in database
 * 2. Update the product details
 */
export async function updateProduct(req: Request, res: Response) {
  const { name } = req.params;
  const updateData = req.body;

  try {
    const product = await Product.findOneAndUpdate({ name }, updateData);

    // If cannot find product
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    return reportError(res, error, "Updating Product");
  }
}
