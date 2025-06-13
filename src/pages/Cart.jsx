import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate('/')}>Go to Homepage</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul>
        {cart.map((movie) => (
          <li key={movie.imdbID || movie.id}>
            <img
              src={Array.isArray(movie.Images) ? movie.Images[0] : movie.Poster}
              alt={movie.title}
              width={80}
            />
            <span style={{ marginLeft: 16 }}>{movie.title}</span>
            <button
              style={{ marginLeft: 16 }}
              onClick={() => removeFromCart(movie.imdbID || movie.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
};

export default Cart;