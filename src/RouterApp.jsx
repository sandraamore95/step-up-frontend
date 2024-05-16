// RouterApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import DetailShoe from './pages/DetailShoe';
import Collection from './pages/Collection';

export default function RouterApp() {
  return (
    <>

  
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/detailShoe/:id" element={<DetailShoe />} />
      <Route path="/collection" element={<Collection />} />

    
  </>
);
}
