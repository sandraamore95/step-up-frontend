
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { UserContextProvider } from './context/userContext'
import { ShoesProvider } from './context/shoesContext';
import Navbar from '../src/components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import DetailShoe from './pages/DetailShoe';
import Collection from './pages/Collection';
import Dashboard from './pages/Dashboard'
import PrivateRoute from './privateRoute';
import WishList from './pages/WishList';
import DataUser from './pages/DataUser';
import CartUser from './pages/CartUser';
import { CartProvider } from './context/cartContext';





axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
//utilizamos la ruta principal para nuestros endpoints
// locahhost:8000/users
//locahost:8000/test


function App() {
  return (
    <UserContextProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShoesProvider><Home /></ShoesProvider>} />
          <Route path="/catalogo" element={<ShoesProvider><Catalog /></ShoesProvider>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detailShoe/:id" element={<DetailShoe />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart-user" element={<CartUser />} />
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path="/wishList" element={<PrivateRoute> <WishList /> </PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute> <DataUser /> </PrivateRoute>} />
        </Routes>
        <Footer />
      </CartProvider>
    </UserContextProvider>


  )
}

export default App
