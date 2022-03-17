import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Welcome = () => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  return (
    <main className={`welcome ${isHovered ? "welcome--hovered" : ""}`}>
      <div className="welcome__background" />
      <Link
        to="/home"
        className="welcome__link"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Enter website
      </Link>
    </main>
  );
}

export default Welcome;
