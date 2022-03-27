import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { scrollToTop } from '../../services/ui';
import QuoteCard from '../QuoteCard';
import './style.css';

const Favourites = () => {
  const favourites = useAppSelector((state) => state.lotr.favourites);

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
              />
            ))
          : <h2 className="favourites-main__subtitle">Add favourites to see them here</h2>}
      </section>
    </main>
  );
};

export default Favourites;
