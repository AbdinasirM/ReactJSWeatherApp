import React, { useRef } from "react";

const SearchInput = ({ placeholder, onClick }) => {
  const inputRef = useRef();

  // Inside your SearchInput component or where you handle the click event
  const handleClick = () => {
    if (onClick) {
      onClick(inputRef.current.value);
    }
  };

  return (
    <div className="input-group input-group-lg mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        id="searchInput" // Add the id attribute here
        ref={inputRef} // Attach the ref to the input element
      />
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={handleClick}
      >
        <i className="fas fa-search fa-fw primary" ></i>Search
      </button>
    </div>
  );
};

export default SearchInput;
