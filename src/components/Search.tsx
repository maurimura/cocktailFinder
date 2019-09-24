import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDrinks, clear } from "../store/actions";
import Loader from "./Loader";
import { ReactComponent as Close } from "../close.svg";
import { ReactComponent as SearchIcon } from "../search.svg";
import { ReactComponent as Logo } from "../logo.svg";
import "./Search.scss";

interface Search {
  hasContent: boolean;
  isLoading: boolean;
}

const Search: React.FC<Search> = ({ hasContent, isLoading, ...props }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocus] = useState(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = (event: React.SyntheticEvent) => {
    query.length === 0 && setFocus(false);
  };

  const dispatch = useDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    dispatch(fetchDrinks(value));
  };

  const handleClear = (event: React.SyntheticEvent) => {
    dispatch(clear());
    setQuery("");
    setFocus(false);
  };

  return (
    <div
      className={`search-container${
        hasContent || focused ? " top" : " center"
      }`}
    >
      <div className={`logo-wrapper ${(hasContent || focused) ? ' hide' : ''}`}>
        <Logo />
        <p><b>Cocktail</b>Finder</p>
      </div>
      <div className="icon-wrapper start">
        <SearchIcon />
      </div>
      <label className="hidden" htmlFor="search-input" aria-label="Search cocktail">
        Search cocktail
      </label>
      <input
        id="search-input"
        name="search-input"
        className="search-input"
        placeholder="Search your favorite cocktail"
        value={query}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {query.length > 0 && !isLoading && (
        <div className="icon-wrapper end">
          <button onClick={handleClear}>
            <Close />
          </button>
        </div>
      )}
      {hasContent && isLoading && (
        <div className="loader-wrapper">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Search;
