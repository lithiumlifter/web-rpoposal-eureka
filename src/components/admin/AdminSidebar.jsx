import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    // <div className={`nav-left-sidebar sidebar-dark ${isOpen ? "expanded" : "collapsed"}`}>
    //   <div className="menu-list">
    //     <nav className="navbar navbar-expand-lg navbar-light">
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarNav"
    //         aria-controls="navbarNav"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon" />
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarNav">
    //         <ul className="navbar-nav flex-column">
    //           {/* <li className="nav-divider">Modul</li> */}
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/admin">
    //               <i className="fas fa-fw fa-home"></i> {isOpen && "Home"}
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/admin/inputproposal">
    //               <i className="fas fa-fw fa-comment-alt"></i> {isOpen && "Input Proposal Baru"} 
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/admin/inboxpusat">
    //               <i className="fas fa-fw fa-inbox"></i> {isOpen && "Inbox Pusat"}
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/admin/updatestatuspst">
    //               <i className="fas fa-fw fa-edit"></i> {isOpen && "Update Status Pst"}
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </nav>
    //   </div>
    // </div>

    // <div className={`nav-left-sidebar sidebar-dark ${isOpen ? "expanded" : "collapsed"}`}>
    //   <div className="menu-list">
    //     <nav className="navbar navbar-expand-lg navbar-light">
    //       <ul className="navbar-nav flex-column">
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/admin">
    //             <i className="fas fa-fw fa-home"></i>
    //             <span className={isOpen ? "show-text" : "hide-text"}>Home</span>
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/admin/inputproposal">
    //             <i className="fas fa-fw fa-comment-alt"></i>
    //             <span className={isOpen ? "show-text" : "hide-text"}>Input Proposal Baru</span>
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/admin/inboxpusat">
    //             <i className="fas fa-fw fa-inbox"></i>
    //             <span className={isOpen ? "show-text" : "hide-text"}>Inbox Pusat</span>
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/admin/updatestatuspst">
    //             <i className="fas fa-fw fa-edit"></i>
    //             <span className={isOpen ? "show-text" : "hide-text"}>Update Status Pst</span>
    //           </Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </div>

    <div
      className={`nav-left-sidebar sidebar-dark ${isOpen || isHovered ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="menu-list">
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                <i className="fas fa-fw fa-home"></i> <span  className="menu-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/inputproposal">
                <i className="fas fa-fw fa-comment-alt"></i> <span  className="menu-text">Input Proposal Baru</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/inboxpusat">
                <i className="fas fa-fw fa-inbox"></i> <span  className="menu-text">Inbox Pusat</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/updatestatuspst">
                <i className="fas fa-fw fa-edit"></i> <span  className="menu-text">Update Status Pst</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/inboxcabang">
                <i className="fas fa-fw fa-inbox"></i> <span  className="menu-text">Inbox Cabang</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/updatestatuscabang">
                <i className="fas fa-fw fa-edit"></i> <span  className="menu-text">Update Status Cabang</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/updateanggaran">
                <i className="fas fa-fw fa-edit"></i> <span  className="menu-text">Update Anggaran</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/updateanggaran">
                <i className="fas fa-fw fa-edit"></i> <span  className="menu-text">Update Anggaran</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
