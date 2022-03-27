import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { toggleFavourite } from '../../slices';
import { IQuote } from '../../types';
import HearthIcon from '../HearthIcon';
import './style.css';

interface QuoteCardProps {
  quote: IQuote;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleFavourite(quote.id));
  };

  return (
    <div className="quote-card">
      <div className="quote-card__info">
        <h2 className="quote-card__title">{quote.dialog}</h2>
        <p className="quote-card__text">{quote.characterName}</p>
        <Link className="quote-card__link" to={`/characters/${quote.character}`}>character info...</Link>
      </div>
      <button
        type="button"
        onClick={handleClick}
        aria-label="toggle favourite"
        className="quote-card__button"
      >
        <HearthIcon isFavourite={quote.isFavourite} />
      </button>
    </div>
  );
};

export default QuoteCard;
