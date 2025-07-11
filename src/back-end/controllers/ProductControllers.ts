import Product from "../models/Product";

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
 * TODO:
 * Update an existing product by name
 * 1. Verify request body if the product name is existing in database
 * 2. Update the product details
 */
export async function updateProduct(req: Request, res: Response) {}
