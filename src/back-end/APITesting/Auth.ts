import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3003/login", {
      email,
      password,
    });
    // save auth token to local storage
    localStorage.setItem("authToken", response.data.token);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: "login error",
      details: error,
    };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
};
