import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { UserContext } from '../context/userContext';
import { CartContext } from '../context/cartContext';

export default function Navbar() {
  const { user, logoutUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  //necesitamos el user -> para poder hacer las condiciones necesarias para mostrar los links 
  // necesmoa el logoutUser -> para poder cerrar la sesion de localStorage

  const logout = () => {
    // Realizar la lógica de logout, por ejemplo, limpiar el usuario del estado
    logoutUser();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi Tienda de Zapatillas</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">Catalogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Contacto</Link>
            </li>

          </ul>
          <ul className="navbar-nav ms-auto">
            <SearchBar />

            {user ? (
              <>

                {user.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/operations">Operaciones</Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Perfil</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>Cerrar Sesión</button>
                </li>
              </>

            ) :

              //si no hay user autenticado se muestran estos links

              (

                <>

                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}

            <li className="nav-item">
              <Link className="nav-link" to="/cart-user">
                <i className="fas fa-shopping-cart"></i>
                <span>{totalItems}</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}