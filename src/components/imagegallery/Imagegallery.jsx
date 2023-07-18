import PropTypes from 'prop-types';
import ImageGalleryItem from '../imagegalleryitem/Imagegalleryitem';
import css from './imagegallery.module.css';

const ImageGallery = ({ dataPosts, mouse }) => {
  return (
    <ul className={css.imageGallery}>
      {dataPosts.map(post => {
        return (
          <ImageGalleryItem
            largeFormat={post.largeImageURL}
            mouse={mouse}
            key={post.id}
            webformat={post.webformatURL}
            alt={post.tags}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  dataPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
