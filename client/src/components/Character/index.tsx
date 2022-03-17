import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import CharacterContext from '../../context/CharacterContext';
import { fetchFromApi  } from '../../services/api';
import { Link } from 'react-router-dom';

interface ImageFetch {
  src: string;
}

const Character = () => {
  const characters = useContext(CharacterContext);
  const params = useParams();
  const [image, setImage] = useState('');
  const id = params.id;

  useEffect(() => {
    const fetchImage = async () => {
      const data = await fetchFromApi<ImageFetch>(`/characters/${id}/image`);
      setImage(data.src);
    };

    fetchImage();
  }, [id]);

  const character = characters.length > 0 ? characters.find((c) => c.id === id) : null;

  return (
    <main className="character-main">
      {character
        ? (
          <>
            <h2 className="character-main__title">{character.name}</h2>
            {image && <img src={image} className="character-main__image" alt={character.name} />}
            {character.race && character.race !== 'NaN' && <p className="character-main__info">Race: {character.race}</p>}
            {character.gender && character.gender !== 'NaN' && <p className="character-main__info">Gender: {character.gender}</p>}
            {character.birth && character.birth !== 'NaN' && <p className="character-main__info">Birth: {character.birth}</p>}
            {character.spouse && character.spouse !== 'NaN' && <p className="character-main__info">Spouse: {character.spouse}</p>}
            {character.death && character.death !== 'NaN' && <p className="character-main__info">Death: {character.death}</p>}
            {character.realm && character.realm !== 'NaN' && <p className="character-main__info">Realm: {character.realm}</p>}
            {character.hair && character.hair !== 'NaN' && <p className="character-main__info">Hair: {character.hair}</p>}
            {character.height && character.height !== 'NaN' && <p className="character-main__info">Height: {character.height}</p>}
            <Link to={`/quotes?page=1&name=${character.name.replace(/ /g, '+').toLowerCase()}`} className="character-main__link">See quotes</Link>
            {character.wikiUrl && <a href={character.wikiUrl} className="character-main__link">Visit wikipedia</a>}
          </>
        ) 
        : 'loading'
      }
    </main>
  );
}

export default Character;
