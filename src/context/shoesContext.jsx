
// ShoesContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShoesContext = createContext();
 //Esto permite realizar la llamada a la API una sola vez y compartir los datos entre varios componentes

export const ShoesProvider = ({ children }) => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        const fetchShoes = async () => {
            try {
                const response = await axios.get('/shoes');
                setShoes(response.data);
            } catch (error) {
                console.error('Error fetching shoes:', error);
            }
        };

        fetchShoes();
    }, []);

    return (
        <ShoesContext.Provider value={{ shoes }}>
            {children}
        </ShoesContext.Provider>
    );
};
