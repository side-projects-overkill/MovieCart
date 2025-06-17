
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/HomepageStyles.scss';
import {
  FireIcon,
  StarIcon,
  FilmIcon,
  ShoppingCartIcon,
  SearchIcon,
  CreditCardIcon
} from '@patternfly/react-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Homepage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { cart, addToCart, setAllMovies: setContextMovies} = useContext(CartContext);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // Assign price only once, store in context
        const pricedData = data.map((movie, idx) => ({
          ...movie,
          price: (idx + 1) * 10,
        }));

        setAllMovies(pricedData);
        setContextMovies(pricedData); // ⭐ Set in context for global access
        setError('');
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      }
    };
    fetchMovies();
  }, [setContextMovies]);

  const handleMovieClick = (movie) => {
    navigate(`/details/${movie.imdbID || movie.id}`);
  };

  const handleAddToCart = (movieWithPrice) => {
    addToCart(movieWithPrice);
    toast.success(`${movieWithPrice.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleBuyNow = (movie) => {
    // If not already in cart, add it
    const movieId = movie.imdbID || movie.id;
    const inCart = cart.some((item) => (item.imdbID || item.id) === movieId);
    if (!inCart) {
      addToCart(movie);
    }
    toast.info(`Proceed to buy: ${movie.title}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
     navigate("/checkoutPage");
  };

  const topRated = allMovies.filter((m) => Number(m.imdbRating) >= 8);
  const recommended = allMovies.slice(0, 5);
  const filteredMovies = allMovies.filter((movie) =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sections = [
    { key: 'top-rated', title: <><FireIcon /> Top Rated</>, movies: topRated },
    { key: 'recommended', title: <><StarIcon /> Recommended</>, movies: recommended },
    { key: 'all-movies', title: <><FilmIcon /> All Movies</>, movies: allMovies },
  ];

  return (
    <>
      
      <div className="container">
        <h1><FilmIcon /> MovieMania Store</h1>

        <ToastContainer />

        {error && (
          <div className="fetch-error" style={{ color: 'red', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />

        {searchTerm ? (
          <MovieSection
            title={<><SearchIcon /> Results for "{searchTerm}"</>}
            movies={filteredMovies}
            onAdd={handleAddToCart}
            onBuy={handleBuyNow}
            onView={handleMovieClick}
            cart={cart}
          />
        ) : (
          sections.map((section) => (
            <MovieSection
              key={section.key}
              title={section.title}
              movies={section.movies}
              onAdd={handleAddToCart}
              onBuy={handleBuyNow}
              onView={handleMovieClick}
              cart={cart}
            />
          ))
        )}
      </div>
    </>
  );
};

const MovieSection = ({ title, movies, onAdd, onBuy, onView, cart }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="cardsWrapper">
        {movies.map((movie) => {
          const movieId = movie.imdbID || movie.id;
          const inCart = cart.some((item) => (item.imdbID || item.id) === movieId);
          const price = movie.price;

          return (
            <div key={movieId} className="card">
              <img
                src={Array.isArray(movie.Images) ? movie.Images[2] : movie.Poster}
                alt={movie.title}
                className="cardImg"
              />
              <h3>{movie.title}</h3>
              <p>⭐ {movie.imdbRating}</p>
              <p>₹{price}</p>
              <div className="cardButtons">
                <button
                  onClick={() => onAdd(movie)}
                  disabled={inCart}
                >
                  <ShoppingCartIcon /> {inCart ? "Added" : "Add to Cart"}
                </button>
                <button onClick={() => onView(movie)}><SearchIcon /> View Details</button>
                <button onClick={() => onBuy(movie)}><CreditCardIcon /> Buy Now</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;