import { createUserAPI } from "./CreateUser";

async function main() {
  const result = await createUserAPI({
    email: "abcde@test.com",
    password: "ValidInput123",
    role: "Admin",
  });

  if (result.success) {
    console.log("User created:", result.data);
  } else {
    console.error("Error:", result.error);
  }
}

main().catch((err) => console.error(err));
