import React, { useState, useRef } from 'react';
import './style.css';

interface DelayedInputProps {
  labelText: string;
  initialState: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function DelayedInput({
  labelText, initialState, setState, setPage,
}: DelayedInputProps) {
  const [inputValue, setInputValue] = useState(initialState);
  const inputTimeId = useRef<any>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (inputTimeId.current) {
      clearTimeout(inputTimeId.current);
    }
    inputTimeId.current = setTimeout(() => {
      setState(e.target.value);
      setPage(1);
    }, 100);
  };

  return (
    <label htmlFor="text-input" className="delayed-input__label">
      {labelText}
      :
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="delayed-input__input"
        name="text-input"
      />
    </label>
  );
}

export default DelayedInput;
