import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">LOTR Quotes</h1>
      <nav className="nav">
        <Link to="/characters" className="nav__link">Characters</Link>
      </nav>
    </header>
  );
}

export default Header;
