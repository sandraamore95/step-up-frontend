
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { UserContextProvider } from './context/userContext'
import Navbar from '../src/components/Navbar'
import Footer from './components/Footer'
import {routes} from './routes'
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
//utilizamos la ruta principal para nuestros endpoints
// locahhost:8000/users
//locahost:8000/test


function App() {
  return (
    <UserContextProvider>
    <Navbar />
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
    <Footer />
  </UserContextProvider>


  )
}

export default App
