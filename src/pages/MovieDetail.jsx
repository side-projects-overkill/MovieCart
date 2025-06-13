import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MovieDetailStyles.scss';
import { CartContext } from '../context/CartContext';
import { ShoppingCartIcon } from '@patternfly/react-icons';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_APP_API_URL;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const found = data.find(
          (m) => m.imdbID === id || String(m.id) === id
        );
        setMovie(found);
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(movie);
    toast.success(`${movie.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleBuyNow = () => {
    toast.info(`Purchased ${movie.title} successfully!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!movie) return <div>Loading...</div>;

  const inCart = cart.some(
    (item) => (item.imdbID || item.id) === (movie.imdbID || movie.id)
  );

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="movie-detail">
        <img src={movie.Images[0]} alt={movie.title} />
        <h1>{movie.title}</h1>
        <p>{movie.plot}</p>
        <p>Director: {movie.director}</p>
        <p>Actors: {movie.actors}</p>
        <p>Genre: {movie.genre}</p>
        <p>Language: {movie.language}</p>
        <p>Awards: {movie.Awards}</p>
        <p>Rating: {movie.imdbRating}</p>

        <button onClick={handleAddToCart} disabled={inCart}>
          <ShoppingCartIcon /> {inCart ? 'Added' : 'Add to Cart'}
        </button>

        <button onClick={handleBuyNow}>
          Buy Now
        </button>

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
    </>
  );
};

export default MovieDetail;
