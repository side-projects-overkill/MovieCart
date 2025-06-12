import React,{ useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'; 
import CheckoutPage from './Pages/CheckoutPage' 
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckoutPage />} />
      </Routes>
    </Router> 
  )
}

export default App;
