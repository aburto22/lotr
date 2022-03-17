import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../../services';
import { ICharacterSummary } from '../../types';
import CharacterCard from '../CharacterCard';
import './style.css';

const Characters = () => {

  const [characters, setCharacters] = useState<ICharacterSummary[]>([]);

  useEffect(() => {
    const fetchCharacters = async (): Promise<void> => {
      const characters = await fetchFromApi<ICharacterSummary[]>('/characters');
      setCharacters(characters);
    }

    fetchCharacters();
  }, []);

  return (
    <main className="characters-main">
      <h1 className="characters-main__title">Characters</h1>
      <section className="character-main__board">
        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            name={c.name}
            gender={c.gender}
            id={c.id}
            race={c.race}
          />
        ))}
      </section>
    </main>
  );
};

export default Characters;
