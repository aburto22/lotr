import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface QuoteCardProps {
  dialog: string;
  id: string;
  character: string;
}

const QuoteCard = ({ id, dialog, character}: QuoteCardProps) => {
  return (
    <div className="quote-card">
      <h2 className="quote-card__title">{dialog}</h2>
      <p className="quote-card__text">{character}</p>
      <Link className="quote-card__link" to={`/quotes/${id}`}>more...</Link>
    </div>
  );
}

export default QuoteCard;
