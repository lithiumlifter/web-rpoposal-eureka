import React, { useState, useEffect } from "react";
import { Link, useLocation  } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import proposalServices from "../../services/admin/allDataProposal"

const Sidebar = ({ isOpen }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const [masterOpen, setMasterOpen] = useState(false);
    const [lainLain, setLainLain] = useState(false);
    const [jumlahProposalPST, setJumlahProposalPST] = useState(0);
    const [jumlahProposalPSTDirektur, setJumlahProposalPSTDirektur] = useState(0);
    const [jumlahEurekaLogistics, setJumlahEurekaLogistics] = useState(0);
    const [jumlahEurekaBookhouse, setJumlahEurekaBookhouse] = useState(0);
    const [jumlahRajaCepat, setJumlahRajaCepat] = useState(0);
    const [jumlahMasterDiskon, setJumlahMasterDiskon] = useState(0);
    const [jumlahKataRasa, setJumlahKataRasa] = useState(0);
    const [jumlahJajaUsahaLaku, setJumlahJajaUsahaLaku] = useState(0);

    const currentPath = location.pathname;
    const isActive = (path) => currentPath.startsWith(path);
    const { categories } = useCategories();
    console.log("Categories from API:", categories); 

    const currentUserRole = localStorage.getItem("role");

    const hasAccess = (allowedRoles) => {
      return allowedRoles.includes(currentUserRole);
    };

      useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await proposalServices.getAllDataProposalPST();
                setJumlahProposalPST(data?.data?.totalData || 0);
                console.log("Data proposal PST:", data);
            } catch (err) {
                console.error("Failed to fetch proposal PST:", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
      const fetchAllData = async () => {
        try {
          const [
            totalPST,
            eurekaLogistics,
            eurekaBookhouse,
            rajaCepat,
            masterDiskon,
            kataRasa,
            jajaUsahaLaku
          ] = await Promise.all([
            proposalServices.getAllDataProposalPSTDirektur(),
            proposalServices.getAllDataProposalPSTDirekturEurekaLogistic(),
            proposalServices.getAllDataProposalPSTDirekturEurekaBookhouse(),
            proposalServices.getAllDataProposalPSTDirekturRajaCepat(),
            proposalServices.getAllDataProposalPSTDirekturMasterDiskon(),
            proposalServices.getAllDataProposalPSTDirekturKataRasa(),
            proposalServices.getAllDataProposalPSTDirekturJajaUsahaLaku()
          ]);
    
          setJumlahProposalPSTDirektur(totalPST?.data?.totalData || 0);
          setJumlahEurekaLogistics(eurekaLogistics?.data?.totalData || 0);
          setJumlahEurekaBookhouse(eurekaBookhouse?.data?.totalData || 0);
          setJumlahRajaCepat(rajaCepat?.data?.totalData || 0);
          setJumlahMasterDiskon(masterDiskon?.data?.totalData || 0);
          setJumlahKataRasa(kataRasa?.data?.totalData || 0);
          setJumlahJajaUsahaLaku(jajaUsahaLaku?.data?.totalData || 0);
    
        } catch (error) {
          console.error("Error fetching data proposal per unit:", error);
        }
      };
    
      fetchAllData();
    }, []);    

    return (
        <div
          className={`nav-left-sidebar sidebar-dark ${isOpen || isHovered ? "expanded" : "collapsed"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="menu-list" style={{ backgroundColor: "#003366", minHeight: "1150px" }}>
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

                {hasAccess(["admin","kontrol"]) && (
                  <li className={`nav-item ${isActive("/admin/inboxpusat") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/inboxpusat">
                      <i className="fas fa-fw fa-inbox"></i> <span className="menu-text">Inbox Pusat</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol"]) && (
                  <li className={`nav-item ${isActive("/admin/updatestatuspusat") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/updatestatuspusat">
                      <i className="fas fa-fw fa-edit"></i> <span className="menu-text">Update Status Pst</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin", "otoritor"]) && (
                  <li className={`nav-item ${isActive("/admin/otorisasi-pusat") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/otorisasi-pusat">
                      <i className="fas fa-th-list"></i>
                      {jumlahProposalPST > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "6px",
                            left: "1px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                          }}
                        >
                          {jumlahProposalPST}
                        </div>
                      )}
                      <span className="menu-text">Otorisasi Pusat (Non Direktur)</span>
                    </Link>
                  </li>
                )}

                {/* {hasAccess(["admin","direktur"]) && (
                  <li className={`nav-item ${isActive("/admin/otorisasi-pusat-dir") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/otorisasi-pusat-dir">
                      <i className="fas fa-th-list"></i> <span className="menu-text">Otorisasi Pusat (Direktur)</span>
                      {jumlahProposalPSTDirektur > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "6px",
                            left: "1px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                          }}
                        >
                          {jumlahProposalPSTDirektur}
                        </div>
                      )}
                    </Link>
                  </li>
                )} */}

                {/* Submenu Otorisasi Pusat Direktur */}
                {hasAccess(["admin", "direktur"]) && (
                    <li className="nav-item" style={{ position: "relative" }}>
                      <span
                        className="nav-link"
                        style={{ cursor: "pointer", position: "relative" }}
                        onClick={() => setMasterOpen(!masterOpen)}
                      >
                        <i className="fas fa-th-list"></i>{" "}
                        <span className="menu-text">Otorisasi Pusat (Direktur)</span>

                        {/* Badge di menu utama */}
                        {jumlahProposalPSTDirektur > 0 && (
                          <div
                            style={{
                                              position: "absolute",
                                              top: "6px",
                                              left: "1px",
                                              background: "red",
                                              color: "white",
                                              borderRadius: "50%",
                                              width: "18px",
                                              height: "18px",
                                              fontSize: "10px",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              zIndex: 2,
                                            }}
                          >
                            {jumlahProposalPSTDirektur}
                          </div>
                        )}
                      </span>

                      {masterOpen && (
                        <ul className="navbar-nav flex-column ms-3">
                          <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur-all") ? "active" : ""}`} style={{ position: "relative" }}>
                            <Link className="nav-link" to="/admin/otorisasipusat-direktur-all">
                              <i className="fas fa-th-list"></i> <span className="menu-text">Semua BU</span>
                              {jumlahProposalPSTDirektur > 0 && (
                                <div
                                  style={{
                                                    position: "absolute",
                                                    top: "6px",
                                                    left: "1px",
                                                    background: "red",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "18px",
                                                    height: "18px",
                                                    fontSize: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    zIndex: 2,
                                                  }}
                                >
                                  {jumlahProposalPSTDirektur}
                                </div>
                              )}
                            </Link>
                          </li>

                          <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/eurekalogistics") ? "active" : ""}`}>
                            <Link className="nav-link" to="/admin/otorisasipusat-direktur/eurekalogistics">
                              <i className="fas fa-th-list"></i> <span className="menu-text">Eureka Logistics</span>
                              {jumlahEurekaLogistics > 0 && (
                                <div
                                  style={{
                                                    position: "absolute",
                                                    top: "6px",
                                                    left: "1px",
                                                    background: "red",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "18px",
                                                    height: "18px",
                                                    fontSize: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    zIndex: 2,
                                                  }}
                                >
                                  {jumlahEurekaLogistics}
                                </div>
                              )}
                            </Link>
                          </li>

                          <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/eurekabookhouse") ? "active" : ""}`}>
                            <Link className="nav-link" to="/admin/otorisasipusat-direktur/eurekabookhouse">
                              <i className="fas fa-th-list"></i> <span className="menu-text">Eureka Bookhouse</span>
                              {jumlahEurekaBookhouse > 0 && (
                                <div
                                  style={{
                                                    position: "absolute",
                                                    top: "6px",
                                                    left: "1px",
                                                    background: "red",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "18px",
                                                    height: "18px",
                                                    fontSize: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    zIndex: 2,
                                                  }}
                                >
                                  {jumlahEurekaBookhouse}
                                </div>
                              )}
                            </Link>
                          </li>

                          <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/rajacepat") ? "active" : ""}`}>
                            <Link className="nav-link" to="/admin/otorisasipusat-direktur/rajacepat">
                              <i className="fas fa-th-list"></i> <span className="menu-text">Raja Cepat</span>
                              {jumlahRajaCepat > 0 && (
                                <div
                                  style={{
                                                    position: "absolute",
                                                    top: "6px",
                                                    left: "1px",
                                                    background: "red",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "18px",
                                                    height: "18px",
                                                    fontSize: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    zIndex: 2,
                                                  }}
                                >
                                  {jumlahRajaCepat}
                                </div>
                              )}
                            </Link>
                          </li>

                          <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/masterdiskon") ? "active" : ""}`}>
                            <Link className="nav-link" to="/admin/otorisasipusat-direktur/masterdiskon">
                              <i className="fas fa-th-list"></i> <span className="menu-text">Master Diskon</span>
                              {jumlahMasterDiskon > 0 && (
                                <div
                                  style={{
                                                    position: "absolute",
                                                    top: "6px",
                                                    left: "1px",
                                                    background: "red",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "18px",
                                                    height: "18px",
                                                    fontSize: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    zIndex: 2,
                                                  }}
                                >
                                  {jumlahMasterDiskon}
                                </div>
                              )}
                            </Link>
                          </li>

                          <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/katarasa") ? "active" : ""}`}>
                            <Link className="nav-link" to="/admin/otorisasipusat-direktur/katarasa">
                              <i className="fas fa-th-list"></i> <span className="menu-text">Kata Rasa</span>
                              {jumlahKataRasa > 0 && (
                                <div
                                  style={{
                                                    position: "absolute",
                                                    top: "6px",
                                                    left: "1px",
                                                    background: "red",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "18px",
                                                    height: "18px",
                                                    fontSize: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    zIndex: 2,
                                                  }}
                                >
                                  {jumlahKataRasa}
                                </div>
                              )}
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  )}
                <li className={`nav-item ${isActive("/admin/proposalreport") ? "active" : ""}`}>
                  <Link className="nav-link" to="/admin/proposalreport">
                    <i className="fas fa-file"></i> <span className="menu-text">Proposal Report</span>
                  </Link>
                </li>

                {hasAccess(["admin", "kontrol", "kontrol cabang", "otoritor cabang", "otoritor"]) && (
                  <>
                    {/* LAIN-LAIN admin, kontrol, kontrol cabang */}
                    <li className="nav-item">
                      <span
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => setLainLain(!lainLain)}
                      >
                        <i className="fas fa-cogs"></i> <span className="menu-text">Lain-lain</span>
                      </span>

                      {lainLain && (
                        <ul className="navbar-nav flex-column ms-3">
                         {hasAccess(["admin","otoritor cabang"]) && (
                            <li className={`nav-item ${isActive("/admin/otorisasicabang") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/otorisasicabang">
                                <i className="fas fa-wrench"></i> <span className="menu-text">Otorisasi Cabang</span>
                              </Link>
                            </li>
                          )}
                          {hasAccess(["admin", "otoritor"]) && (
                            <li className={`nav-item ${isActive("/admin/updateanggaran") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/updateanggaran">
                                <i className="fas fa-fw fa-edit"></i> <span className="menu-text">Update Anggaran</span>
                              </Link>
                            </li>
                          )}

                          {hasAccess(["admin", "kontrol", "otoritor", "kontrol cabang", "otoritor cabang"]) && (
                            <li className={`nav-item ${isActive("/admin/reportkpi") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/reportkpi">
                                <i className="fas fa-file"></i> <span className="menu-text">Report KPI</span>
                              </Link>
                            </li>
                          )}

                          {hasAccess(["admin", "kontrol"]) && (
                            <li className={`nav-item ${isActive("/admin/reporttocabang") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/reporttocabang">
                                <i className="fas fa-file"></i> <span className="menu-text">Report To Cabang</span>
                              </Link>
                            </li>
                          )}

                          {hasAccess(["admin", "kontrol", "kontrol cabang"]) && (
                            <li className={`nav-item ${isActive("/admin/otorisationnotcompleted") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/otorisationnotcompleted">
                                <i className="fas fa-file"></i> <span className="menu-text">Otorisation Not Complete</span>
                              </Link>
                            </li>
                          )}

                          {hasAccess(["admin", "kontrol", "kontrol cabang"]) && (
                            <li className={`nav-item ${isActive("/admin/otorisationpending") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/otorisationpending">
                                <i className="fas fa-file"></i> <span className="menu-text">Otorisation Pending</span>
                              </Link>
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  </>
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
