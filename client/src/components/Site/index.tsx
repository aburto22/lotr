import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchFromApi } from '../../services/api';
import { IQuote } from '../../types';
import { checkFavourite } from '../../services/favourites';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Characters from '../Characters';
import Character from '../Character';
import Quotes from '../Quotes';
import Favourites from '../Favourites';
import NotFound from '../NotFound';
import QuoteContext from '../../context/QuoteContext';
import { useAppDispatch } from '../../hooks';
import { fetchInfoThunk } from '../../slices';
import './style.css';

const Site = () => {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [favourites, setFavourites] = useState<IQuote[]>(() => {
    try {
      const saved = localStorage.getItem('lotrQuotes') || '[]';
      return JSON.parse(saved);
    } catch (err) {
      return [];
    }
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 0);
  }, []);

  useEffect(() => {
    const fetchInfo = async (): Promise<void> => {
      const data = await fetchFromApi('/');
      const quoteFavourites = data.quotes.map((q) => checkFavourite(q, favourites));
      setQuotes(quoteFavourites);
    };

    fetchInfo();
    dispatch(fetchInfoThunk());
  }, []);

  return (
    <QuoteContext.Provider value={quotes}>
      <div className={`app ${loaded ? 'app--visible' : ''}`}>
        <Header />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="characters/*">
            <Route path=":id" element={<Character />} />
            <Route index element={<Characters />} />
          </Route>
          <Route path="quotes" element={<Quotes setFavourites={setFavourites} />} />
          <Route path="favourites" element={<Favourites favourites={favourites} setFavourites={setFavourites} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </QuoteContext.Provider>
  );
};

export default Site;
