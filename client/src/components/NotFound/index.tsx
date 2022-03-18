import React, { useEffect } from 'react';
import { scrollToTop } from '../../services/ui';
import './style.css';

const NotFound = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <main className="not-found-main">
      <h1 className="not-found-main__title">You shall not pass!</h1>
      <p className="not-found-main__text">Unfortunately we couldn't find the site you were looking. Use the menu above to get back to our site</p>
    </main>
  );
}

export default NotFound;
