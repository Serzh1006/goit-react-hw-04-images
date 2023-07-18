import PropTypes from 'prop-types';
import css from './imagegalleryitem.module.css';

const ImageGalleryItem = ({ webformat, alt, mouse, largeFormat }) => {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => mouse(largeFormat, alt)}
    >
      <img className={css.imageGalleryItemImage} src={webformat} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformat: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeFormat: PropTypes.string.isRequired,
  mouse: PropTypes.func.isRequired,
};
