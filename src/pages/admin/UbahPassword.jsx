import ConfirmationModal from "../../components/ConfirmationModal";
import usePasswordForm from "../../hooks/usePassword";
import SubmitButton from "../../components/SubmitButton";

const PasswordField = ({
  label,
  id,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
}) => (
  <div className="col-12 mb-4">
    <label htmlFor={id}>{label}</label>
    <div className="input-group">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        id={id}
        placeholder={label}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={toggleShowPassword}
        tabIndex={-1}
      >
        <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
      </button>
    </div>
  </div>
);

const UbahPassword = () => {
  const {
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
    handleValidate,
    handleConfirm,
  } = usePasswordForm();

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card text-start">
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form className="needs-validation" onSubmit={handleValidate} noValidate>
                <div className="row">
                  <PasswordField
                    label="Password Baru"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showPassword={showPassword}
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                  />
                  <PasswordField
                    label="Ulangi Password Baru"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    showPassword={showConfirmPassword}
                    toggleShowPassword={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  />
                </div>
                <div className="form-row mt-4">
                  <div className="col-12">
                    <SubmitButton />
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
