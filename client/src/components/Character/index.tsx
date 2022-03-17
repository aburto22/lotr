import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { ICharacter } from '../../types';
import { fetchFromApi } from '../../services';

const Character = () => {
  const [character, setCharacter] = useState<ICharacter>();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchCharacter = async (): Promise<void> => {
      const data = await fetchFromApi<ICharacter>(`/characters/${id}`)
      setCharacter(data);
    }

    fetchCharacter();
  }, [id]);

  return (
    <main className="character-main">
      <h2 className="character-main__title">Name</h2>
    </main>
  );
}

export default Character;
