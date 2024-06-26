import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/auth/profile');
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setUser(null);
        localStorage.removeItem('user');
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, []);

  const loginUser = (userData) => {
    console.log("estamos en usercontext - login");
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser =async() => {
    setUser(null);
    localStorage.removeItem('user');
    //llamar al endpoint del backend /logout para eliminar la cookie token
    try {
      const response = await  axios.post('/auth/logout');
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al eliminar las cookies :', error);
   
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
