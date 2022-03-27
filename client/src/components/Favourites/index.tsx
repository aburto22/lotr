import React, { useEffect } from 'react';
import { scrollToTop } from '../../services/ui';
import { IQuote } from '../../types';
import QuoteCard from '../QuoteCard';
import './style.css';

interface IFavouritesProps {
  favourites: IQuote[];
  setFavourites: React.Dispatch<React.SetStateAction<IQuote[]>>;
}

const Favourites = ({ favourites, setFavourites }: IFavouritesProps) => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main className="favourites-main">
      <h1 className="favourites-main__title">Favourites</h1>
      <section className="favourites-main__board">
        {favourites.length > 0
          ? favourites
            .map((q) => (
              <QuoteCard
                key={q.id}
                quote={q}
                setFavourites={setFavourites}
              />
            ))
          : <h2 className="favourites-main__subtitle">Add favourites to see them here</h2>}
      </section>
    </main>
  );
};

export default Favourites;
