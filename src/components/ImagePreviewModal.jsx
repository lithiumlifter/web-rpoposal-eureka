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
//           flexDirection: 'column',
//           marginTop:'4%'
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
//         <i className="fas fa-x" style={{ backgroundColor: "red", padding: "10px", borderRadius: "" }}></i>
//       </button>

//       {images.length > 0 && (
//         <div style={{ textAlign: 'center', overflow: 'hidden' }}>
//           <img
//             src={images[activeIndex].link}
//             alt={`Image ${activeIndex + 1}`}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             onMouseMove={handleMouseMove}
//             style={{
//               height: '75vh',
//               maxHeight: '75vh',
//               objectFit: 'contain',
//               transition: 'transform 0.3s ease, transform-origin 0.3s ease',
//               transform: isHovered ? 'scale(2)' : 'scale(1)',
//               transformOrigin: `${position.x}% ${position.y}%`,
//               cursor: isHovered ? 'zoom-in' : 'default',
//             }}
//           />

//           {/* Pagination teks */}
//           <div style={{ color: 'white', marginTop: '5px', fontSize: '18px', fontWeight: 'bold' }}>
//             {activeIndex + 1} / {images.length}
//           </div>

//           {/* Mini preview gallery dengan tombol panah */}
//           <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
//             <button onClick={prevImage} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
//               &#8592;
//             </button>

//             <div style={{ display: 'flex', gap: '5px', overflowX: 'auto', maxWidth: '300px' }}>
//               {images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img.link}
//                   alt={`Thumbnail ${idx + 1}`}
//                   onClick={() => setActiveIndex(idx)}
//                   style={{
//                     width: '50px',
//                     height: '50px',
//                     objectFit: 'cover',
//                     border: idx === activeIndex ? '2px solid white' : '1px solid gray',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                   }}
//                 />
//               ))}
//             </div>

//             <button onClick={nextImage} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
//               &#8594;
//             </button>
//           </div>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default ImagePreviewModal;

// import React, { useState } from "react";
// import Modal from "react-modal";

// const ImagePreviewModal = ({ isOpen, onClose, images = [], activeIndex = 0, setActiveIndex }) => {
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [position, setPosition] = useState({ x: 50, y: 50 });

//   const nextImage = () => {
//     setActiveIndex((prev) => (prev + 1) % images.length);
//     setIsZoomed(false); // reset zoom on image change
//   };

//   const prevImage = () => {
//     setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
//     setIsZoomed(false); // reset zoom on image change
//   };

//   const handleMouseMove = (e) => {
//     if (!isZoomed) return;
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
//           flexDirection: 'column',
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
//         <i className="fas fa-x" style={{ backgroundColor: "red", padding: "10px" }}></i>
//       </button>

//       {images.length > 0 && (
//         <>
//           {/* Gambar besar dalam container scroll */}
//           <div
//             style={{
//               width: '100%',
//               height: '100%',
//               overflow: 'auto',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <img
//               src={images[activeIndex].link}
//               alt={`Image ${activeIndex + 1}`}
//               onClick={() => setIsZoomed(prev => !prev)}
//               onMouseMove={handleMouseMove}
//              style={{
//                 transform: isZoomed ? 'scale(2)' : 'scale(1)',
//                 transformOrigin: `${position.x}% ${position.y}%`,
//                 cursor: isZoomed ? 'zoom-out' : 'zoom-in',
//                 transition: 'transform 0.3s ease, transform-origin 0.3s ease',
//                 display: 'block',
//                 maxWidth: 'unset',
//                 maxHeight: isZoomed ? 'none' : '75vh', // <- perbaikan di sini
//                 objectFit: isZoomed ? 'contain' : 'contain',
//               }}

//             />
//           </div>

//           {/* Pagination teks (fixed) */}
//           <div style={{
//             position: 'fixed',
//             top: '10px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             zIndex: 1001,
//             color: 'white',
//             fontSize: '18px',
//             fontWeight: 'bold',
//           }}>
//             {activeIndex + 1} / {images.length}
//           </div>

//           {/* Mini preview gallery dan panah navigasi (fixed) */}
//           <div style={{
//             position: 'fixed',
//             bottom: '20px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             zIndex: 1001,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '10px',
//           }}>
//             <button onClick={prevImage} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
//               &#8592;
//             </button>

