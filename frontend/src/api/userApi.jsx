import axios from "./axiosInstance";

export const getUserProfile = async () => {
 
  try {
    const response = await axios.get("http://localhost:5000/api/users/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile";
  }
};


export const updateUserProfile = async (data) => {
  console.log("updateUserProfile data",data);
  try {
    const response = await axios.put("http://localhost:5000/api/users/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update user profile";
  }
};


