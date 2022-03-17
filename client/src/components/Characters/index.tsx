import React, { useContext, useState, useEffect } from 'react';
import CharacterCard from '../CharacterCard';
import CharacterContext from '../../context/CharacterContext';
import { getPage, getName, getRace } from '../../services/pagination';
import { useSearchParams } from 'react-router-dom';
import './style.css';

interface IQueryObj {
  page: string;
  name?: string;
  race?: string;
}

const Characters = () => {
  const characters = useContext(CharacterContext);
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState<number>(() => {
    if (query.get('page')) {
      return Number(query.get('page'));
    }
    return 1;
  });
  const [limit] = useState(10);
  const [name, setName] = useState<string>(query.get('name') || '');
  const [race, setRace] = useState<string>(query.get('race') || '');

  useEffect(() => {
    const queryObj: IQueryObj = { page: page.toString() };
    if (name) {
      queryObj.name = name;
    }
    if (race) {
      queryObj.race = race;
    }
    setQuery({ ...queryObj});
  }, [page, setQuery, name, race]);

  const handlePrevPage = () => {
    setPage((currentPage) => {
      if (currentPage <= 1) {
        return currentPage;
      }
      return currentPage - 1;
    });
  };

  const handleNextPage = () => {
    setPage((currentPage) => {
      if (currentPage >= Math.floor(characters.length / limit)) {
        return currentPage;
      }
      return currentPage + 1;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRace(e.target.value);
  }

  const charactersNamed = getName(characters, name);
  const charactersRace = getRace(charactersNamed, race);
  const charactersFiltered = getPage(charactersRace, page, limit);

  return (
    <main className="characters-main">
      <h1 className="characters-main__title">Characters</h1>
      <section className="characters-main__form">
        <label htmlFor="name" className="characters-main__label">
          Name:
          <input type="text" value={name} onChange={handleInputChange} className="characters-main__input" />
        </label>
        <label htmlFor="race" className="characters-main__label">
          Race:
          <select value={race} onChange={handleSelectChange} className="characters-main__input">
            <option value="">All</option>
            <option value="human">Human</option>
            <option value="elv">Elv</option>
          </select>
        </label>
      </section>
      <section className="character-main__board">
        {charactersFiltered
          .map((c) => (
            <CharacterCard
              key={c.id}
              name={c.name}
              gender={c.gender}
              id={c.id}
              race={c.race}
            />
        ))}
      </section>
      <section className="character-main__pagination">
        <button className="character-main__button" onClick={handlePrevPage}>Previous</button>
        <button className="character-main__button" onClick={handleNextPage}>Next</button>
      </section>
    </main>
  );
};

export default Characters;
