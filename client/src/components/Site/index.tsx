import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Characters from '../Characters';
import Character from '../Character';
import NotFound from '../NotFound';

const Site = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="characters/*">
          <Route path=":id" element={<Character />} />
          <Route index element={<Characters />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
};

export default Site;
