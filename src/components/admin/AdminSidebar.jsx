import React, { useState, useEffect } from "react";
import { Link, useLocation  } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import proposalServices from "../../services/admin/allDataProposal"

const Sidebar = ({ isOpen, setIsHovered, isHovered  }) => {
    // const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const [masterOpen, setMasterOpen] = useState(false);
    const [otorisasiPusatDirektur, setOtorisasiPusatDirekturOpen] = useState(false);
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
          <div className="menu-list" style={{ backgroundColor: "#046ab4", minHeight: "1150px" }}>
            <nav className="navbar navbar-expand-lg navbar-light">
              <ul className="navbar-nav flex-column">

                <li className={`nav-item ${isActive("/admin") && currentPath === "/admin" ? "active" : ""}`}>
                  <Link className="nav-link" to="/admin">
                    <i className="text-white fas fa-fw fa-home"></i> <span className="menu-text text-white">Home</span>
                  </Link>
                </li>

                <li className={`nav-item ${isActive("/admin/inputproposal") ? "active" : ""}`}>
                  <Link className="nav-link" to="/admin/inputproposal">
                    <i className="text-white fas fa-fw fa-comment-alt"></i> <span className="menu-text text-white">Input Proposal Baru</span>
                  </Link>
                </li>

                {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                  <li className={`nav-item ${isActive("/admin/inboxcabang") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/inboxcabang">
                      <i className="text-white fas fa-fw fa-inbox"></i> <span className="menu-text text-white">Inbox Cabang</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                  <li className={`nav-item ${isActive("/admin/updatestatuscabang") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/updatestatuscabang">
                      <i className="text-white fas fa-fw fa-edit"></i> <span className="menu-text text-white">Update Status Cabang</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol"]) && (
                  <li className={`nav-item ${isActive("/admin/inboxpusat") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/inboxpusat">
                      <i className="text-white fas fa-fw fa-inbox"></i> <span className="menu-text text-white">Inbox Pusat</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin","kontrol"]) && (
                  <li className={`nav-item ${isActive("/admin/updatestatuspusat") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/updatestatuspusat">
                      <i className="text-white fas fa-fw fa-edit"></i> <span className="menu-text text-white">Update Status Pst</span>
                    </Link>
                  </li>
                )}

                {hasAccess(["admin", "otoritor"]) && (
                  <li className={`nav-item ${isActive("/admin/otorisasi-pusat") ? "active" : ""}`}>
                    <Link className="nav-link" to="/admin/otorisasi-pusat">
                      <i className="text-white fas fa-th-list"></i>
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
                      <span className="menu-text text-white">Otorisasi Pusat</span>
                    </Link>
                  </li>
                )}

                {/* Submenu Otorisasi Pusat Direktur VIEW ADMIN*/}
                {hasAccess(["admin"]) && (
                    <li className="nav-item" style={{ position: "relative" }}>
                      <span
                        className="nav-link"
                        style={{ cursor: "pointer", position: "relative" }}
                        onClick={() => setOtorisasiPusatDirekturOpen(!otorisasiPusatDirektur)}
                      >
                        <i className="text-white fas fa-th-list"></i>{" "}
                        <span className="menu-text text-white">Otorisasi Pusat (Direktur)</span>

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

                      {otorisasiPusatDirektur && (
                        <ul className="navbar-nav flex-column ms-3">
                          <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur-all") ? "active" : ""}`} style={{ position: "relative" }}>
                            <Link className="nav-link" to="/admin/otorisasipusat-direktur-all">
                              <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Semua BU</span>
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
                              <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Eureka Logistics</span>
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
                              <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Eureka Bookhouse</span>
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
                              <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Raja Cepat</span>
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
                              <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Master Diskon</span>
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
                              <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Kata Rasa</span>
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

                          <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/jajausahalaku") ? "active" : ""}`}>
                            <Link className="nav-link" to="/admin/otorisasipusat-direktur/jajausahalaku">
                              <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Jaja Usaha Laku</span>
                              {jumlahJajaUsahaLaku > 0 && (
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
                                  {jumlahJajaUsahaLaku}
                                </div>
                              )}
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  )}

                {/* Submenu Otorisasi Pusat Direktur VIEW DIREKTUR*/}
               {hasAccess(["direktur"]) && (
                  <>
                    <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur-all") ? "active" : ""}`} style={{ position: "relative" }}>
                      <Link className="nav-link" to="/admin/otorisasipusat-direktur-all">
                        <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Semua BU</span>
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

                    <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/eurekalogistics") ? "active" : ""}`} style={{ position: "relative" }}>
                      <Link className="nav-link" to="/admin/otorisasipusat-direktur/eurekalogistics">
                        <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Eureka Logistics</span>
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

                    <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/eurekabookhouse") ? "active" : ""}`} style={{ position: "relative" }}>
                      <Link className="nav-link" to="/admin/otorisasipusat-direktur/eurekabookhouse">
                        <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Eureka Bookhouse</span>
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

                    <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/rajacepat") ? "active" : ""}`} style={{ position: "relative" }}>
                      <Link className="nav-link" to="/admin/otorisasipusat-direktur/rajacepat">
                        <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Raja Cepat</span>
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

                    <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/masterdiskon") ? "active" : ""}`} style={{ position: "relative" }}>
                      <Link className="nav-link" to="/admin/otorisasipusat-direktur/masterdiskon">
                        <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Master Diskon</span>
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

                    <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/katarasa") ? "active" : ""}`} style={{ position: "relative" }}>
                      <Link className="nav-link" to="/admin/otorisasipusat-direktur/katarasa">
                        <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Kata Rasa</span>
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

                    <li className={`nav-item ${isActive("/admin/otorisasipusat-direktur/jajausahalaku") ? "active" : ""}`} style={{ position: "relative" }}>
                      <Link className="nav-link" to="/admin/otorisasipusat-direktur/jajausahalaku">
                        <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Jaja Usaha Laku</span>
                        {jumlahJajaUsahaLaku > 0 && (
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
                            {jumlahJajaUsahaLaku}
                          </div>
                        )}
                      </Link>
                    </li>
                  </>
                )}

                <li className={`nav-item ${isActive("/admin/proposalreport") ? "active" : ""}`}>
                  <Link className="nav-link" to="/admin/proposalreport">
                    <i className="text-white fas fa-file"></i> <span className="menu-text text-white">Proposal Report</span>
                  </Link>
                </li>

                <li className={`nav-item ${isActive("/admin/approval-history") ? "active" : ""}`}>
                  <Link className="nav-link" to="/admin/approval-history">
                    <i className="text-white fas fa-history"></i> <span className="menu-text text-white">Approval History</span>
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
                        <i className="text-white fas fa-cogs"></i> <span className="menu-text text-white">Lain-lain</span>
                      </span>

                      {lainLain && (
                        <ul className="navbar-nav flex-column ms-3">
                         {hasAccess(["admin","otoritor cabang"]) && (
                            <li className={`nav-item ${isActive("/admin/otorisasicabang") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/otorisasicabang">
                                <i className="text-white fas fa-wrench"></i> <span className="menu-text text-white">Otorisasi Cabang</span>
                              </Link>
                            </li>
                          )}
                          {hasAccess(["admin", "otoritor"]) && (
                            <li className={`nav-item ${isActive("/admin/updateanggaran") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/updateanggaran">
                                <i className="text-white fas fa-fw fa-edit"></i> <span className="menu-text text-white">Update Anggaran</span>
                              </Link>
                            </li>
                          )}

                          {hasAccess(["admin", "kontrol", "otoritor", "kontrol cabang", "otoritor cabang"]) && (
                            <li className={`nav-item ${isActive("/admin/reportkpi") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/reportkpi">
                                <i className="text-white fas fa-file"></i> <span className="menu-text text-white">Report KPI</span>
                              </Link>
                            </li>
                          )}

                          {hasAccess(["admin", "kontrol"]) && (
                            <li className={`nav-item ${isActive("/admin/reporttocabang") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/reporttocabang">
                                <i className="text-white fas fa-file"></i> <span className="menu-text text-white">Report To Cabang</span>
                              </Link>
                            </li>
                          )}

                          {hasAccess(["admin", "kontrol", "kontrol cabang"]) && (
                            <li className={`nav-item ${isActive("/admin/otorisationnotcompleted") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/otorisationnotcompleted">
                                <i className="text-white fas fa-file"></i> <span className="menu-text text-white">Otorisation Not Complete</span>
                              </Link>
                            </li>
                          )}

                          {hasAccess(["admin", "kontrol", "kontrol cabang"]) && (
                            <li className={`nav-item ${isActive("/admin/otorisationpending") ? "active" : ""}`}>
                              <Link className="nav-link" to="/admin/otorisationpending">
                                <i className="text-white fas fa-file"></i> <span className="menu-text text-white">Otorisation Pending</span>
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
                    <i className="text-white fas fa-cogs"></i> <span className="menu-text text-white">User Management</span>
                    {/* <i className={`text-white fas fa-chevron-${masterOpen ? "down" : "right"} float-end`} style={{ float: "right" }}></i> */}
                  </span>
                  {masterOpen && (
                    <ul className="navbar-nav flex-column ms-3">
                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/levelotorisasi") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/levelotorisasi">
                            <i className="text-white fas fa-th-list"></i> <span className="menu-text text-white">Level Otorisasi</span>
                          </Link>
                        </li>
                      )}

                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/setupuser") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/setupuser">
                            <i className="text-white fas fa-wrench"></i> <span className="menu-text text-white">Setup User</span>
                          </Link>
                        </li>
                      )}

                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/registrasiuser") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/registrasiuser">
                            <i className="text-white fas fa-wrench"></i> <span className="menu-text text-white">Registrasi User</span>
                          </Link>
                        </li>
                      )}

                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/validasiotorisasi") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/validasiotorisasi">
                            <i className="text-white fas fa-wrench"></i> <span className="menu-text text-white">Validasi Otorisasi</span>
                          </Link>
                        </li>
                      )}

                      {hasAccess(["admin","kontrol","kontrol cabang"]) && (
                        <li className={`nav-item ${isActive("/admin/rubahruanglingkup") ? "active" : ""}`}>
                          <Link className="nav-link" to="/admin/rubahruanglingkup">
                            <i className="text-white fas fa-wrench"></i> <span className="menu-text text-white">Rubah Ruang Lingkup</span>
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
