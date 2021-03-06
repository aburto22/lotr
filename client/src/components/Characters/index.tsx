import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import CharacterCard from '../CharacterCard';
import DelayedInput from '../DelayedInput';
import { getPage, getNameCharacter, getRaceCharacter } from '../../services/pagination';
import Pagination from '../Pagination';
import { scrollToTop } from '../../services/ui';
import { ICharacter } from '../../types';
import './style.css';

interface IQueryObj {
  page: string;
  name?: string;
  race?: string;
}

const Characters = () => {
  const characters = useAppSelector((state) => state.lotr.characters);
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
    scrollToTop();
  }, []);

  useEffect(() => {
    const queryObj: IQueryObj = { page: page.toString() };
    if (name) {
      queryObj.name = name;
    }
    if (race) {
      queryObj.race = race;
    }
    setQuery({ ...queryObj });
  }, [page, setQuery, name, race]);

  const charactersNamed = getNameCharacter(characters, name);
  const charactersRace = getRaceCharacter(charactersNamed, race);
  const charactersFiltered = getPage<ICharacter>(charactersRace, page, limit);

  const maxPage = Math.ceil(charactersRace.length / limit);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRace(e.target.value);
    setPage(1);
  };

  return (
    <main className="characters-main">
      <h1 className="characters-main__title">Characters</h1>
      <section className="characters-main__form">
        <DelayedInput labelText="Name" initialState={name} setState={setName} setPage={setPage} />
        <label htmlFor="race" className="characters-main__label">
          Race:
          <select value={race} onChange={handleSelectChange} className="characters-main__input">
            <option value="">All</option>
            <option value="human">Human</option>
            <option value="elf">Elf</option>
            <option value="hobbit">Hobbit</option>
            <option value="half-elven">Half-elven</option>
            <option value="dwarf">Dwarf</option>
            <option value="orc">Goblin / Orc</option>
            <option value="dragon">Dragon</option>
            <option value="eagle">Eagle</option>
            <option value="spider">Spider</option>
          </select>
        </label>
      </section>
      <section className="characters-main__board">
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
      {charactersRace.length > limit
        && <Pagination setPage={setPage} maxPage={maxPage} page={page} />}
    </main>
  );
};

export default Characters;
