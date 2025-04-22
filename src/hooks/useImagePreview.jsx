import { useState } from "react";

const useImagePreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    setIsModalOpen,
    activeIndex,
    setActiveIndex,
    openModal,
    closeModal,
  };
};

export default useImagePreview;
