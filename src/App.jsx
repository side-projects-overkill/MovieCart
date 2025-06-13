import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'; 
import CheckoutPage from './Pages/CheckoutPage'; 
import CartPage from './Pages/CartPage';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkoutPage" element={<CheckoutPage />} />
        <Route path="/cartPage" element={<CartPage />} />
      </Routes>
    </Router> 
  )
}

export default App;
