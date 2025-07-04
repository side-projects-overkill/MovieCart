import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ShoppingCartIcon, ArrowLeftIcon, FilmIcon } from '@patternfly/react-icons';
import '../styles/Header.scss';

const Header = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <header className="global-header">

      <div className="header-title" onClick={() => navigate('/')}>
        <FilmIcon /> MovieMania Store
      </div>
      <button className="cart-btn" onClick={() => navigate('/cart')}>
        <ShoppingCartIcon />
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </button>
    </header>
  );
};

export default Header;