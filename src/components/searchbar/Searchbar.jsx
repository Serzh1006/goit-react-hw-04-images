import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { GrFormSearch } from 'react-icons/gr';
import css from './searchbar.module.css';

const messageObj = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const onSubmitForm = e => {
    e.preventDefault();
    if (searchValue === '') {
      toast.warning('Enter text for search', messageObj);
      return;
    }
    onSubmit(searchValue.trim());
    setSearchValue('');
  };

  const getValue = e => {
    setSearchValue(e.target.value);
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmitForm} className={css.searchForm}>
        <button type="submit" className={css.searchFormButton}>
          <GrFormSearch className={css.reactIcons} />
        </button>

        <input
          name="searchValue"
          value={searchValue}
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={getValue}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
