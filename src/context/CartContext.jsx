import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (movie) => {
    setCart((prev) => {
      const movieId = String(movie.imdbID || movie.id);
      const exists = prev.some(
        (item) => String(item.imdbID || item.id) === movieId
      );
      if (exists) return prev; 
      return [...prev, movie];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter(
        (item) => String(item.imdbID || item.id) !== String(id)
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};