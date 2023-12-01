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
  fetchMovies()
}, [])

  return (
    <div className='App'>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className='mt-2'>
            <img src="../public/logo.svg" alt="logo" width={40} height={30}/>
            <a className="navbar-brand fs-5">Movie Source</a>
          </div>
            <form className="d-flex" role="search" onSubmit={searchMovies}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchKey(e.target.value)}/>
                <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
        </div>
    </nav>

      <div>
        <main>
          {movie ?(
            <div className='viewtrailer'
            style={{
              backgroundImage: `url('${imagePath}${movie.backdrop_path}')` 
              }}
            >
            {
              playing ? (
                <>
                <YouTube
                videoId={trailer.key}
                className='reproductor container'
                opts={{
                  width : "100%",
                  height : "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    cc_load_policy: 0,
                    fs: 0,
                    iv_load_policy: 0,
                    modestbranding: 0,
                    rel: 0,
                    showinfo: 0
                  },
                }}
                />
                <button onClick={()=>setPlaying(false)} className='boton'>
                  Close
                </button>
                </>
              ):(
                <div className='container'>
                  <div>
                    {
                      trailer ? (
                        <button
                        className='boton'
                        onClick={()=> setPlaying(true)}
                        type='button'
                        >
                          play trailer
                        </button>
                      ) : (
                        "Sorry, no trailer available"
                      )
                    }
                    <h1 className='text-white'>{movie.title}</h1>
                    <p className='text-white'>{movie.overview}</p>
                  </div>
                </div>
              )
            }
            </div>
          ): null
          }
        </main>
      </div>

      <div className="container mt-3">
        <div className="row">
          {movies.map((movie)=>(
            <div key={movie.id} className='col-md-4 mb-3' onClick={()=>selectMovie(movie)}>
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
