import express, { Router } from "express";
import {
  createProduct,
  findProduct,
  updateProduct,
} from "../controllers/ProductControllers";

const router: Router = express.Router();

// TODO:
// 1. POST: Create a new product
router.post("/products", (req, res) => {
  createProduct(req, res);
});
// 2. GET: Find an existing product
router.get("/products/:name", (req, res) => {
  findProduct(req, res);
});
// 3. PUT: Update an existing product
router.put("/products/:name", (req, res) => {
  updateProduct(req, res);
});

export default router;
