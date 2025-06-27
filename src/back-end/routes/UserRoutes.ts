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
  emailVerify,
  findUser,
  getUserRole,
  updatePassword,
} from "../controllers/UserControllers";

const router: Router = express.Router();

// 1. GET: Find an existing account
// 2. POST: Create a new account
router
  .route("/users")
  .get((req, res) => {
    findUser(req, res);
  })
  .post((req, res) => {
    createUser(req, res);
  });

// 3. PUT: Update the password of an account
router.put("/:email/password", (req, res) => {
  updatePassword(req, res);
});

// 4. GET: User’s role
router.get("/:email/role", (req, res) => {
  getUserRole(req, res);
});

// 5. GET: Email service
router.get("/:email/verify", (req, res) => {
  emailVerify(req, res);
});

export default router;
