
import React, { useEffect,useState } from 'react'
import { useContext } from 'react'
import '../styles/Dashboard.css'
import { UserContext } from '../context/userContext'
import Login from './Login';
import WishList from './WishList';
import Register from './Register';

export default function Dashboard() {
    // const {user}=useContext(UserContext) 
    //La desestructuración es simplemente una forma más conveniente de extraer propiedades de objetos en JavaScript. 
    const context = useContext(UserContext);
    const user = context.user; // recogemos el objeto user que generamos en el backend del controlador -> profile
  
    const [selectedOption, setSelectedOption] = useState('edit-info');

    const handleOptionChange = (option) => {
      setSelectedOption(option);
    };
  
    const renderSelectedComponent = () => {
      switch (selectedOption) {
        case 'edit-info':
          return <Login />;
        case 'favorites':
          return <WishList />;
        case 'orders':
          return <Register />;
        default:
          return null;
      }
    };
  
    return (
      <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="menu-container">
            <h3>Menú</h3>
            <ul className="menu-list">
              <li className={selectedOption === 'edit-info' ? 'active' : ''} onClick={() => handleOptionChange('edit-info')}>Editar Información</li>
              <li className={selectedOption === 'favorites' ? 'active' : ''} onClick={() => handleOptionChange('favorites')}>Lista de Favoritos</li>
              <li className={selectedOption === 'orders' ? 'active' : ''} onClick={() => handleOptionChange('orders')}>Ver Pedidos</li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          {renderSelectedComponent()}
        </div>
      </div>
    </div>
    );
  }