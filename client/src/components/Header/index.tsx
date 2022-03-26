import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Header() {
  return (
    <header className="header">
      <Link to="/home" className="header__title-link">
        <h1 className="header__title">The Lord of the Rings</h1>
      </Link>
      <nav className="nav">
        <Link to="/characters" className="nav__link">Characters</Link>
        <Link to="/quotes" className="nav__link">Quotes</Link>
      </nav>
    </header>
  );
}

export default Header;