//             <div style={{
//               display: 'flex',
//               gap: '5px',
//               overflowX: 'auto',
//               maxWidth: '300px',
//             }}>
//               {images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img.link}
//                   alt={`Thumbnail ${idx + 1}`}
//                   onClick={() => {
//                     setActiveIndex(idx);
//                     setIsZoomed(false); // reset zoom
//                   }}
//                   style={{
//                     width: '50px',
//                     height: '50px',
//                     objectFit: 'cover',
//                     border: idx === activeIndex ? '2px solid white' : '1px solid gray',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                   }}
//                 />
//               ))}
//             </div>

//             <button onClick={nextImage} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
//               &#8594;
//             </button>
//           </div>
//         </>
//       )}
//     </Modal>
//   );
// };

// export default ImagePreviewModal;

// import React, { useState, useEffect, useRef } from "react";
// import Modal from "react-modal";

// const ImagePreviewModal = ({ isOpen, onClose, images = [], activeIndex = 0, setActiveIndex }) => {
//   const [zoomScale, setZoomScale] = useState(1);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);
//   const dragStart = useRef({ x: 0, y: 0 });
//   const offsetStart = useRef({ x: 0, y: 0 });

//   const nextImage = () => {
//     setActiveIndex((prev) => (prev + 1) % images.length);
//     resetView();
//   };

//   const prevImage = () => {
//     setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
//     resetView();
//   };

//   const resetView = () => {
//     setZoomScale(1);
//     setOffset({ x: 0, y: 0 });
//   };

//   // const handleWheel = (e) => {
//   //   if (!e.ctrlKey && Math.abs(e.deltaY) < 10) return; // Filter gesture kecil
//   //   e.preventDefault();
//   //   // const delta = e.deltaY < 0 ? 0.1 : -0.1;
//   //   const delta = e.deltaY < 0 ? 0.03 : -0.03;
//   //   setZoomScale((prev) => {
//   //     const newScale = Math.min(Math.max(prev + delta, 1), 5);
//   //     return newScale;
//   //   });
//   // };

//   const handleWheel = (e) => {
//   if (!e.ctrlKey && Math.abs(e.deltaY) < 10) return;
//   e.preventDefault();

//   const zoomSensitivity = 0.001; // semakin kecil, zoom semakin halus
//   const scaledDelta = e.deltaY * zoomSensitivity;

//   setZoomScale(prev => {
//     const newScale = prev - scaledDelta; // scroll up zoom in (deltaY negatif)
//     return Math.min(Math.max(newScale, 1), 5);
//   });
// };


//   const handleMouseDown = (e) => {
//     if (zoomScale <= 1) return;
//     setDragging(true);
//     dragStart.current = { x: e.clientX, y: e.clientY };
//     offsetStart.current = { ...offset };
//   };

//   const handleMouseMove = (e) => {
//     if (!dragging) return;
//     const dx = e.clientX - dragStart.current.x;
//     const dy = e.clientY - dragStart.current.y;
//     setOffset({
//       x: offsetStart.current.x + dx,
//       y: offsetStart.current.y + dy,
//     });
//   };

//   const handleMouseUp = () => setDragging(false);

//   useEffect(() => {
//   if (zoomScale === 1) {
//     setOffset({ x: 0, y: 0 });
//   }
// }, [zoomScale]);

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
//           flexDirection: 'column',
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
//         <i className="fas fa-x" style={{ backgroundColor: "red", padding: "10px" }}></i>
//       </button>

//       {images.length > 0 && (
//         <>
//           <div
//             style={{
//               width: '100%',
//               height: '100%',
//               overflow: 'hidden',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: zoomScale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
//             }}
//             onWheel={handleWheel}
//             onMouseMove={handleMouseMove}
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseLeave={handleMouseUp}
//           >
//             <img
//               src={images[activeIndex].link}
//               alt={`Image ${activeIndex + 1}`}
//               style={{
//                 transform: `scale(${zoomScale}) translate(${offset.x / zoomScale}px, ${offset.y / zoomScale}px)`,
//                 transition: dragging ? 'none' : 'transform 0.2s ease',
//                 maxHeight: zoomScale === 1 ? '75vh' : 'none',
//                 objectFit: 'contain',
//                 userSelect: 'none',
//                 pointerEvents: 'auto',
//               }}
//               draggable={false}
//             />
//           </div>

//           <div style={{
//             position: 'fixed',
//             top: '10px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             zIndex: 1001,
//             color: 'white',
//             fontSize: '18px',
//             fontWeight: 'bold',
//           }}>
//             {activeIndex + 1} / {images.length}
//           </div>

//           <div style={{
//             position: 'fixed',
//             bottom: '20px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             zIndex: 1001,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '10px',
//           }}>
//             <button onClick={prevImage} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
//               &#8592;
//             </button>

