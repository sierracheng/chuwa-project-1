import axios from "axios";

export interface UserData {
  email: string;
  password: string;
  role: string;
}

export async function findUserAPI(email: string) {
  try {
    const response = await axios.get("http://localhost:3003/users", {
      params: { email },
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

export async function forgotPasswordAPI(email: string) {
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

export async function updatePasswordAPI(email: string, newPassword: string, token: string) {
  try {
    const response = await axios.put(`http://localhost:3003/update-password`, {
      email,
      password: newPassword,
      token,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error updating password:', error);
    return {
      success: false,
      error: 'Error updating password: ' + error.message,
    };
  }
}