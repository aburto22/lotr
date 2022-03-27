import React from 'react';
import { Link } from 'react-router-dom';
import { IQuoteName } from '../../types';
import HearthIcon from '../HearthIcon';
import './style.css';

interface QuoteCardProps {
  quote: IQuoteName
  setFavourites: React.Dispatch<React.SetStateAction<IQuoteName[]>>;
}

const QuoteCard = ({ quote, setFavourites }: QuoteCardProps) => {
  const handleClick = () => {
    setFavourites((favourites) => {
      const index = favourites.findIndex((q) => q.id === quote.id);
      if (index >= 0) {
        return [
          ...favourites.splice(0, index),
          ...favourites.splice(index + 1),
        ];
      }
      return [...favourites, quote];
    });
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
