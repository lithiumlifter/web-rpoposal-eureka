import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/admin/AdminNavbar";
import Sidebar from "../components/admin/AdminSidebar";
import Footer from "../components/admin/AdminFooter";

const pageTitles = {
  "/admin": "Home",
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
  "/admin/updatestatuspusat": "Update Status Pusat",
  "/admin/otorisasi-pusat": "Otorisasi Pusat",
  "/admin/otorisasipusat-direktur/eurekalogistics": "Otorisasi Pusat > Eureka Logistics",
  "/admin/otorisasipusat-direktur/eurekabookhouse": "Otorisasi Pusat > Eureka Bookhouse",
  "/admin/otorisasipusat-direktur/rajacepat": "Otorisasi Pusat > Raja Cepat",
  "/admin/otorisasipusat-direktur/masterdiskon": "Otorisasi Pusat > Master Diskon",
  "/admin/otorisasipusat-direktur/katarasa": "Otorisasi Pusat > Kata Rasa",
  "/admin/otorisasipusat-direktur/jajausahalaku": "Otorisasi Pusat > Jaja Usaha Laku",

  "/admin/otorisasipusat-direktur-all": "Otorisasi Pusat > Semua BU",
  "/admin/otorisasibandingpst": "Otorisasi Banding Pusat",
  "/admin/proposalreport": "Proposal Report",
  "/admin/reportbanding": "Report Banding",
  "/admin/reporttocabang": "Rekap Persetujuan Pusat",
  "/admin/otorisationnotcompleted": "Otorisasi Not Completed",
  "/admin/otorisationpending": "Otorisasi Pending",
  "/admin/reportkpi": "Report KPI",
  "/admin/registrasiuser": "Registrasi User",
  "/admin/setupuser": "Setup User",
  "/admin/ubahpassword": "Ubah Password",
  "/admin/detailotorisasipusat": "Detail Otorisasi Pusat",
  "/admin/privacypolicy": "Kebijakan Privasi",
  "/admin/deleteaccount": "Hapus Akun",



};

const AdminPanel = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const rawRole = localStorage.getItem("role") || "admin";
  const userRole = rawRole.charAt(0).toUpperCase() + rawRole.slice(1);
  const getPageTitle = (path) => {
    const matchedPath = Object.keys(pageTitles)
      .filter((key) => path.startsWith(key))
      .sort((a, b) => b.length - a.length)[0];
    return pageTitles[matchedPath] || "Unknown Page";
  };
  const pageTitle = getPageTitle(currentPath);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`dashboard-main-wrapper ${isOpen ? "sidebar-open" : ""}`}>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <Sidebar isOpen={isOpen} />
      <div className="dashboard-wrapper min-vh-100 d-flex flex-column">
        <div className="container-fluid dashboard-content flex-grow-1 w-100">
          <div className="row">
            <div className="col">
            {!location.pathname.startsWith("/admin/detailotorisasipusat") && (
              <div className="page-header">
                  <h1 className="pageheader-title">{pageTitle}</h1>
                    <p className="pageheader-text">
                      Anda sedang berada di halaman {pageTitle.toLowerCase()}.
                    </p>
                    <div className="page-breadcrumb">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a className="breadcrumb-link">{userRole}</a>
                          </li>
                          <li className="breadcrumb-item active" aria-current="page">
                            {pageTitle}
                          </li>
                        </ol>
                      </nav>
                    </div>
              </div>     
            )}
            </div>
          </div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPanel;
