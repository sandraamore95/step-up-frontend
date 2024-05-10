
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

export default function Dashboard() {
    // const {user}=useContext(UserContext) 
    //La desestructuración es simplemente una forma más conveniente de extraer propiedades de objetos en JavaScript. 
    const context = useContext(UserContext);
    const user = context.user; // recogemos el objeto user que generamos en el backend del controlador -> profile
  
    useEffect(() => {
      console.log(user);
  }, []);


  return (
    <div>
    <h1>Dashboard</h1>
    <h2>Zapatillas guardadas</h2>
    {user && ( 
      <div>
        <h2>Hi {user.name}</h2>
        <h3>{user.email}</h3>
      </div>
    )}
  </div>
  )
}
