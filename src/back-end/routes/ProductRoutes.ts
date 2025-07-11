import express, { Router } from "express";

const router: Router = express.Router();

// TODO:
// 1. POST: Create a new product
router.post("/products", (req, res) => {});
// 2. GET: Find an existing product
router.get("/products/:name", (req, res) => {});
// 3. PUT: Update an existing product
router.put("/products/:name", (req, res) => {});
