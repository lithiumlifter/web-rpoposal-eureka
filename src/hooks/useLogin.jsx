import { useState } from "react";
import { login } from "../services/authServices";

export const useLogin = (onSuccess) => {
  const [error, setError] = useState("");

  const handleLogin = async (username, password) => {
    try {
      const response = await login(username, password);
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        onSuccess();
      } else {
        setError("Token tidak ditemukan dalam response.");
      }
    } catch (err) {
      setError(err.message || "Login gagal, periksa username & password!");
    }
  };

  return { handleLogin, error };
};
