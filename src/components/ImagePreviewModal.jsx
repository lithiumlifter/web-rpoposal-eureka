import React from "react";
import Modal from "react-modal";

const ImagePreviewModal = ({ isOpen, onClose, images = [], activeIndex = 0, setActiveIndex }) => {
  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Slideshow"
      style={{
        content: {
          inset: '10%',
          padding: '20px',
          background: '#fff',
          borderRadius: '10px',
          textAlign: 'center',
        },
      }}
    >
      <h3>Preview Gambar</h3>
      {images.length > 0 && (
        <div>
          <img
            src={images[activeIndex].link}
            alt={`Image ${activeIndex + 1}`}
            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={prevImage} className="btn btn-secondary me-2">⏮ Sebelumnya</button>
            <button onClick={nextImage} className="btn btn-secondary">⏭ Selanjutnya</button>
          </div>
        </div>
      )}
      <button onClick={onClose} className="btn btn-danger mt-3">Tutup</button>
    </Modal>
  );
};

export default ImagePreviewModal;
