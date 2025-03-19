import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
  
      console.log("Data dari API:", response.data); // Debugging
      return response.data; // Pastikan response ini memiliki `token`
    } catch (error) {
      console.error("Error API:", error.response ? error.response.data : error);
      throw error.response ? error.response.data : error;
    }
  };

  
export const resetPassword = async (token, newPassword, confirmPassword) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/reset-password`,
        {
          password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  


