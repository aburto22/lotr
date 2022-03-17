import React from 'react';
import './style.css';

const NotFound = () => {
  return (
    <main className="not-found-main">
      <div className="not-found-main__content">
        <h1 className="not-found-main__title">You shall not pass!</h1>
        <p className="not-found-main__text">Unfortunately we couldn't find the site you were looking. Use the menu above to get back to our site</p>
      </div>
    </main>
  );
}

export default NotFound;
