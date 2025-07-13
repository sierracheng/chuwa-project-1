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
export async function createProduct(req: Request, res: Response) {
  const { name, description, category, price, stock, imageUrl } = req.body;

  // Check if all required fields are provided
  if (!name || !description || !price || !stock || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Validate price
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }
  
  //Validate stock
  if (typeof stock !== "number" || stock < 0) {
    return res.status(400).json({ message: "Stock must be a non-negative integer" });
  }

  //Validate category
  const validCategories = ["Electronics", "Clothing", "Books", "Home", "Others"];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: `Category must be one of the following: ${validCategories.join(", ")}` });
  }


  try {
    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this name already exists" });
    }

    // Create a new product
    const newProduct = new Product({ name : name.trim(), description, category, price, stock });
    //imageUrl is optional
    if (imageUrl) {
      newProduct.imageUrl = imageUrl.trim();
    }
    await newProduct.save();

    return res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return reportError(res, error, "Creating Product");
  }

}

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
