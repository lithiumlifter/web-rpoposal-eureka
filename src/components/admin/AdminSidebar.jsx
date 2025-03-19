import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return(
        <div className="nav-left-sidebar sidebar-dark">
            <div className="menu-list">
                <nav className="navbar navbar-expand-lg navbar-light">
                    {/* <a className="d-xl-none d-lg-none" href="#">Dashboard</a> */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav flex-column">
                        <li className="nav-divider">Modul</li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                                <i className="fas fa-fw fa-home" aria-hidden="true"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/inputproposal">
                                <i className="fas fa-fw fa-comment-alt" />Input Proposal Baru
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/inboxpusat">
                                <i className="fas fa-fw fa-inbox" />Inbox Pusat
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/updatestatuspst">
                                <i className="fas fa-fw fa-edit" />Update Status Pst
                            </Link>
                        </li> 
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/updateanggaran">
                                <i className="fas fa-fw fa-edit" ></i> Update Anggaran
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/inboxcabang">
                            <i className="fas fa-fw fa-inbox" />Inbox Cabang
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/updatestatuscabang">
                                <i className="fas fa-fw fa-edit" />Update Status Cabang
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/axdimension">
                                <i className="fas fa-fw fa-folder" ></i> [Ax]Dimension
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/axcustomer">
                                <i className="fas fa-fw fa-folder" ></i> [Ax]Customer
                            </Link>
                        </li>
                        {/* <li class="nav-divider">
                            Master
                        </li> */}
                        <li className="nav-item ">
                            <a className="nav-link active" href="#" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#submenu-1" aria-controls="submenu-1"><i className="fa fa-fw fa-fw fa-wrench" />Master <span className="badge badge-success">6</span></a>
                            <div id="submenu-1" className="collapse submenu" style={{}}>
                            <ul className="nav flex-column">
                            <li className="nav-item">
                            <Link className="nav-link" to="/admin/otorisasicabang">
                                <i className="fas fa-fw fa-sign-out-alt" />Otorisasi Cabang
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/levelotorisasi">
                                    <i className="fas fa-fw fa-sliders-h" />Level Otorisasi
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/registrasiuser">
                                    <i className="fas fa-fw fa-user" />Registrasi User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/setupuser">
                                <i className="fas fa-fw fa-wrench" />Setup User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/validasiotorisasi">
                                    <i className="fas fa-fw fa-wrench" />Validasi Otorisasi
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/rubahruanglingkup">
                                    <i className="fas fa-fw fa-wrench" />Rubah RuangLingkup
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/otorisasipusat">
                                    <i className="fas fa-fw fa-edit" />Otorisasi Pst
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/otorisasibandingpst">
                                    <i className="fas fa-fw fa-edit" />*Otorisasi Banding Pst
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/proposalreport">
                                    <i className="fas fa-fw fas fa-file-alt" />Proposal Report
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/reportbanding">
                                    <i className="fas fa-fw fas fa-file-alt" />Report Banding
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/reporttocabang">
                                    <i className="fas fa-fw fas fa-file-alt" />Report to Cabang
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/reporttogh">
                                    <i className="fas fa-fw fas fa-file-alt" />Report to GH
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/otorisationnotcompleted">
                                    <i className="fas fa-fw fas fa-file-alt" />Otorisation Not Completed
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/otorisationpending">
                                    <i className="fas fa-fw fas fa-file-alt" />Otorisation Pending
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/reportkpi">
                                    <i className="fas fa-fw fas fa-file-alt" />Report KPI
                                </Link>
                            </li>
                            </ul>
                        </div>
                        </li>
                        
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;