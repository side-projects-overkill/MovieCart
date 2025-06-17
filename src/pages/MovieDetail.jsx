import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MovieDetailStyles.scss';
import { CartContext } from '../context/CartContext';
import { ShoppingCartIcon } from '@patternfly/react-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const { cart, addToCart, moviesWithPrices } = useContext(CartContext);

  useEffect(() => {
    // Get the movie from context instead of API
    const found = moviesWithPrices.find(
      (m) => String(m.imdbID || m.id) === String(id)
    );
    setMovie(found);
  }, [id, moviesWithPrices]);

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
     navigate("/checkoutPage"); 
  };

  if (!movie) return <div>Loading...</div>;

  const inCart = cart.some(
    (item) => (item.imdbID || item.id) === (movie.imdbID || movie.id)
  );

  return (
    <>
      <ToastContainer />

      <div className="movie-detail">
        <img src={movie.Images?.[0] || movie.Poster} alt={movie.title} />
        <h1>{movie.title}</h1>
        <p>{movie.plot}</p>
        <p>Director: {movie.director}</p>
        <p>Actors: {movie.actors}</p>
        <p>Genre: {movie.genre}</p>
        <p>Language: {movie.language}</p>
        <p>Awards: {movie.Awards}</p>
        <p>Rating: {movie.imdbRating}</p>
        <p><strong>Price:</strong> ₹{movie.price}</p>

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