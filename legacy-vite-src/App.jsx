import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';
import './App.scss'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Industrial from './pages/Industrial/Industrial'
import Partners from './pages/Partners/Partners'
import Residential from './pages/Residential/Residential'
import Residents from './pages/Residents/Residents'
import Textile from './pages/Textile/Textile'
import Trade from './pages/Trade/Trade'


import Footer from './components/Footer/Footer'
import Burger from './components/Burger/Burger'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='App'>
      <Router>
        <Header toggleMenu={toggleMenu} />
        <Burger isOpen={isOpen} toggleMenu={toggleMenu} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/industrial' element={<Industrial />} />
          <Route path='/textile' element={<Textile />} />
          <Route path='/trade' element={<Trade />} />
          <Route path='/residential' element={<Residential />} />
          <Route path='/residents' element={<Residents />} />
          <Route path='/partners' element={<Partners />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
