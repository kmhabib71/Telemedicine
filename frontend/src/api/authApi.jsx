import axios from "./axiosInstance";

export const registerUser = async (data) => {
  try {
    const response = await axios.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "register failed";
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

