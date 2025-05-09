import React from "react";

const Footer = () => {
    return(
        <div className="footer">
            <div className="container-fluid">
                <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    &copy; 2025 <strong>Eureka Developer</strong>.
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    {/* <div className="text-md-right footer-links d-none d-sm-block">
                    <a href="javascript: void(0);">About</a>
                    <a href="javascript: void(0);">Support</a>
                    <a href="javascript: void(0);">Contact Us</a>
                    </div> */}
                </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;