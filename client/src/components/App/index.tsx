import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../Welcome';
import Site from '../Site';
import Footer from '../Footer';
import Home from '../Home';
import './style.css';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<Site />} />
    </Routes>
  </>
);

export default App;
