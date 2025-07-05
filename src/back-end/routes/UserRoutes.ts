/**
 * HTTP Status Code:
 * 200 OK
 * 201 Created
 * 202 Accepted
 * 400 Bad request
 * 404 Not found
 * 500 Internal Server Error
 */

import express, { Router } from "express";
import {
  createUser,
  findUser,
  forgotPassword,
  getUserRole,
  updatePassword,
} from "../controllers/UserControllers";

const router: Router = express.Router();

// 1. GET: Find an existing account
router.get("/users/:email", (req, res) => {
  findUser(req, res);
});
// 2. POST: Create a new account
router.post("/users", (req, res) => {
  createUser(req, res);
});

// 3. PUT: Update the password of an account
router.put("/update-password", (req, res) => {
  updatePassword(req, res);
});

// 4. GET: User’s role
router.get("/:email/role", (req, res) => {
  getUserRole(req, res);
});

// 5. POST: Forgot password
router.post("/forgot-password", (req, res) => {
  forgotPassword(req, res);
});

export default router;
