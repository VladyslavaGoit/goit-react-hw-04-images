import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, children }) => {
  const handleEscape = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });
  const handleBackDrop = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div onClick={handleBackDrop} className="overlay">
      <div className="modal">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
