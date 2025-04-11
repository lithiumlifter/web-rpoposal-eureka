// // import React from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "../assets/libs/css/style.css";
// // import "../assets/styles/Login.css"
// // import "../assets/vendor/fonts/fontawesome/css/fontawesome-all.css";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const navigate = useNavigate();

// //   const handleSignIn = (e) => {
// //     e.preventDefault();
// //     navigate("/admin");
// //   };

// //   return (
// //     <div className="login-page">
// //       <div className="login-container">
// //         <div className="card">
// //           <div className="card-header text-center">
// //             <a href="/">
// //               <img className="logo-img" src="../../../public/images/logo-eurekalogistics.png" alt="logo" />
// //             </a>
// //             <span className="splash-description">Let's Reach Our Super Victory!!</span>
// //           </div>
// //           <div className="card-body">
// //             <form>
// //               <div className="form-group">
// //                 <input className="form-control form-control-lg" type="text" placeholder="Username" autoComplete="off" />
// //               </div>
// //               <div className="form-group">
// //                 <input className="form-control form-control-lg" type="password" placeholder="Password" />
// //               </div>
// //               <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={handleSignIn}>
// //                 Login
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../services/authServices"; // Import fungsi login
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../assets/libs/css/style.css";
// import "../assets/styles/Login.css";
// import "../assets/vendor/fonts/fontawesome/css/fontawesome-all.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // State untuk error

//   // const handleSignIn = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await login(username, password); // Panggil API Login
//   //     localStorage.setItem("token", response.token); // Simpan token di localStorage
//   //     navigate("/admin"); // Redirect ke dashboard
//   //   } catch (err) {
//   //     setError(err.message || "Login gagal, periksa username & password!");
//   //   }
//   // };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await login(username, password); // Panggil API Login
//       console.log("Response dari API:", response); // Debugging
  
//       if (response.data && response.data.token) {
//         localStorage.setItem("token", response.data.token); // Simpan token dengan path yang benar
//         navigate("/admin"); // Redirect ke dashboard
//       } else {
//         setError("Token tidak ditemukan dalam response.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Login gagal, periksa username & password!");
//     }
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
//             {error && <div className="alert alert-danger">{error}</div>} {/* Tampilkan error jika ada */}
//             <form onSubmit={handleSignIn}>
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
//               <div className="form-group">
//                 <input
//                   className="form-control form-control-lg"
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary btn-lg btn-block">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices"; // Import fungsi login
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/libs/css/style.css";
import "../assets/styles/Login.css";
import "../assets/vendor/fonts/fontawesome/css/fontawesome-all.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State untuk error
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk toggle visibility password

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password); // Panggil API Login
      console.log("Response dari API:", response); // Debugging

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token); // Simpan token di localStorage
        navigate("/admin"); // Redirect ke dashboard
      } else {
        setError("Token tidak ditemukan dalam response.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login gagal, periksa username & password!");
    }
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
            {error && <div className="alert alert-danger">{error}</div>} {/* Tampilkan error jika ada */}
            <form onSubmit={handleSignIn}>
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
                  type={passwordVisible ? "text" : "password"} // Toggle antara 'text' dan 'password'
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                >
                  <i className={passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"}></i> {/* Ikon mata */}
                </button>
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
