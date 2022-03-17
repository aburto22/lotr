import React, { useContext, useState, useEffect, useRef } from 'react';
import QuoteCard from '../QuoteCard';
import CharacterContext from '../../context/CharacterContext';
import QuoteContext from '../../context/QuoteContext';
import Pagination from '../Pagination';
import { getPage, getNameQuotes, populateNamesQuotes } from '../../services/pagination';
import { useSearchParams } from 'react-router-dom';
import './style.css';

interface IQueryObj {
  page: string;
  name?: string;
}

const Characters = () => {
  const characters = useContext(CharacterContext);
  const quotes = useContext(QuoteContext);
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState<number>(() => {
    if (query.get('page')) {
      return Number(query.get('page'));
    }
    return 1;
  });
  const [limit] = useState(20);
  const [name, setName] = useState<string>(query.get('name') || '');
  const [nameInput, setNameInput] = useState<string>(query.get('name') || '');
  const nameTimeoutId = useRef<any>(0);

  useEffect(() => {
    if (query.get('page') === page.toString() && query.get('name') === name) {
      return;
    }

    const queryObj: IQueryObj = { page: page.toString() };
    if (name) {
      queryObj.name = name;
    }
    setQuery({ ...queryObj});
  }, [page, setQuery, name, query]);
  
  const quotesPopulated = quotes.map((q) => populateNamesQuotes(q, characters));
  const quotesNamed = getNameQuotes(quotesPopulated, name);
  const quotesFiltered = getPage(quotesNamed, page, limit);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    if (nameTimeoutId.current) {
      clearTimeout(nameTimeoutId.current)
    }
    nameTimeoutId.current = setTimeout(() => {
      setName(e.target.value);
      setPage(1);
    }, 500);
  };

  const maxPage = Math.ceil(quotesNamed.length / limit);

  return (
    <main className="quotes-main">
      <h1 className="quotes-main__title">Quotes</h1>
      <section className="quotes-main__form">
        <label htmlFor="name" className="quotes-main__label">
          Name:
          <input type="text" value={nameInput} onChange={handleInputChange} className="quotes-main__input" />
        </label>
      </section>
      <section className="quotes-main__board">
        {quotesFiltered.length > 0 
          ? quotesFiltered
            .map((q) => (
              <QuoteCard
                key={q.id}
                dialog={q.dialog}
                id={q.id}
                characterName={q.characterName}
                characterId={q.character}
              />
          ))
        : <h2>No quotes found</h2>}
      </section>
      {quotesNamed.length > limit && <Pagination setPage={setPage} maxPage={maxPage} page={page} />}
    </main>
  );
};

export default Characters;
