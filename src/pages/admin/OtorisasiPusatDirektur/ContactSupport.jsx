import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactSupport = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Contact Support</h1>
          <p className="text-center text-muted mb-4">
            Have any questions? Please reach out to us through the contact information below.
          </p>

          {/* Contact Information */}
          <div className="mb-4 bg-light p-4 rounded">
            <h5 className="mb-3">Our Office</h5>
            <p className="mb-1">
              <strong>Address:</strong> Jl. H. Baping No.100, RT.6/RW.9, Ciracas, Kec. Ciracas, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13740
            </p>
            <p className="mb-1">
              <strong>Email:</strong> support@eureka-team.com
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> 021 - 8779 6010 (ext. 312)
            </p>
            <p className="mb-1">
              <strong>Fax:</strong> +62 21 8765 4321
            </p>
          </div>

          {/* Static Contact Form */}
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                rows="5"
                className="form-control"
                placeholder="Your message..."
                disabled
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-secondary w-100"
              disabled
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
