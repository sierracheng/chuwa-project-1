import axios from "axios";

interface UserData {
  email: string;
  password: string;
  role: string;
}

export async function createUserAPI(userData: UserData) {
  try {
    const response = await axios.post("http://localhost:3003/users", userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
