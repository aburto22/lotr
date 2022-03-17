import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../Welcome';
import './style.css';

const App = () => (
  <>
    <Routes>
      <Route path='/' element={<Welcome />} />
    </Routes>
  </>
);

export default App;
