import { useState } from "react";

const useModal = (): [boolean, () => void, () => void] => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return [isModalOpen, openModal, closeModal];
};

export default useModal;
