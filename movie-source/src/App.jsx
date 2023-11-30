import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './App.css';


function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const imagePath = import.meta.env.VITE_IMAGE_PATH;
  const imageUrl = import.meta.env.VITE_IMAGE_URL;

  //variables de estado

  const [ movies , setMovies ] = useState([]);
  const [ searchKey , setSearchKey ] = useState('');
  const [ trailer , setTrailer ] = useState(null);
  const [ movie , setMovie ] = useState({title : 'Loading movies'});
  const [ playing , setPlaying ] = useState(false);

  //fn para realizar peticion GET a API

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
}

const searchMovies = (e)=>{
  e.preventDefault();
  fetchMovies(searchKey)
}

useEffect(() => {
  fetchMovies()
}, [])

  return (
    <div className='App'>
      <h2 className='text-center mt-5 mb-5'>Trailer movies</h2>
      <form className='container mb-4' onSubmit={searchMovies}>
        <input type="text" placeholder='Search' onChange={(e)=>setSearchKey(e.target.value)}/>
        <button className='btn btn-primary'>Search</button>
      </form>
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie)=>(
            <div key={movie.id} className='col-md-4 mb-3'>
              <img src={`${imageUrl + movie.poster_path}`} alt="" width='100%' height={600}/>
              <h4 className='text-center'>{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default App;
