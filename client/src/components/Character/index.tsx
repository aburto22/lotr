import React, { useContext } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import CharacterContext from '../../context/CharacterContext';

const Character = () => {
  const characters = useContext(CharacterContext);
  const params = useParams();
  const id = params.id;

  const character = characters.length > 0 ? characters.find((c) => c.id === id) : null;

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
