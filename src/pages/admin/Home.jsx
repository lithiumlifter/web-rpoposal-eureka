const Home = () => {
  return (
      <>
      {/* <div>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Delete Item
            </button>
            <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-danger text-white">
                    <h5 className="modal-title" id="deleteModalLabel">Konfirmasi</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                    <p className="mb-0">Are you sure you want to delete this item? This action cannot be undone.</p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" id="confirmDelete">Delete</button>
                    </div>
                </div>
                </div>
            </div>
            </div> */}

          <div className="container">
              <div className="mt-4">
                  <h4>Eureka Bookhouse</h4>
                  <div className="row justify-content-evenly">
                      {Array(4).fill().map((_, index) => (
                          <div key={index} className="col-md-3 col-sm-6 mb-3">
                              <div className="card">
                                  <img src="../../../public/images/masdis_jan_24_0.jpeg" className="card-img" alt="Couple Deals" />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              <div>
                  <h4>Master Diskon</h4>
                  <div className="row justify-content-around">
                      {Array(4).fill().map((_, index) => (
                          <div key={index} className="col-md-3 col-sm-6 mb-3">
                              <div className="card">
                                  <img src="../../../public/images/masdis_jan_24_0.jpeg" className="card-img" alt="Kiddies Fun Class" />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              <div>
                  <h4>Kata & Rasa</h4>
                  <div className="row justify-content-around">
                      {Array(4).fill().map((_, index) => (
                          <div key={index} className="col-md-3 col-sm-6 mb-3">
                              <div className="card">
                                  <img src="../../../public/images/masdis_jan_24_0.jpeg" className="card-img" alt="Pink's Day Discount" />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </>
  );
};

export default Home;
