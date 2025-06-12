import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  '../styles/MovieDetailStyles.scss'; 
const API_URL = import.meta.env.VITE_APP_API_URL;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const found = data.find(
          m => m.imdbID === id || String(m.id) === id
        );
        setMovie(found);
      })
      .catch(err => console.error('Error fetching movie:', err));
  }, [id]);

  const handleAddToCart = () => {
    alert(`${movie.title} added to cart!`);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <button onClick={() => navigate('/')} className="back-button">← Back to Home</button>
      <img src={movie.Images[0]} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.plot}</p>
      <p>Director: {movie.director}</p>
      <p>Actors: {movie.actors}</p>
      <p>Genre: {movie.genre}</p>
      <p>Language: {movie.language}</p>
      <p>Awards: {movie.Awards}</p>
      <p>Rating: {movie.imdbRating}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <div className="images">
        {movie.Images && movie.Images.length > 0 ? (
          movie.Images.map((img, idx) => (
            <img key={idx} src={img} alt={`Still ${idx}`} width="200" />
          ))
        ) : (
          <p>No additional images</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
