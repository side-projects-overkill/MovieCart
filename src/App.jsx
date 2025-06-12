import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import  Homepage  from './pages/Homepage'
import MovieDetail from './pages/MovieDetail'

function App() {

  return (
      <Routes> 
      <Route path="/" element={<Homepage />} />
      <Route path="/details/:id" element={<MovieDetail />} />
    </Routes>
  )
}

export default App
