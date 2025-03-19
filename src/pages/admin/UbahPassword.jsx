// const UbahPassword = () => {
//     return (
//         <>
            
//             <div className="row">
//                 {/* ============================================================== */}
//                 {/* validation form */}
//                 {/* ============================================================== */}
//                 <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//                     <div className="card text-start">
//                     <div className="card-body">
//                         <form className="needs-validation" noValidate>
//                         <div className="row">
//                             <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
//                             <label htmlFor="validationCustom01">Password Baru</label>
//                             <input type="password" className="form-control" id="validationCustom01" placeholder="Password Baru" required />
//                             <div className="valid-feedback">
//                                 Looks good!
//                             </div>
//                             </div>
//                             <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
//                             <label htmlFor="validationCustom02">Ulangi Password Baru</label>
//                             <input type="password" className="form-control" id="validationCustom02" placeholder="Ulangi Password Baru" required />
//                             <div className="valid-feedback">
//                                 Looks good!
//                             </div>
//                             </div>
//                         </div>
//                         <div className="form-row mt-4">
//                             <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
//                             <button className="btn btn-primary" type="submit">Submit form</button>
//                             </div>
//                         </div>
//                         </form>
//                     </div>
//                     </div>
//                 </div>
//                 {/* ============================================================== */}
//                 {/* end validation form */}
//                 {/* ============================================================== */}
//                 </div>
//         </>
//         // <div className="card text-start">
//         //     <div className="card-header"></div>
//         //     <div className="card-body">
//         //         <form>
//         //             <div className="form-group">
//         //                 <label htmlFor="exampleInputEmail1">Password Baru</label>
//         //                 <input 
//         //                     type="email" 
//         //                     className="form-control" 
//         //                     id="exampleInputEmail1" 
//         //                     placeholder="Password Baru" 
//         //                 />
//         //             </div>
//         //             <div className="form-group">
//         //                 <label htmlFor="exampleInputPassword1">Ulangi Password</label>
//         //                 <input 
//         //                     type="password" 
//         //                     className="form-control" 
//         //                     id="exampleInputPassword1" 
//         //                     placeholder="Ulangi Password" 
//         //                 />
//         //             </div>
//         //             <button type="submit" className="btn btn-primary w-100">Simpan</button>
//         //         </form>
//         //     </div>
//         // </div>
//     );
// };

// export default UbahPassword;

import { useState } from "react";
import { resetPassword } from "../../services/authServices";

const UbahPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Ambil token yang benar
    console.log("Token dari localStorage:", token); // Debugging

    if (!token) {
      setMessage("Token tidak ditemukan. Silakan login kembali.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password dan konfirmasi password harus sama!");
      return;
    }

    try {
      const response = await resetPassword(token, password, confirmPassword);
      setMessage(response.message || "Password berhasil diperbarui!");
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
              <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-12 mb-4">
                    <label htmlFor="password">Password Baru</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password Baru"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="confirmPassword">Ulangi Password Baru</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Ulangi Password Baru"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row mt-4">
                  <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                      Simpan Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UbahPassword;
