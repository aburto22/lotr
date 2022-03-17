import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Characters from '../Characters';
import NotFound from '../NotFound';

const Site = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="characters" element={<Characters />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
};

export default Site;
