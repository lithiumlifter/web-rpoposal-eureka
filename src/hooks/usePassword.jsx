import { useState } from "react";
import { resetPassword } from "../services/authServices";

const usePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleValidate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return setMessage("Token tidak ditemukan. Silakan login kembali.");
    if (!password) return setMessage("Password harus diisi!");
    if (!confirmPassword) return setMessage("Konfirmasi password harus diisi!");
    if (password !== confirmPassword)
      return setMessage("Password dan konfirmasi password harus sama!");

    setShowModal(true);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    setShowModal(false);

    try {
      const response = await resetPassword(token, password, confirmPassword);
      setMessage(response.message || "Password berhasil diperbarui!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.message || "Gagal mengubah password.");
    }
  };

  return {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    message,
    showModal,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    setShowModal,
    setMessage,
    handleValidate,
    handleConfirm,
  };
};

export default usePasswordForm;
