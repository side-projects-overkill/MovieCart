import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [moviesWithPrices, setMoviesWithPrices] = useState([]); 

  const addToCart = (movie) => {
    const movieId = String(movie.imdbID || movie.id);
    setCart((prev) => {
      const exists = prev.some(
        (item) => String(item.imdbID || item.id) === movieId
      );
      if (exists) return prev;
      return [...prev, movie]; 
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => String(item.imdbID || item.id) !== String(id))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const setAllMovies = (movieList) => {
    const pricedMovies = movieList.map((movie, idx) => ({
      ...movie,
      price: (idx + 1) * 10, 
    }));
    setMoviesWithPrices(pricedMovies);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        moviesWithPrices,
        setAllMovies,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};