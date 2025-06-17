import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import './App.css'

import CheckoutPage from './Pages/CheckoutPage'; 
import CartPage from './Pages/CartPage';
import MovieDetail from './pages/MovieDetail'
import Homepage from './Pages/HomePage';
import Header from './components/Header';

function App() {
  return (
<Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/checkoutPage" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router> 
  )
}

export default App;
