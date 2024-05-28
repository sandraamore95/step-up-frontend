import '../styles/DataUser.css'
import React from 'react';
import { useContext } from 'react'
import { UserContext } from '../context/userContext';

export default function DataUser() {
    const context = useContext(UserContext);
    const user = context.user; // recogemos el objeto user que generamos en el backend del controlador -> profile
  //DATA USER :
    /*
  
    */
  return (
    <div className="data-user-container">
    <h2>Perfil de Usuario</h2>
    <div className="section">
      <h3>Información Personal</h3>
      <p>Nombre: {user.name}</p>
      <p>Correo Electrónico: {user.email}</p>
    </div>
  
  

  </div>
  );
}
