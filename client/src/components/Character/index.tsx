import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { ICharacter } from '../../types';
import { fetchFromApi } from '../../services';

const Character = () => {
  const [character, setCharacter] = useState<ICharacter>();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchCharacter = async (): Promise<void> => {
      const data = await fetchFromApi<ICharacter>(`/characters/${id}`)
      setCharacter(data);
    }

    fetchCharacter();
  }, [id]);

  return (
    <main className="character-main">
      {character
        ? (
          <>
            <h2 className="character-main__title">{character.name}</h2>
            <p className="character-main__info">Race: {character.race}</p>
            <p className="character-main__info">Gender: {character.gender}</p>
            <p className="character-main__info">Birth: {character.birth}</p>
            <p className="character-main__info">Spouse: {character.spouse}</p>
            <p className="character-main__info">Death: {character.death}</p>
            <p className="character-main__info">Realm: {character.realm}</p>
            <p className="character-main__info">Hair: {character.hair}</p>
            <p className="character-main__info">Height: {character.height}</p>
            <a href={character.wikiUrl} className="character-main__link">Visit wikipedia</a>
          </>
        ) 
        : 'loading'
      }
    </main>
  );
}

export default Character;
