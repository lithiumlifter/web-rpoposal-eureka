import React, { useEffect, useState } from 'react';
import allDataProposal from '../../services/admin/allDataProposal';
import 'bootstrap/dist/css/bootstrap.min.css';
import useImagePreview from '../../hooks/useImagePreview';
import ImagePreviewModal from '../../components/ImagePreviewModal';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const {
    isModalOpen,
    openModal,
    closeModal,
    activeIndex,
    setActiveIndex,
  } = useImagePreview();

  const images = banners.map((banner) => ({
    link: banner.images,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allDataProposal.getImageHome();
        console.log('Response:', response);
        if (response && response.success && response.data) {
          setBanners(response.data);
        }
      } catch (error) {
        console.error('Error fetching banner images:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        {banners.map((banner, index) => (
          <div className="col-md-4 mb-4" key={banner.id_banner_proposal}>
            <div
              className="position-relative overflow-hidden"
              style={{ height: '200px', cursor: 'pointer' }}
              onClick={() => openModal(index)}
            >
              <img
                src={banner.images}
                className="w-100 h-100"
                alt={banner.name}
                style={{ objectFit: 'cover' }}
              />
              <div
                className="position-absolute bottom-0 start-0 w-100"
                style={{
                  background: '#f48328',
                  opacity: 0.8,
                  color: 'white',
                  padding: '5px 10px',
                }}
              >
                <h5 className="m-0">{banner.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ImagePreviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={images}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
};

export default Home;
