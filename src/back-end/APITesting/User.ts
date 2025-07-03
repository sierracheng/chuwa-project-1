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

export async function getUserRoleAPI(email: string) {
  try {
    const response = await axios.get(`http://localhost:3003/${email}/role`);
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

export async function postFogortPassword(email: string) {
  try {
    const response = await axios.post("http://localhost:3003/forgot-password", {
      email,
    });
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
