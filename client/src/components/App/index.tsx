import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../Welcome';
import Site from '../Site';
import './style.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<Site />} />
    </Routes>
  );
}

export default App;
