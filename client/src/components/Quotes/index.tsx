import React, { useContext, useState, useEffect, useRef } from 'react';
import QuoteCard from '../QuoteCard';
import QuoteContext from '../../context/QuoteContext';
import Pagination from '../Pagination';
import { getPage, getNameQuotes, getDialogQuotes } from '../../services/pagination';
import { useSearchParams } from 'react-router-dom';
import './style.css';

interface IQueryObj {
  page: string;
  name?: string;
  dialog?: string;
}

const Characters = () => {
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
  const [dialog, setDialog] = useState<string>(query.get('dialog') || '');
  const [dialogInput, setDialogInput] = useState<string>(query.get('dialog') || '');
  const nameTimeoutId = useRef<any>(0);
  const quoteTimeId = useRef<any>(0);

  useEffect(() => {
    if (query.get('page') === page.toString() && query.get('name') === name && query.get('dialog') === dialog) {
      return;
    }

    const queryObj: IQueryObj = { page: page.toString() };
    if (name) {
      queryObj.name = name;
    }
    if (dialog) {
      queryObj.dialog = dialog;
    }
    setQuery({ ...queryObj});
  }, [page, setQuery, name, query, dialog]);
  
  const quotesNamed = getNameQuotes(quotes, name);
  const quotesDialog = getDialogQuotes(quotesNamed, dialog);
  const quotesFiltered = getPage(quotesDialog, page, limit);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    if (nameTimeoutId.current) {
      clearTimeout(nameTimeoutId.current)
    }
    nameTimeoutId.current = setTimeout(() => {
      setName(e.target.value);
      setPage(1);
    }, 200);
  };

  const handleDialogInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDialogInput(e.target.value);
    if (quoteTimeId.current) {
      clearTimeout(quoteTimeId.current)
    }
    quoteTimeId.current = setTimeout(() => {
      setDialog(e.target.value);
      setPage(1);
    }, 200);
  };

  const maxPage = Math.ceil(quotesDialog.length / limit);

  return (
    <main className="quotes-main">
      <h1 className="quotes-main__title">Quotes</h1>
      <section className="quotes-main__form">
        <label htmlFor="quote" className="quotes-main__label">
          Quote:
          <input type="text" value={dialogInput} onChange={handleDialogInputChange} className="quotes-main__input" />
        </label>
        <label htmlFor="name" className="quotes-main__label">
          Character:
          <input type="text" value={nameInput} onChange={handleNameInputChange} className="quotes-main__input" />
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
      {quotesDialog.length > limit && <Pagination setPage={setPage} maxPage={maxPage} page={page} />}
    </main>
  );
};

export default Characters;
