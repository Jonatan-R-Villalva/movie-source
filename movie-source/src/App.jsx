import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: 'Loading movies' });
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async (searchKey) =>{
    const type = searchKey ? 'search' : 'discover';
    const {data: {results},
  } = await axios.get(`${apiUrl}/${type}/movie`,{
    params:{
      api_key : apiKey,
      query: searchKey
    }
  });
  setMovies(results);
  setMovie(results[0]);
  if(results.length){
    await fetchMovie(results[0].id)
  }
}

const fetchMovie = async(id)=>{
  const {data} = await axios.get(`${apiUrl}/movie/${id}`,{
    params:{
      api_key: apiKey,
      append_to_response: "videos",
    }
  })

  if(data.videos && data.videos.results){
    const trailer = data.videos.results.find(
      (vid)=> vid.name === 'Official Trailer'
    );
    setTrailer(trailer ? trailer : data.videos.results[0])
  }
  setMovie(data)
}

const selectMovie = async(movie)=>{
  fetchMovie(movie.id);
  setMovie(movie);
  window.scrollTo(0,0)
}

const searchMovies = (e)=>{
  e.preventDefault();
  fetchMovies(searchKey)
}

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <Navbar setSearchKey={setSearchKey} searchMovies={searchMovies} />
      <MovieDetails movie={movie} trailer={trailer} playing={playing} setPlaying={setPlaying} />
      <MovieList movies={movies} selectMovie={selectMovie} />
    </div>
  );
}

export default App;
