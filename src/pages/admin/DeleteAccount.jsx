// const DeleteAccount = () => {
//     return (
//         <div className="container py-2">
//             <div>
//                 <h1>Delete Account</h1>
//                 FAFIFU WASWESWOS SLURRRR
//             </div>
//         </div>
//     );
// };

// export default DeleteAccount;

// import React, { useState } from 'react';

// const DeleteAccount = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [agreed, setAgreed] = useState(false);

//   const handleDelete = (e) => {
//     e.preventDefault();
//     // Lakukan aksi penghapusan akun di sini
//     console.log('Delete account for:', username);
//   };

//   return (
//     <div className="min-vh-100 d-flex flex-column">
//       {/* Header hijau */}
//       {/* <div style={{ backgroundColor: '#0D3C34', height: '100px' }}></div> */}

//       {/* Form konten */}
//       <div className="container flex-grow-1 d-flex flex-column align-items-center">
//         <h5 className="text-center text-success fw-semibold mb-4">
//           Please enter your login details.
//         </h5>

//         <form onSubmit={handleDelete} style={{ maxWidth: '600px', width: '100%' }}>
//           <div className="row mb-3">
//             <div className="col">
//               <label className="form-label">Username:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="col">
//               <label className="form-label">Password:</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-check mb-3">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               checked={agreed}
//               onChange={() => setAgreed(!agreed)}
//               id="termsCheck"
//               required
//             />
//             <label className="form-check-label" htmlFor="termsCheck">
//               By deleting this account you agree to AB Shop's Terms & Conditions.
//               Once the account deletion process is initiated, it cannot be reversed, and you will no longer have access to your account or associated features.
//             </label>
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="btn text-white px-4"
//               style={{ backgroundColor: '#0D3C34' }}
//               disabled={!agreed}
//             >
//               Delete my account
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DeleteAccount;


import React, { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal";
import SubmitButton from "../../components/SubmitButton";

const DeleteAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    // Logika hapus akun di sini
    console.log("Akun dihapus:", username);
    setShowModal(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card text-start">
            <div className="card-body">
              <h5 className="fw-semibold mb-4 text-center">
                Silakan masukkan detail Data Anda
              </h5>

              <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="username">Nama Pengguna</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Nama Pengguna"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="password">Kata Sandi</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Kata Sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12 mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agree"
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                        required
                      />
                      <label className="form-check-label" htmlFor="agree">
                        Dengan menghapus akun ini, Anda menyetujui Syarat & Ketentuan AB Shop.
                        Setelah proses ini dimulai, tidak dapat dibatalkan dan Anda tidak akan
                        memiliki akses lagi ke akun dan fitur terkait.
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-row mt-4">
                  <div className="col-12">
                    <SubmitButton disabled={!agree} label="Hapus Akun Saya" />
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
        title="Konfirmasi Hapus Akun"
        message="Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        theme="danger"
      />
    </>
  );
};

export default DeleteAccount;
