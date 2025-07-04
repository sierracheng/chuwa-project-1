/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUserAPI, getUserRoleAPI, forgotPasswordAPI, findUserAPI } from "./User";

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

async function main() {
  // testCreateUserAPI();
  // testGetUserRoleAPI();
  // testPostForgotPasswordAPI();
  testfindUserAPI();
}

main().catch((err) => console.error(err));
