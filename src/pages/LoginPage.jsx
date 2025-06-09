// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLogin } from "../hooks/useLogin";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../assets/libs/css/style.css";
// import "../assets/styles/Login.css";
// import "../assets/vendor/fonts/fontawesome/css/fontawesome-all.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [inputError, setInputError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { handleLogin, error } = useLogin(() => {
//     setLoading(false);
//     navigate("/admin");
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (username.includes(" ") || password.includes(" ")) {
//       setInputError("Username dan Password tidak boleh mengandung spasi.");
//       return;
//     }

//     setInputError("");
//     setLoading(true);

//     await handleLogin(username, password);
//     setLoading(false);
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="card">
//           <div className="card-header-logo text-center">
//             <a href="/">
//               <img className="logo-img" src="/images/logo-eurekalogistics.png" alt="logo" />
//             </a>
//             <span className="splash-description">Let's Reach Our Super Victory!!</span>
//           </div>
//           <div className="card-body">
//             {inputError && <div className="alert alert-danger">{inputError}</div>}
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   className="form-control form-control-lg"
//                   type="text"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="form-group password-group">
//                 <input
//                   className="form-control form-control-lg"
//                   type={passwordVisible ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-link"
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                 >
//                   <i className={passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-lg btn-block"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Login"}
//               </button>
//               <div className="text-center mt-4">
//               <div className="d-inline-flex align-items-center gap-2 text-muted">
//                 <a
//                   href="/privacypolicy"
//                   className="text-muted"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Privacy Policy
//                 </a>
//                 <span>|</span>
//                 <span>©2025 EurekaDev</span>
//               </div>
//             </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLogin } from "../hooks/useLogin";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../assets/libs/css/style.css";
// import "../assets/styles/Login.css";
// import "../assets/vendor/fonts/fontawesome/css/fontawesome-all.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [inputError, setInputError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { handleLogin, error } = useLogin(() => {
//     setLoading(false);
//     navigate("/admin");
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (username.includes(" ") || password.includes(" ")) {
//       setInputError("Username dan Password tidak boleh mengandung spasi.");
//       return;
//     }

//     setInputError("");
//     setLoading(true);

//     await handleLogin(username, password);
//     setLoading(false);
//   };

//   return (
//     <div
//       className="login-page"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundImage: "url('../../public/images/bg-login-new.webp')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="login-container" style={{ width: "100%", maxWidth: "400px" }}>
//         <div
//           className="card"
//           style={{
//             backgroundColor: "rgba(255, 255, 255, 0.5)",
//             border: "1px solid rgba(255, 255, 255, 0.3)",
//             borderRadius: "1rem",
//             boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
//             backdropFilter: "blur(10px)",
//             WebkitBackdropFilter: "blur(10px)",
//             padding: "2rem",
//           }}
//         >
//           <div className="card-header-logo text-center mb-3">
//             <a href="/">
//               <img
//                 className="logo-img"
//                 src="/images/logo-eurekalogistics.png"
//                 alt="logo"
//                 style={{ maxWidth: "180px", height: "auto" }}
//               />
//             </a>
//             <span
//               className="splash-description"
//               style={{ fontSize: "0.9rem", color: "#333" }}
//             >
//               Let's Reach Our Super Victory!!
//             </span>
//           </div>
//           <div className="card-body">
//             {inputError && (
//               <div className="alert alert-danger">{inputError}</div>
//             )}
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group mb-3">
//                 <input
//                   className="form-control form-control-lg"
//                   type="text"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   autoComplete="off"
//                   style={{ borderRadius: "0.5rem" }}
//                 />
//               </div>
//               <div className="form-group password-group mb-3" style={{ position: "relative" }}>
//                 <input
//                   className="form-control form-control-lg"
//                   type={passwordVisible ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   style={{ borderRadius: "0.5rem" }}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-link"
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                   style={{
//                     position: "absolute",
//                     top: "50%",
//                     right: "10px",
//                     transform: "translateY(-50%)",
//                     padding: "0",
//                     fontSize: "1.2rem",
//                     color: "#555",
//                   }}
//                 >
//                   <i
//                     className={
//                       passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"
//                     }
//                   ></i>
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-lg btn-block"
//                 disabled={loading}
//                 style={{
//                   borderRadius: "0.5rem",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {loading ? "Loading..." : "Login"}
//               </button>
//               <div className="text-center mt-4">
//                 <div className="d-inline-flex align-items-center gap-2 text-muted" style={{ fontSize: "0.85rem" }}>
//                   <a
//                     href="/privacypolicy"
//                     className="text-muted"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Privacy Policy
//                   </a>
//                   <span>|</span>
//                   <span>©2025 EurekaDev</span>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
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
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setCardVisible(true), 500);
  }, []);

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
    <div
      className="login-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url('../../public/images/bg-login-new.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-container" style={{ width: "100%", maxWidth: "400px" }}>
        <div
          className="card"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "1rem",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            padding: "2rem",
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div className="card-header-logo text-center mb-3">
            <a href="/">
              <img
                className="logo-img"
                src="/images/logo-eurekalogistics.png"
                alt="logo"
                style={{ maxWidth: "180px", height: "auto" }}
              />
            </a>
            <span
              className="splash-description"
              style={{ fontSize: "0.9rem", color: "#333" }}
            >
              Let's Reach Our Super Victory!!
            </span>
          </div>
          <div className="card-body">
            {inputError && (
              <div className="alert alert-danger">{inputError}</div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  style={{ borderRadius: "0.5rem" }}
                />
              </div>
              <div className="form-group password-group mb-3" style={{ position: "relative" }}>
                <input
                  className="form-control form-control-lg"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRadius: "0.5rem" }}
                />
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    padding: "0",
                    fontSize: "1.2rem",
                    color: "#555",
                  }}
                >
                  <i
                    className={
                      passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                  ></i>
                </button>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                disabled={loading}
                style={{
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <div className="text-center mt-4">
                <div className="d-inline-flex align-items-center gap-2 text-muted" style={{ fontSize: "0.85rem" }}>
                  <a
                    href="/privacypolicy"
                    className="text-muted"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                  <span>|</span>
                  <span>©2025 EurekaDev</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
