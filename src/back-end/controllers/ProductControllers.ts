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
    return res
      .status(400)
      .json({ message: "Stock must be a non-negative integer" });
  }

  //Validate category
  const validCategories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home",
    "Others",
  ];
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      message: `Category must be one of the following: ${validCategories.join(
        ", "
      )}`,
    });
  }

  try {
    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
    }

    // Create a new product
    const newProduct = new Product({
      name: name.trim(),
      description,
      category,
      price,
      stock,
    });
    //imageUrl is optional
    if (imageUrl) {
      newProduct.imageUrl = imageUrl.trim();
    }
    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
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
export async function findProduct(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const product = await Product.findById({ _id: id });
    // If cannot find product
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product found successfully", product });
  } catch (error) {
    return reportError(res, error, "Product found failed");
  }
}

/**
 * Get all product based on input page and limit(how many products per time)
 */
export async function getAllProduct(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    let sort;
    const skip = (page - 1) * limit;

    if (req.query.sort) {
      try {
        const parsed = JSON.parse(req.query.sort as string);
        if (typeof parsed === "object" && parsed !== null) {
          sort = parsed;
        }
      } catch {
        return res.status(400).json({ message: "Invalid sort format" });
      }
    }

    const allProducts = await Product.find().sort(sort).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    return res.status(200).json({
      message: "Products Fetched Successfully",
      products: allProducts,
      total: totalProducts,
      page,
      pages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    return reportError(res, error, "Products Fetched Failed");
  }
}

/**
 * DONE:
 * Update an existing product by name
 * 1. Verify request body if the product name is existing in database
 * 2. Update the product details
 */
export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const product = await Product.findOneAndUpdate({ _id: id }, updateData);

    // If cannot find product
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    return reportError(res, error, "Updating Product");
  }
}

/**
 * ApplyCouponAPI
 * This function applies a coupon to the product.
 * It checks if the coupon is valid and applies the discount to the product price.
 */

export async function applyCoupon(req: Request, res: Response) {
  const { couponCode, price } = req.body;

  // Validate coupon code
  if (!couponCode) {
    return res.status(400).json({ message: "Coupon code is required" });
  }

  try {
    // Hardcoded some coupon
    const validCouponBooks: Record<string, number> = {
      NEWUSER10: 0.1, // 10% discount for new users
      SUMMER20: 0.2, // 20% discount for summer sale
      WINTER15: 0.15, // 15% discount for winter sale
    };

    const discount = validCouponBooks[couponCode];

    // Assuming the product price is passed in the request body
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Invalid product price" });
    }

    const discounts = price * discount;

    return res.status(200).json({
      message: `Coupon applied successfully with ${couponCode}`,
      discounts,
      discountRate: discount,
    });
  } catch (error) {
    return reportError(res, error, "Applying Coupon");
  }
}