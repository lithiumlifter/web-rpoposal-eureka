import React, { useEffect, useRef, useState } from 'react';

const ImagePreviewModal = ({ isOpen, onClose, images, activeIndex, setActiveIndex }) => {
  const imgRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((prev) => Math.max(1, prev + delta));
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setDragging(false);

  const handlePrev = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: 9999,
        overflowY: 'auto',
        overflowX: 'hidden',
        userSelect: 'none',
        cursor: dragging ? 'grabbing' : scale > 1 ? 'grab' : 'default',
      }}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onClose}
    >
      {/* HEADER */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#0033cc',
          color: 'white',
          width: '100%',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          zIndex: 10001,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
          Web Proposal - Dokumen Lampiran
        </div>

        <button
          onClick={onClose}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 10px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>

      {/* IMAGE */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          ref={imgRef}
          src={images[activeIndex].link}
          alt={`lampiran-${activeIndex}`}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={handleMouseDown}
          style={{
            width: '100vw',
            height: 'auto',
            objectFit: 'contain',
            maxWidth: '100vw',
            maxHeight: 'none',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: dragging ? 'none' : 'transform 0.2s ease',
          }}
        />
      </div>

      {/* PREV BUTTON */}
      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '16px',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '100px',
          border: 'none',
          color: '#fff',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ❮
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        style={{
          position: 'fixed',
          top: '50%',
          right: '16px',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '100px',
          border: 'none',
          color: '#fff',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ❯
      </button>

      {/* Spacer Bawah */}
      <div style={{ height: '10vh' }}></div>
    </div>
  );
};

export default ImagePreviewModal;



