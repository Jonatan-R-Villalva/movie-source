import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './App.css';


function App() {
  const apiUrl = import.meta.env.API_URL;
  const apiKey = import.meta.env.API_KEY;
  const imagePath = import.meta.env.IMAGE_PATH;
  const IMAGE_URL = import.meta.env.IMAGE_URL;

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
  })
}
  return (
    <div className='App'>

    </div>
  )
}
export default App;
