// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/admin/AdminNavbar";
// import Sidebar from "../components/admin/AdminSidebar";
// import Footer from "../components/admin/AdminFooter";
// import "../assets/libs/css/style.css";

// const AdminPanel = () => {
//   return (
//     <div className="dashboard-main-wrapper">
//       <Navbar />
//       <Sidebar />
//       <div className="dashboard-wrapper">
//         <div className="container-fluid dashboard-content">
//           {/* ============================================================== */}
//           {/* pageheader */}
//           {/* ============================================================== */}
//           <div className="row">
//             <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//               <div className="page-header">
//                 <h2 className="pageheader-title">Blank Pageheader </h2>
//                 <p className="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
//                 <div className="page-breadcrumb">
//                   <nav aria-label="breadcrumb">
//                     <ol className="breadcrumb">
//                       <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">Dashboard</a></li>
//                       <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">Pages</a></li>
//                       <li className="breadcrumb-item active" aria-current="page">Blank Pageheader</li>
//                     </ol>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* end pageheader */}

//            {/* Halaman Dinamis */}
//            <Outlet />
//           {/* footer */}
//           <Footer />  
//           {/* end footer */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/admin/AdminNavbar";
// import Sidebar from "../components/admin/AdminSidebar";
// import Footer from "../components/admin/AdminFooter";
// // import "../assets/libs/css/style.css";

// const AdminPanel = () => {
//   return (
//     <div className="dashboard-main-wrapper">
//       <Navbar />
//       <Sidebar />
//       <div className="dashboard-wrapper min-vh-100 d-flex flex-column">
//         <div className="container-fluid dashboard-content flex-grow-1 w-100">
//           {/* Page Header */}
//           <div className="row">
//             <div className="col">
//               <div className="page-header">
//                 <h2 className="pageheader-title">Blank Pageheader</h2>
//                 <p className="pageheader-text">
//                   Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.
//                 </p>
//                 <div className="page-breadcrumb">
//                   <nav aria-label="breadcrumb">
//                     <ol className="breadcrumb">
//                       <li className="breadcrumb-item"><a href="#" className="breadcrumb-link">Admin</a></li>
//                       <li className="breadcrumb-item active" aria-current="page">Blank Pageheader</li>
//                     </ol>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* End Page Header */}

//           {/* Halaman Dinamis */}
//           <Outlet />
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/admin/AdminNavbar";
import Sidebar from "../components/admin/AdminSidebar";
import Footer from "../components/admin/AdminFooter";

// Mapping title berdasarkan path
const pageTitles = {
  "/admin": "Home",
  // "/admin/home": "Home",
  "/admin/axdimension": "AX Dimension",
  "/admin/axcustomer": "AX Customer",
  "/admin/inputproposal": "Input Proposal",
  "/admin/updateanggaran": "Update Anggaran",
  "/admin/inboxcabang": "Inbox Cabang",
  "/admin/updatestatuscabang": "Update Status Cabang",
  "/admin/otorisasicabang": "Otorisasi Cabang",
  "/admin/levelotorisasi": "Level Otorisasi",
  "/admin/validasiotorisasi": "Validasi Otorisasi",
  "/admin/rubahruanglingkup": "Rubah Ruang Lingkup",
  "/admin/inboxpusat": "Inbox Pusat",
  "/admin/updatestatuspst": "Update Status Pusat",
  "/admin/otorisasipusat": "Otorisasi Pusat",
  "/admin/otorisasibandingpst": "Otorisasi Banding Pusat",
  "/admin/proposalreport": "Proposal Report",
  "/admin/reportbanding": "Report Banding",
  "/admin/otorisationnotcompleted": "Otorisasi Not Completed",
  "/admin/otorisationpending": "Otorisasi Pending",
  "/admin/reportkpi": "Report KPI",
  "/admin/registrasiuser": "Registrasi User",
  "/admin/setupuser": "Setup User",
  "/admin/ubahpassword": "Ubah Password",
};

const AdminPanel = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageTitle = pageTitles[currentPath] || "Unknown Page";

  return (
    <div className="dashboard-main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="dashboard-wrapper min-vh-100 d-flex flex-column">
        <div className="container-fluid dashboard-content flex-grow-1 w-100">
          {/* Page Header */}
          <div className="row">
            <div className="col">
              <div className="page-header">
                <h2 className="pageheader-title">{pageTitle}</h2>
                <p className="pageheader-text">
                  Anda sedang berada di halaman {pageTitle.toLowerCase()}.
                </p>
                <div className="page-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a className="breadcrumb-link">Admin</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                          {pageTitle}
                      </li>
                      {/* {currentPath !== "/admin" && (
                        <li className="breadcrumb-item active" aria-current="page">
                          {pageTitle}
                        </li>
                      )} */}
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* End Page Header */}

          {/* Halaman Dinamis */}
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPanel;
