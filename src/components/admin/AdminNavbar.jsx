import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";

const Navbar = ({toggleSidebar}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const name = localStorage.getItem("name");
    console.log("Role Pengguna:", name);
  
    // Fungsi untuk logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsModalOpen(false);
        navigate("/");
    };

    return(
       <>
         <div className="dashboard-header">
            <nav className="navbar navbar-expand-lg fixed-top"
                style={{ 
                backgroundImage: 'url("/images/banner-proposal.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: "50px"
            }}
             >
                <button 
                    className="btn ml-3"
                    onClick={toggleSidebar}
                    style={{ backgroundColor: "#f0ad4e" }}
                >
                    <i className="fas fa-bars text-white" />
                </button>
                <a 
                    className="navbar-brand" 
                    href="#" 
                    style={{ 
                        //backgroundColor: "white", 
                        padding: "8px 25px",           
                        marginLeft: "24px",
                        marginTop: "8px",           
                        marginBottom: "8px",     
                        borderRadius: "10px",   
                        display: "flex", 
                        alignItems: "center",
                        gap: "15px"
                    }}
                    >
                    {/* Logo Eureka */}
                    <img 
                        src="../../../public/images/logo-eurekalogistics.png" 
                        alt="Eureka Logistics" 
                        style={{ 
                        width: 100, 
                        height: "auto", 
                        borderRadius: "12px",
                        }} 
                    />
                    
                    {/* Logo Karakter */}
                    <img 
                        src="../../../public/images/karakter.png" 
                        alt="Karakter" 
                        style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: "50%", 
                        objectFit: "cover" 
                        }} 
                    />

                    {/* Teks di sebelah logo */}
                    <span style={{ 
                        marginLeft: "180px",
                        fontWeight: "bold", 
                        fontSize: "16px", 
                        whiteSpace: "nowrap", 
                        color: "white" 
                    }}>
                        Innovation & Collaboration to Reach Solid Victory!
                    </span>
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
                                <img src="../../../public/images/user.png" alt className="user-avatar-md rounded-circle" />
                                <span className="ms-2 text-white">{name}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" 
                                aria-labelledby="navbarDropdownMenuLink2" 
                                style={{ left: '-50%' }}>
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
       </>
    );
}

export default Navbar;