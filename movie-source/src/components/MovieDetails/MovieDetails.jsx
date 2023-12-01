import React from 'react';
import YouTube from 'react-youtube';

const MovieDetails = ({ movie, trailer, playing, setPlaying }) => {
    const imagePath = import.meta.env.VITE_IMAGE_PATH;
  return (
    <div
      className="viewtrailer"
      style={{
        backgroundImage: `url('${imagePath}${movie.backdrop_path}')`,
      }}
    >
      {playing ? (
        <>
          <YouTube
            videoId={trailer.key}
            className="reproductor container"
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                controls: 0,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
          />
          <button onClick={() => setPlaying(false)} className="boton">
            Close
          </button>
        </>
      ) : (
        <div className="container">
          <div>
            {trailer ? (
              <button className="boton" onClick={() => setPlaying(true)} type="button">
                Play Trailer
              </button>
            ) : (
              'Sorry, no trailer available'
            )}
            <h1 className="text-white">{movie.title}</h1>
            <p className="text-white">{movie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
