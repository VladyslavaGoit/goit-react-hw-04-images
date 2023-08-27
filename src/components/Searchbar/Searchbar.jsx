import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChangeName = evt => setSearchName(evt.target.value);

  const handleSubmitForm = evt => {
    evt.preventDefault();
    if (!searchName.trim()) {
      Notify.warning('Enter a request please');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className="searchbar">
      <form onSubmit={handleSubmitForm} className="searchForm">
        <button type="submit" className="searchForm-button">
          <span className="searchForm-button-label">Search</span>
        </button>

        <input
          className="searchForm-input"
          onChange={handleChangeName}
          value={searchName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
