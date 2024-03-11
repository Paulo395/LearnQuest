// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Aluno from './Aluno';
import Admin from './Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/aluno" element={<Aluno />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
