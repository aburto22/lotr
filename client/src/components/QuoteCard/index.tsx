import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface QuoteCardProps {
  dialog: string;
  characterName: string;
  characterId: string;
}

const QuoteCard = ({ dialog, characterName, characterId }: QuoteCardProps) => (
  <div className="quote-card">
    <h2 className="quote-card__title">{dialog}</h2>
    <p className="quote-card__text">{characterName}</p>
    <Link className="quote-card__link" to={`/characters/${characterId}`}>character info...</Link>
  </div>
);

export default QuoteCard;
