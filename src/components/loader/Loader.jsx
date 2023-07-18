import { FidgetSpinner } from 'react-loader-spinner';
import css from './loader.module.css';

const Loader = () => {
  return (
    <p className={css.loader}>
      {' '}
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#ff0000', '#00ff00', '#0000ff']}
        backgroundColor="#8c00ff"
      />
    </p>
  );
};

export default Loader;