//             <div style={{
//               display: 'flex',
//               gap: '5px',
//               overflowX: 'auto',
//               maxWidth: '300px',
//             }}>
//               {images.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img.link}
//                   alt={`Thumbnail ${idx + 1}`}
//                   onClick={() => {
//                     setActiveIndex(idx);
//                     resetView();
//                   }}
//                   style={{
//                     width: '50px',
//                     height: '50px',
//                     objectFit: 'cover',
//                     border: idx === activeIndex ? '2px solid white' : '1px solid gray',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                   }}
//                 />
//               ))}
//             </div>

//             <button onClick={nextImage} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
//               &#8594;
//             </button>
//           </div>
//         </>
//       )}
//     </Modal>
//   );
// };

// export default ImagePreviewModal;


import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";

const ImagePreviewModal = ({
  isOpen,
  onClose,
  images = [],
  activeIndex = 0,
  setActiveIndex,
}) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Fungsi untuk batasi offset berdasarkan ukuran container dan gambar
  const limitOffset = (offset, zoomScale) => {
    if (!containerRef.current || !imgRef.current) return offset;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const imgWidth = imgRef.current.naturalWidth;
    const imgHeight = imgRef.current.naturalHeight;

    // Ukuran gambar yang sudah diskalakan
    const scaledWidth = imgWidth * zoomScale;
    const scaledHeight = imgHeight * zoomScale;

    // Hitung batas offset maksimum (setengah perbedaan ukuran)
    const maxOffsetX = Math.max((scaledWidth - containerWidth) / 2, 0);
    const maxOffsetY = Math.max((scaledHeight - containerHeight) / 2, 0);

    return {
      x: Math.min(Math.max(offset.x, -maxOffsetX), maxOffsetX),
      y: Math.min(Math.max(offset.y, -maxOffsetY), maxOffsetY),
    };
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
    resetView();
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    resetView();
  };

  const resetView = () => {
    setZoomScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    if (!e.ctrlKey && Math.abs(e.deltaY) < 10) return;
    e.preventDefault();
    const zoomStep = 0.02; // zoom pelan
    const delta = e.deltaY < 0 ? zoomStep : -zoomStep;

    setZoomScale((prev) => {
      const newScale = prev + delta;
      if (newScale < 1) return 1;
      if (newScale > 5) return 5;
      return newScale;
    });
  };

  const handleMouseDown = (e) => {
    if (zoomScale <= 1) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    let newOffset = {
      x: offsetStart.current.x + dx,
      y: offsetStart.current.y + dy,
    };

    newOffset = limitOffset(newOffset, zoomScale);
    setOffset(newOffset);
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    // Reset offset saat zoom kembali 1
    if (zoomScale === 1) {
      setOffset({ x: 0, y: 0 });
    } else {
      // juga batasi offset saat zoom berubah
      setOffset((currentOffset) => limitOffset(currentOffset, zoomScale));
    }
  }, [zoomScale]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Slideshow"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1000,
        },
        content: {
          inset: "0",
          padding: "0",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden",
        },
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "8%",
          right: "20px",
          zIndex: 1001,
          background: "transparent",
          color: "white",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
        }}
      >
        <i
          className="fas fa-x"
          style={{ backgroundColor: "red", padding: "10px" }}
        ></i>
      </button>

      {images.length > 0 && (
        <>
          <div
            ref={containerRef}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: zoomScale > 1 ? (dragging ? "grabbing" : "grab") : "default",
              userSelect: "none",
            }}
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imgRef}
              src={images[activeIndex].link}
              alt={`Image ${activeIndex + 1}`}
              style={{
                transform: `scale(${zoomScale}) translate(${offset.x / zoomScale}px, ${
                  offset.y / zoomScale
                }px)`,
                transition: dragging ? "none" : "transform 0.2s ease",
                maxHeight: zoomScale === 1 ? "75vh" : "none",
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "auto",
                maxWidth: "100%",
              }}
              draggable={false}
            />
          </div>

          <div
            style={{
              position: "fixed",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1001,
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {activeIndex + 1} / {images.length}
          </div>

          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1001,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={prevImage}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              &#8592;
            </button>

            <div
              style={{
                display: "flex",
                gap: "5px",
                overflowX: "auto",
                maxWidth: "300px",
              }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.link}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    resetView();
                  }}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    border: idx === activeIndex ? "2px solid white" : "1px solid gray",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextImage}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              &#8594;
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ImagePreviewModal;


