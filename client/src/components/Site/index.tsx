import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchFromApi } from '../../services/api';
import { ICharacter } from '../../types';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Characters from '../Characters';
import Character from '../Character';
import NotFound from '../NotFound';
import CharacterContext from '../../context/CharacterContext';

const Site = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    const fetchCharacters = async (): Promise<void> => {
      const characters = await fetchFromApi<ICharacter[]>('/characters');
      setCharacters(characters);
    }

    fetchCharacters();
  }, []);

  return (
    <CharacterContext.Provider value={characters}>
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
    </CharacterContext.Provider>
  )
};

export default Site;
