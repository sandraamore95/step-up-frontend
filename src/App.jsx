
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Routes, Route } from 'react-router-dom'
// axios connect bancked
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './context/userContext'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DetailShoe from './pages/DetailShoe'
import Footer from './components/Footer'
import ShoesList from './components/ShoeList'
import Collection from './pages/Collection'
import Catalog from './pages/Catalog'
import { ShoesProvider } from './context/shoesContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
//utilizamos la ruta principal para nuestros endpoints
// locahhost:8000/users
//locahost:8000/test


function App() {
  return (
    <UserContextProvider>
        <ShoesProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/catalogo' element={<Catalog />} />
        <Route path="/detailShoe/:id"  element={<DetailShoe />}/>
        <Route path="/collection"  element={<Collection />}/>
      </Routes>
      <Footer />
      </ShoesProvider>
    </UserContextProvider>
  )
}

export default App
