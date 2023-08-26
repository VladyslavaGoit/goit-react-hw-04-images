import Modal from 'components/Modal/Modal';
import { useState } from 'react';

const ImageGalleryItem = ({ miniUrl, largeUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickModal = () => {
    setShowModal(prev => !prev);
  };
  return (
    <>
      <li
        data-url={largeUrl}
        onClick={handleClickModal}
        className="galleryItem"
      >
        <img className="galleryItem-image" src={miniUrl} alt="" />
      </li>
      {showModal && (
        <Modal closeModal={handleClickModal}>
          <img src={largeUrl} alt="" />
        </Modal>
      )}
    </>
  );
};

export default ImageGalleryItem;
