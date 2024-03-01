import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearchText } from '../shared/store/modules/search';

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSearchText(search));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">검색</label>
      <input type="text" value={search} onChange={handleSearch} />
      <button>검색</button>
    </form>
  );
};

export default Search;
