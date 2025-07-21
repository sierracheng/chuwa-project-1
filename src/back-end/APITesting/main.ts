/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IProduct } from "../models/Product";
import {
  getAllProductAPI,
  updateProductAPI,
  createProductAPI,
  applyCouponAPI,
} from "./Product";
import {
  createUserAPI,
  getUserRoleAPI,
  forgotPasswordAPI,
  findUserAPI,
} from "./User";

import { products1, products2 } from "./DummyProducts";
import test from "node:test";

async function testCreateUserAPI() {
  const ret = await createUserAPI({
    email: "Admin2@gmail.com",
    password: "Aa123456789",
    role: "Admin",
  });

  if (ret.success) {
    console.log("User created:", ret.data);
  } else {
    console.error("Error:", ret.error);
  }
}

async function testGetUserRoleAPI() {
  const email = "abcde@test.com";
  const ret = await getUserRoleAPI(email);

  if (ret.success) {
    console.log("Get User's role:", ret.data.role);
  } else {
    console.error("Error:", ret.error);
  }
}

async function testPostForgotPasswordAPI() {
  const email = "zgeming@seas.upenn.edu";
  const ret = await forgotPasswordAPI(email);
  if (ret.success) {
    console.log("Post forgot password:", ret.data);
  } else {
    console.error("Error:", ret.error);
  }
}

async function testfindUserAPI() {
  const email = "Test1@gmail.com";
  const ret = await findUserAPI(email);
  if (ret.success) {
    console.log("Find user:", ret.data);
  } else {
    console.error("Error:", ret.error);
  }
}

async function testUpdateProductAPI() {
  const updateData = {
    name: "Happy face 2.0",
    description: "Still happy, but upgraded!",
    category: "Electronics",
    price: 99.99,
    stock: 10,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/Smiley.svg",
  };
  const productId = "687563150edab04c3b9e46a2";
  const ret = await updateProductAPI(productId, updateData as IProduct);
  if (ret.success) {
    console.log("Successfully update product:", ret);
  } else {
    console.error("Error:", ret.error);
  }
}

async function testCreateProductAPI() {
  const products = products2;
  for (const product of products) {
    const ret = await createProductAPI(
      product.name,
      product.description,
      product.category as
        | "Electronics"
        | "Clothing"
        | "Books"
        | "Home"
        | "Others",
      product.price,
      product.stock,
      product.imageUrl
    );
    if (ret.success) {
      console.log("Successfully create product:", ret.data);
    } else {
      console.error("Error:", ret.error);
    }
  }
}

async function testGetAllProductAPI() {
  const ret = await getAllProductAPI(1, 10, "priceUp");
  if (ret.success) {
    console.log("Successfully Get all products:", ret.data);
  } else {
    console.error("Error:", ret.error);
  }
}

async function testApplyCouponAPI() {
  const couponCode = "NEWUSER";
  const totalPrice = 100.0; // Example total price
  const ret = await applyCouponAPI(couponCode, totalPrice);
  if (ret.success) {
    console.log("Successfully applied coupon:", ret.data);
  } else {
    console.error("Error applying coupon:", ret.error);
  }
}

async function main() {
  testCreateUserAPI();
  // testGetUserRoleAPI();
  // testPostForgotPasswordAPI();
  // testfindUserAPI();
  // testCreateProductAPI();
  // testGetAllProductAPI();
  // testUpdateProductAPI();
  // testApplyCouponAPI();
}

main().catch((err) => console.error(err));
