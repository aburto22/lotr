import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Welcome = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isClicked) {
      return;
    }
    setIsClicked(true);
    setTimeout(() => { navigate('/home'); }, 1000);
  };

  return (
    <main className={`welcome ${isHovered ? 'welcome--hovered' : ''} ${isClicked ? 'welcome--clicked' : ''}`}>
      <div className="welcome__background" />
      <Link
        to="/home"
        className="welcome__link"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        Enter website
      </Link>
    </main>
  );
};

export default Welcome;
