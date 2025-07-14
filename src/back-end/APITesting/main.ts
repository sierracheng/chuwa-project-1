/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IProduct } from "../models/Product";
import { getAllProductAPI, updateProductAPI } from "./Product";
import {
  createUserAPI,
  getUserRoleAPI,
  forgotPasswordAPI,
  findUserAPI,
} from "./User";

import { createProductAPI } from "./Product";
import { products1, products2 } from "./DummyProducts";

async function testCreateUserAPI() {
  const ret = await createUserAPI({
    email: "zgeming@seas.upenn.edu",
    password: "Aa1234567890",
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
    name: "iPhone 16",
    description: "Latest Apple iPhone",
    category: "Electronics",
    price: 700,
    stock: 25,
    imageUrl: "/",
  };
  const ret = await updateProductAPI(updateData.name, updateData as IProduct);
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

async function main() {
  // testCreateUserAPI();
  // testGetUserRoleAPI();
  // testPostForgotPasswordAPI();
  // testfindUserAPI();
  testCreateProductAPI();
  // testGetAllProductAPI();
}

main().catch((err) => console.error(err));
