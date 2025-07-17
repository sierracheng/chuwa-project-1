import express, { Router } from "express";
import {
  createProduct,
  findProduct,
  updateProduct,
  getAllProduct,
  applyCoupon,
} from "../controllers/ProductControllers";

const router: Router = express.Router();

// TODO:
// 1. POST: Create a new product
router.post("/products", (req, res) => {
  createProduct(req, res);
});
// 2. GET: Find an existing product
router.get("/products/:id", (req, res) => {
  findProduct(req, res);
});
// 3. PUT: Update an existing product
router.put("/products/:id", (req, res) => {
  updateProduct(req, res);
});
// 4. GET: Get All existing products
router.get("/products", (req, res) => {
  getAllProduct(req, res);
});
// CouponApply API
router.post("/coupon/apply", (req, res) => {
  applyCoupon(req, res);
});
export default router;
