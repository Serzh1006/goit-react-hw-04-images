import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ moreImg }) => {
  return (
    <button className={css.button} onClick={moreImg} type="button">
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  moreImg: PropTypes.func.isRequired,
};
