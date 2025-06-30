import { createUserAPI, getUserRoleAPI } from "./User";

async function testCreateUserAPI() {
  const ret = await createUserAPI({
    email: "abcde@test.com",
    password: "ValidInput123",
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

async function main() {
  // testCreateUserAPI();
  testGetUserRoleAPI();
}

main().catch((err) => console.error(err));
