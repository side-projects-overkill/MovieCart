import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
import MovieDetail from "./pages/MovieDetail";
import Homepage from "./pages/HomePage";
import Header from "./components/Header";

function App() {
  return (
    <Router basename="/movie-mania">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/checkoutPage" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
