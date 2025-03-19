import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
  
    // Fungsi untuk logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Hapus token dari localStorage
        setIsModalOpen(false); // Tutup modal
        navigate("/"); // Redirect ke halaman login
    };

    return(
        <div className="dashboard-header">
            <nav className="navbar navbar-expand-lg bg-white fixed-top">
                <a className="navbar-brand" href="#">
                <img src="../../../public/images/logo-eurekalogistics.png" alt style={{width: 100}} />
                </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto navbar-right-top">
                        <li className="nav-item dropdown nav-user d-flex align-items-center">
                            <a className="nav-link nav-user-img d-flex align-items-center" href="#" id="navbarDropdownMenuLink2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="../../images/avatar-1.jpg" alt className="user-avatar-md rounded-circle" />
                                <span className="ms-2">P1362</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" 
                                aria-labelledby="navbarDropdownMenuLink2" 
                                style={{ left: '-20px' }}>
                                {/* <div className="nav-user-info">
                                    <h5 className="mb-0 text-white nav-user-name">
                                        John Abraham
                                    </h5>
                                </div> */}
                                <Link className="dropdown-item" to="/admin/ubahpassword">
                                    <i className="fas fa-cog mr-2" />Ubah Password
                                </Link>
                                <button className="dropdown-item" onClick={() => setIsModalOpen(true)}>
                                    <i className="fas fa-power-off mr-2" /> Logout
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* Modal Konfirmasi */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleLogout}
                title="Logout Confirmation"
                message="Are you sure you want to log out?"
                confirmText="Logout"
                cancelText="Cancel"
                theme="danger"
            />
        </div>
    );
}

export default Navbar;