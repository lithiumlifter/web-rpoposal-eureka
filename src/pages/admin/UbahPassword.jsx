import { useState } from "react";
import { resetPassword } from "../../services/authServices";
import ConfirmationModal from "../../components/ConfirmationModal";

const UbahPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleValidate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Token tidak ditemukan. Silakan login kembali.");
      return;
    }

    if (!password) {
      setMessage("Password harus diisi!");
      return;
    }

    if (!confirmPassword) {
      setMessage("Konfirmasi password harus diisi!");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password dan konfirmasi password harus sama!");
      return;
    }

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

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card text-start">
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form className="needs-validation" onSubmit={handleValidate} noValidate>
                <div className="row">
                  <div className="col-12 mb-4">
                    <label htmlFor="password">Password Baru</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Password Baru"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="confirmPassword">Ulangi Password Baru</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Ulangi Password Baru"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={-1}
                      >
                        <i className={showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-row mt-4">
                  <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="Konfirmasi Ubah Password"
        message="Apakah Anda yakin ingin mengubah password?"
        confirmText="Ya, Ubah"
        cancelText="Batal"
        theme="primary"
      />
    </>
  );
};

export default UbahPassword;
