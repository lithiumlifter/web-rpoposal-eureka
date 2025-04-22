import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/libs/css/style.css";
import "../assets/styles/Login.css";
import "../assets/vendor/fonts/fontawesome/css/fontawesome-all.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleLogin, error } = useLogin(() => {
    setLoading(false);
    navigate("/admin");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.includes(" ") || password.includes(" ")) {
      setInputError("Username dan Password tidak boleh mengandung spasi.");
      return;
    }

    setInputError("");
    setLoading(true);

    await handleLogin(username, password);
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="card">
          <div className="card-header-logo text-center">
            <a href="/">
              <img className="logo-img" src="/images/logo-eurekalogistics.png" alt="logo" />
            </a>
            <span className="splash-description">Let's Reach Our Super Victory!!</span>
          </div>
          <div className="card-body">
            {inputError && <div className="alert alert-danger">{inputError}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="form-group password-group">
                <input
                  className="form-control form-control-lg"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <i className={passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                </button>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
