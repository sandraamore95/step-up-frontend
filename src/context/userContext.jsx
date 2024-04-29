import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

// Crea un contexto llamado UserContext
export const UserContext = createContext({});

// Define un componente llamado UserContextProvider que actúa como el proveedor de contexto
export function UserContextProvider({ children }) {
    // Define el estado local user y la función setUser para actualizar ese estado
    const [user, setUser] = useState(null);

    // Utiliza useEffect para realizar la solicitud HTTP cuando el componente se monta por primera vez
    useEffect(() => {
        // Verifica si el estado user es nulo (esto previene un bucle infinito)
        if (!user) {
            // Realiza una solicitud HTTP GET a '/profile' utilizando Axios
            axios.get('/profile').then(({ data }) => {
                // Actualiza el estado user con los datos obtenidos de la respuesta
                setUser(data);
            });
        }
    }, []);

    // Devuelve el proveedor de contexto UserContext.Provider con el valor user y setUser
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
