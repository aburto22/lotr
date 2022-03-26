import React, { useState, useEffect } from 'react';
import { scrollToTop } from '../../services/ui';
import QuoteCard from '../QuoteCard';
import { IQuoteName } from '../../types';
import './style.css';

const Favourites = () => {
  const [favourites] = useState<IQuoteName[]>(() => {
    try {
      const saved = localStorage.getItem('lotrQuotes') || '[]';
      return JSON.parse(saved);
    } catch (err) {
      return [];
    }
  });

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
                dialog={q.dialog}
                characterName={q.characterName}
                characterId={q.character}
              />
            ))
          : <h2>No favourites found</h2>}
      </section>
    </main>
  );
};

export default Favourites;
