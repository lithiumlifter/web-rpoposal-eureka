import React, { useState } from "react";
import Modal from "react-modal";

const ImagePreviewModal = ({ isOpen, onClose, images = [], activeIndex = 0, setActiveIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Slideshow"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
        },
        content: {
          inset: '0',
          padding: '0',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '8%',
          right: '20px',
          zIndex: 1001,
          background: 'transparent',
          color: 'white',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
        }}
      >
        <i className="fas fa-x" style={{ backgroundColor: "blue", padding: "10px", borderRadius: "50%" }}></i>
      </button>

      {images.length > 0 && (
        <div style={{ textAlign: 'center', overflow: 'hidden' }}>
          <img
            src={images[activeIndex].link}
            alt={`Image ${activeIndex + 1}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{
              maxWidth: '90%',
              maxHeight: '80vh',
              objectFit: 'contain',
              transition: 'transform 0.3s ease, transform-origin 0.3s ease',
              transform: isHovered ? 'scale(2)' : 'scale(1)',
              transformOrigin: `${position.x}% ${position.y}%`,
              cursor: isHovered ? 'zoom-in' : 'default',
            }}
          />
          <div style={{ marginTop: '20px' }}>
            <button onClick={prevImage} className="btn btn-light me-2">⏮ Sebelumnya</button>
            <button onClick={nextImage} className="btn btn-light">⏭ Selanjutnya</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImagePreviewModal;
