import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';

const Site = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="home" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
};

export default Site;
