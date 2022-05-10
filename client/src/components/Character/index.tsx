import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { fetchPostFromApi } from '../../services/api';
import { scrollToTop } from '../../services/ui';

interface ImageFetch {
  src: string;
}

const Character = () => {
  const characters = useAppSelector((state) => state.lotr.characters);
  const params = useParams();
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const { id } = params;

  const character = characters.length > 0 ? characters.find((c) => c.id === id) : null;

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const fetchImage = async (wiki: string): Promise<void> => {
      const data = await fetchPostFromApi<ImageFetch>(`/characters/${id}/image`, { wiki });
      setImage(data.src);
    };
    if (character && character.wikiUrl) {
      fetchImage(character.wikiUrl);
    }
  }, [id, character]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <main className="character-main">
      {character
        ? (
          <>
            <h2 className="character-main__title">{character.name}</h2>
            {image && <img src={image} className="character-main__image" alt={character.name} />}
            {character.race && character.race !== 'NaN' && (
            <p className="character-main__info">
              Race:
              {character.race}
            </p>
            )}
            {character.gender && character.gender !== 'NaN' && (
            <p className="character-main__info">
              Gender:
              {character.gender}
            </p>
            )}
            {character.birth && character.birth !== 'NaN' && (
            <p className="character-main__info">
              Birth:
              {character.birth}
            </p>
            )}
            {character.spouse && character.spouse !== 'NaN' && (
            <p className="character-main__info">
              Spouse:
              {character.spouse}
            </p>
            )}
            {character.death && character.death !== 'NaN' && (
            <p className="character-main__info">
              Death:
              {character.death}
            </p>
            )}
            {character.realm && character.realm !== 'NaN' && (
            <p className="character-main__info">
              Realm:
              {character.realm}
            </p>
            )}
            {character.hair && character.hair !== 'NaN' && (
            <p className="character-main__info">
              Hair:
              {character.hair}
            </p>
            )}
            {character.height && character.height !== 'NaN' && (
            <p className="character-main__info">
              Height:
              {character.height}
            </p>
            )}
            <Link to={`/quotes?page=1&name=${character.name.replace(/ /g, '+').toLowerCase()}`} className="character-main__link">See quotes</Link>
            {character.wikiUrl && <a href={character.wikiUrl} className="character-main__link">Visit wikipedia</a>}
            <button
              className="character-main__button"
              onClick={handleClick}
              type="button"
            >
              Go back...
            </button>
          </>
        )
        : 'loading'}
    </main>
  );
};

export default Character;
