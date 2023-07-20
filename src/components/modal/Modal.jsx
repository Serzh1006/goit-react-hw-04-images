import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const Modal = ({ url, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const clickOnBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={clickOnBackdrop}>
      <div className={css.modal}>
        <img src={url} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
