import React, { useState } from 'react';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const MovieCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  const fetchTrailer = async () => {
    try {
      const endpoint = `${API_BASE_URL}/movie/${movie.id}/videos`;
      const res = await fetch(endpoint, API_OPTIONS);
      const data = await res.json();

      const trailer = data.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert('No trailer available for this movie.');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  return (
    <>
      <li className="movie-card" onClick={fetchTrailer}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <div className="content">
          <span className="rating">
            <img src="/star.svg" alt="Rating" />
            <p>{movie.vote_average.toFixed(1)}</p>
          </span>
          <span className="lang">{movie.original_language}</span>
          <span className="year">{movie.release_date?.split('-')[0]}</span>
        </div>
      </li>

      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-2xl aspect-video bg-black">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube Trailer"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded"
              onClick={() => setShowTrailer(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
