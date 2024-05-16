// Importa Navigate y Route de react-router-dom en tu archivo PrivateRoute.js
import {Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/userContext';


const PrivateRoute = ({ children }) => {
    const context = useContext(UserContext);
    const user = context.user;

    if (user) {
        return children
    } else {
        return <Navigate to='/login' />
    }
}

export default PrivateRoute;
