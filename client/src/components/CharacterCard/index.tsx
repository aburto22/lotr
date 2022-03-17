import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface CharacterCardProps {
  name: string;
  id: string;
  gender: string;
  race: string;
}

const CharacterCard = ({ name, id, gender, race }: CharacterCardProps) => {
  return (
    <div className="character-card">
      <h2 className="character-card__title">{name}</h2>
      <p className="character-card__text">{gender}</p>
      <p className="character-card__text">{race}</p>
      <Link className="character-card__link" to={`/characters/${id}`}>more...</Link>
    </div>
  );
}

export default CharacterCard;
