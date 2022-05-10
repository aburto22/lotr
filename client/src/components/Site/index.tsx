import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Characters from '../Characters';
import Character from '../Character';
import Quotes from '../Quotes';
import Favourites from '../Favourites';
import NotFound from '../NotFound';
import { useAppDispatch } from '../../hooks';
import { fetchInfoThunk } from '../../slices';
import './style.css';

const Site = () => {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 0);
    dispatch(fetchInfoThunk());
  }, []);

  return (
    <div className={`app ${loaded ? 'app--visible' : ''}`}>
      <Header />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="characters/*">
          <Route path=":id" element={<Character />} />
          <Route index element={<Characters />} />
        </Route>
        <Route path="quotes" element={<Quotes />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Site;
