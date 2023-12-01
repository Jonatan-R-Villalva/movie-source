import React from 'react';

const Navbar = ({ setSearchKey, searchMovies }) => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <div className="mt-2">
          <a className="navbar-brand fs-5">Movie Source</a>
        </div>
        <form className="d-flex" role="search" onSubmit={searchMovies}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
