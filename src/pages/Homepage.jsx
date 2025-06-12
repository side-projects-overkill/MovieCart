import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomepageStyles.scss'; 
const API_URL = import.meta.env.VITE_APP_API_URL;

const Homepage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(API_URL)
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setAllMovies(data))
      .catch((err) => console.error('Failed to fetch movies:', err));
  }, []);
 
  const handleMovieClick = (movie) => {
    navigate(`/details/${movie.imdbID || movie.id}`);
  };


  const handleAddToCart = (movie) => {
    alert(`✅ ${movie.title} added to cart`);
  };

  const handleBuyNow = (movie) => {
    alert(` Proceed to buy: ${movie.title}`);
    // Or navigate('/checkout') if you have a checkout page
  };

  const topRated = allMovies.filter((m) => Number(m.imdbRating) >= 8);
  const recommended = allMovies.slice(0, 5);
  const filteredMovies = allMovies.filter((movie) =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🎬 MovieMania Store</h1>

      
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />

    
      <MovieSection
        title="🔥 Top Rated"
        movies={topRated}
        onAdd={handleAddToCart}
        onBuy={handleBuyNow}
        onView={handleMovieClick}
      />

      
      <MovieSection
        title="✨ Recommended"
        movies={recommended}
        onAdd={handleAddToCart}
        onBuy={handleBuyNow}
        onView={handleMovieClick}
      />


      <MovieSection
        title="🎞️ All Movies"
        movies={allMovies}
        onAdd={handleAddToCart}
        onBuy={handleBuyNow}
        onView={handleMovieClick}
      />

      
      {searchTerm && (
        <MovieSection
          title={`🔎 Results for "${searchTerm}"`}
          movies={filteredMovies}
          onAdd={handleAddToCart}
          onBuy={handleBuyNow}
          onView={handleMovieClick}
        />
      )}
    </div>
  );
};

const MovieSection = ({ title, movies, onAdd, onBuy, onView }) => {
  const navigate = useNavigate();

  if (!movies || movies.length === 0) return null;

  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="cardsWrapper">
        {movies.map((movie, idx) => (
          <div key={movie.imdbID || movie.id} className="card">
            <img
              src={Array.isArray(movie.Images) ? movie.Images[2] : movie.Poster}
              alt={movie.title}
              className="cardImg"
            />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.imdbRating}</p>
            <p>₹{idx + 1}</p>
            <div className="cardButtons">
              <button onClick={() => onAdd(movie)}>🛒 Add to Cart</button>
              <button onClick={() => onView(movie)}>🔍 View Details</button>
              <button onClick={() => onBuy(movie)}>💳 Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
