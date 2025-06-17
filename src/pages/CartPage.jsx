import React, { useState, useEffect, useContext } from "react";
import "../styles/cartPage.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [items, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  return (
    <div className="cart-container">
      <h2>CART</h2>
      <div className="left-cart">
        {items.length === 0 ? (
          <>
            <h2>Your cart is empty</h2>
            <button onClick={() => navigate('/')}>Go to Homepage</button>
          </>
        ) : (
          items.map((movie) => (
            <div className="card" key={movie.imdbID || movie.id}>
              <img
                src={Array.isArray(movie.Images) ? movie.Images[0] : movie.Poster}
                alt={movie.title}
                width={80}
              />
              <h2>Title: {movie.title}</h2>
              <h2>Price: {movie.price}</h2>
              <div className="card-buttons">
                <button
                  onClick={() => navigate("/checkoutPage")}
                  disabled={items.length === 0}
                >
                  Checkout
                </button>
                <button onClick={() => removeFromCart(movie.imdbID || movie.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="right-cart">
        <h2>Cart Summary</h2>
        <div className="cart-summary">
          <h3>Total Items: {items.length}</h3>
          <h3>
            Total Price: {items.reduce((total, item) => total + (item.price || 0), 0)}
          </h3>
        </div>
        <button
          className="card-buttons"
          onClick={() => {
            navigate("/checkoutPage");
            clearCart();
          }}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CartPage;
