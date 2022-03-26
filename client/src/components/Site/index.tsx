import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchFromApi } from '../../services/api';
import { ICharacter, IQuote, IQuoteName } from '../../types';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Characters from '../Characters';
import Character from '../Character';
import Quotes from '../Quotes';
import NotFound from '../NotFound';
import CharacterContext from '../../context/CharacterContext';
import QuoteContext from '../../context/QuoteContext';
import { populateNamesQuotes } from '../../services/pagination';
import './style.css';

const Site = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [quotes, setQuotes] = useState<IQuoteName[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 0);
  }, []);

  useEffect(() => {
    const fetchInfo = async (): Promise<void> => {
      const [characterData, quoteData] = await Promise.all([
        fetchFromApi<ICharacter[]>('/characters'),
        fetchFromApi<IQuote[]>('/quotes'),
      ]);
      const quotePopulatedData = quoteData.map((q) => populateNamesQuotes(q, characterData));
      setCharacters(characterData);
      setQuotes(quotePopulatedData);
    };

    fetchInfo();
  }, []);

  return (
    <CharacterContext.Provider value={characters}>
      <QuoteContext.Provider value={quotes}>
        <div className={`app ${loaded ? 'app--visible' : ''}`}>
          <Header />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="characters/*">
              <Route path=":id" element={<Character />} />
              <Route index element={<Characters />} />
            </Route>
            <Route path="quotes/*">
              <Route index element={<Quotes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </QuoteContext.Provider>
    </CharacterContext.Provider>
  );
};

export default Site;
