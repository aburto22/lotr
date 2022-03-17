import React from 'react';
import './style.css';

const Home = () => {
  return (
    <main className="home-main">
      <div className="home-main__content">
        <h1 className="home-main__title">Welcome to The Lord of the Ring quote website</h1>
        <p className="home-main__text home-main__text--primary">A website to rule them all.</p>
        <p className="home-main__text">Here you can find information about characters, quotes and more from the Lord of the Rings.</p>
        <p className="home-main__text">To start your journey, just use the navigation menu to go over the different categories we have for you.</p>
        <p className="home-main__text">Safe journey!</p>
      </div>
    </main>
  );
}

export default Home;
