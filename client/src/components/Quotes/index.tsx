import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuoteCard from '../QuoteCard';
import { useAppSelector } from '../../hooks';
import Pagination from '../Pagination';
import DelayedInput from '../DelayedInput';
import { getPage, getNameQuotes, getDialogQuotes } from '../../services/pagination';
import { scrollToTop } from '../../services/ui';
import './style.css';

interface IQueryObj {
  page: string;
  name?: string;
  dialog?: string;
}

const Quotes = () => {
  const quotes = useAppSelector((state) => state.lotr.quotes);
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState<number>(() => {
    if (query.get('page')) {
      return Number(query.get('page'));
    }
    return 1;
  });
  const [limit] = useState(20);
  const [name, setName] = useState<string>(query.get('name') || '');
  const [dialog, setDialog] = useState<string>(query.get('dialog') || '');

  useEffect(() => {
    scrollToTop();
  }, []);

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
    setQuery({ ...queryObj });
  }, [page, setQuery, name, query, dialog]);

  const quotesNamed = getNameQuotes(quotes, name);
  const quotesDialog = getDialogQuotes(quotesNamed, dialog);
  const quotesFiltered = getPage(quotesDialog, page, limit);

  const maxPage = Math.ceil(quotesDialog.length / limit);

  return (
    <main className="quotes-main">
      <h1 className="quotes-main__title">Quotes</h1>
      <section className="quotes-main__form">
        <DelayedInput labelText="Dialog" initialState={dialog} setState={setDialog} setPage={setPage} />
        <DelayedInput labelText="Character" initialState={name} setState={setName} setPage={setPage} />
      </section>
      <section className="quotes-main__board">
        {quotesFiltered.length > 0
          ? quotesFiltered
            .map((q) => (
              <QuoteCard
                key={q.id}
                quote={q}
              />
            ))
          : <h2>No quotes found</h2>}
      </section>
      {quotesDialog.length > limit
        && <Pagination setPage={setPage} maxPage={maxPage} page={page} />}
    </main>
  );
};

export default Quotes;
