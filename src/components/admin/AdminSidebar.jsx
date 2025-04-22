import React, { useState } from "react";
import { Link, useLocation  } from "react-router-dom";
import useCategories from "../../hooks/useCategories";

const Sidebar = ({ isOpen }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const [masterOpen, setMasterOpen] = useState(false);
    const currentPath = location.pathname;
    const isActive = (path) => currentPath.startsWith(path);
    const { categories } = useCategories();
    console.log("Categories from API:", categories); 

    const currentUserRole = localStorage.getItem("role");

    const hasAccess = (allowedRoles) => {
      return allowedRoles.includes(currentUserRole);
    };

    return (
        <div
          className={`nav-left-sidebar sidebar-dark ${isOpen || isHovered ? "expanded" : "collapsed"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="menu-list" style={{ backgroundColor: "#003366" }}>
            <nav className="navbar navbar-expand-lg navbar-light">
              <ul className="navbar-nav flex-column">

                <li className={`nav-item ${isActive("/admin") && currentPath === "/admin" ? "active" : ""}`}>
                  <Link className="nav-link" to="/admin">
                    <i className="fas fa-fw fa-home"></i> <span className="menu-text">Home</span>
                  </Link>
                </li>

                <li className={`nav-item ${isActive("/admin/inputproposal") ? "active" : ""}`}>
                  <Link className="nav-link" to="/admin/inputproposal">
                    <i className="fas fa-fw fa-comment-alt"></i> <span className="menu-text">Input Proposal Baru</span>
                  </Link>
                </li>

                {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                  <li className={`nav-item ${isActive("/admin/inboxcabang") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/inboxcabang">
                      <i className="fas fa-fw fa-inbox"></i> <span className="menu-text">Inbox Cabang</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                  <li className={`nav-item ${isActive("/admin/updatestatuscabang") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/updatestatuscabang">
                      <i className="fas fa-fw fa-edit"></i> <span className="menu-text">Update Status Cabang</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","otoritor cabang","otoritor"]) && (
                  <li className={`nav-item ${isActive("/admin/otorisasicabang") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/otorisasicabang">
                      <i className="fas fa-wrench"></i> <span className="menu-text">Otorisasi Cabang</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol"]) && (
                  <li className={`nav-item ${isActive("/admin/inboxpusat") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/inboxpusat">
                      <i className="fas fa-fw fa-inbox"></i> <span className="menu-text">Inbox Pusat</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol"]) && (
                  <li className={`nav-item ${isActive("/admin/updatestatuspst") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/updatestatuspst">
                      <i className="fas fa-fw fa-edit"></i> <span className="menu-text">Update Status Pst</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","otoritor"]) && (
                  <li className={`nav-item ${isActive("/admin/otorisasipusat") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/otorisasipusat">
                      <i className="fas fa-th-list"></i> <span className="menu-text">Otorisasi Pusat</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","otoritor"]) && (
                  <li className={`nav-item ${isActive("/admin/updateanggaran") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/updateanggaran">
                      <i className="fas fa-fw fa-edit"></i> <span className="menu-text">Update Anggaran</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol","otoritor","kontrol cabang", "otoritor cabang"]) && (
                  <li className={`nav-item ${isActive("/admin/reportkpi") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/reportkpi">
                      <i className="fas fa-file"></i> <span className="menu-text">Report KPI</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol"]) && (
                  <li className={`nav-item ${isActive("/admin/reporttocabang") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/reporttocabang">
                      <i className="fas fa-file"></i> <span className="menu-text">Report To Cabang</span>
                    </Link>
                  </li>
                )}

                <li className={`nav-item ${isActive("/admin/proposalreport") ? "active" : ""}`}>
                  <Link className="nav-link" to="/admin/proposalreport">
                    <i className="fas fa-file"></i> <span className="menu-text">Proposal Report</span>
                  </Link>
                </li>

                {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                  <li className={`nav-item ${isActive("/admin/otorisationnotcompleted") ? "active" : ""}`}>
                      <Link className="nav-link" to="/admin/otorisationnotcompleted">
                          <i className="fas fa-file"></i> <span className="menu-text">Otorisation Not Completed</span>
                      </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                  <li className={`nav-item ${isActive("/admin/otorisationpending") ? "active" : ""}`}>
                      <Link className="nav-link" to="/admin/otorisationpending">
                          <i className="fas fa-file"></i> <span className="menu-text">Otorisation Pending</span>
                      </Link>
                  </li>
                )}

                {/* Submenu Master */}
                {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                  <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => setMasterOpen(!masterOpen)}
                  >
                    <i className="fas fa-cogs"></i> <span className="menu-text">User Management</span>
                    {/* <i className={`fas fa-chevron-${masterOpen ? "down" : "right"} float-end`} style={{ float: "right" }}></i> */}
                  </span>
                  {masterOpen && (
                    <ul className="navbar-nav flex-column ms-3">
                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/levelotorisasi") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/levelotorisasi">
                            <i className="fas fa-th-list"></i> <span className="menu-text">Level Otorisasi</span>
                          </Link>
                        </li>
                      )}

                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/setupuser") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/setupuser">
                            <i className="fas fa-wrench"></i> <span className="menu-text">Setup User</span>
                          </Link>
                        </li>
                      )}

                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/registrasiuser") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/registrasiuser">
                            <i className="fas fa-wrench"></i> <span className="menu-text">Registrasi User</span>
                          </Link>
                        </li>
                      )}

                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/validasiotorisasi") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/validasiotorisasi">
                            <i className="fas fa-wrench"></i> <span className="menu-text">Validasi Otorisasi</span>
                          </Link>
                        </li>
                      )}

                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/rubahruanglingkup") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/rubahruanglingkup">
                            <i className="fas fa-wrench"></i> <span className="menu-text">Rubah Ruang Lingkup</span>
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}
                </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
    );
};

export default Sidebar;
