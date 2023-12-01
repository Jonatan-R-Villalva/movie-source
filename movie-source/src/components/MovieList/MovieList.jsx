import React from 'react';

const MovieList = ({ movies, selectMovie }) => {
    const imageUrl = import.meta.env.VITE_IMAGE_URL;
  return (
    <div className="container mt-5">
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-3" onClick={() => selectMovie(movie)}>
            <img src={`${imageUrl + movie.poster_path}`} alt="" width="100%" height={600} />
            <h4 className="text-center">{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
