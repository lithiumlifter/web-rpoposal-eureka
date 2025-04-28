// import React, { useState } from "react";
// import Modal from "react-modal";

// const ImagePreviewModal = ({ isOpen, onClose, images = [], activeIndex = 0, setActiveIndex }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [position, setPosition] = useState({ x: 50, y: 50 });

//   const nextImage = () => {
//     setActiveIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setPosition({ x, y });
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Image Slideshow"
//       style={{
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.8)',
//           zIndex: 1000,
//         },
//         content: {
//           inset: '0',
//           padding: '0',
//           background: 'transparent',
//           border: 'none',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//       }}
//     >
//       <button
//         onClick={onClose}
//         style={{
//           position: 'fixed',
//           top: '8%',
//           right: '20px',
//           zIndex: 1001,
//           background: 'transparent',
//           color: 'white',
//           border: 'none',
//           fontSize: '28px',
//           cursor: 'pointer',
//         }}
//       >
//         <i className="fas fa-x" style={{ backgroundColor: "blue", padding: "10px", borderRadius: "40%" }}></i>
//       </button>

//       {images.length > 0 && (
//       <div style={{ textAlign: 'center', overflow: 'hidden' }}>
//         <img
//           src={images[activeIndex].link}
//           alt={`Image ${activeIndex + 1}`}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           onMouseMove={handleMouseMove}
//           style={{
//             height: '70vh',
//             maxHeight: '70vh',
//             objectFit: 'contain',
//             transition: 'transform 0.3s ease, transform-origin 0.3s ease',
//             transform: isHovered ? 'scale(2)' : 'scale(1)',
//             transformOrigin: `${position.x}% ${position.y}%`,
//             cursor: isHovered ? 'zoom-in' : 'default',
//           }}
//         />

//     {/* Tambahin pagination di sini */}
//     <div style={{ color: 'white', marginTop: '5px', fontSize: '18px', fontWeight: 'bold' }}>
//       {activeIndex + 1} / {images.length}
//     </div>

//     <div style={{ marginTop: '5px' }}>
//       <button onClick={prevImage} className="btn btn-light me-2">⏮ Sebelumnya</button>
//       <button onClick={nextImage} className="btn btn-light">⏭ Selanjutnya</button>
//     </div>
//   </div>
// )}

//     </Modal>
//   );
// };

// export default ImagePreviewModal;

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
          flexDirection: 'column',
          marginTop:'4%'
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
        <i className="fas fa-x" style={{ backgroundColor: "blue", padding: "10px", borderRadius: "40%" }}></i>
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
              height: '75vh',
              maxHeight: '75vh',
              objectFit: 'contain',
              transition: 'transform 0.3s ease, transform-origin 0.3s ease',
              transform: isHovered ? 'scale(2)' : 'scale(1)',
              transformOrigin: `${position.x}% ${position.y}%`,
              cursor: isHovered ? 'zoom-in' : 'default',
            }}
          />

          {/* Pagination teks */}
          <div style={{ color: 'white', marginTop: '5px', fontSize: '18px', fontWeight: 'bold' }}>
            {activeIndex + 1} / {images.length}
          </div>

          {/* Mini preview gallery dengan tombol panah */}
          <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <button onClick={prevImage} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
              &#8592;
            </button>

            <div style={{ display: 'flex', gap: '5px', overflowX: 'auto', maxWidth: '300px' }}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.link}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    border: idx === activeIndex ? '2px solid white' : '1px solid gray',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            <button onClick={nextImage} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
              &#8594;
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImagePreviewModal;
