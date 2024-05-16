
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/userContext';


const PrivateRoute = ({ element, ...rest }) => {
    const context = useContext( UserContext);
    const user = context.user; // recogemos el objeto user que generamos en el backend del controlador -> profile

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
