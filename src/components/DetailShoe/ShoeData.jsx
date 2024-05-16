import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../styles/ShoeData.css'
import { UserContext } from '../../context/userContext';
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom';



export default function ShoeData({ shoe }) {

  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const context = useContext( UserContext);
  const user = context.user; // recogemos el objeto user que generamos en el backend del controlador -> profile

  const [message, setMessage] = useState(''); //mensajes de error y success

  const updateQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const updateSize = (selectedSize) => {
    setSize(selectedSize);
  };

  const AddToCart = () => {
    // Lógica para añadir el producto al carrito
    console.log(user.name);
    console.log(`Añadir ${quantity} unidades de ${shoe.brand} ${shoe.model} al carrito`);
    console.log(`Con la talla elegida :  ${size}`);

  };



//AÑADIR A LISTA DE DESEOS 
  const AddToWish = () => {
    // se añade a la lista de favoritos si existe un usuario , si no , se pide que se registre.
    if(user){
      addToWishlist();
    }else{
      // le redirigimos a login
      navigate('/login', { state: { from: location.pathname } });

    }
  };

  const addToWishlist = async () => {
    try {
      // Realiza la solicitud POST al endpoint '/favorites/:shoeId'
      const response = await axios.post(`/favorites/${shoe._id}`, null, { 
        withCredentials: true, 
      });
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-primary">{shoe.brand} - {shoe.model}</h2>
          <h5 className="text-muted">${shoe.price}</h5>

          <div className="form-group">
            <div className="sizes">
              {shoe.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${size === size ? 'selected' : ''}`}
                  onClick={() => updateSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              min="1"
              value={quantity}
              onChange={updateQuantity}
            />
          </div>
          <div className="button-container">
            <button className="btn btn-primary" onClick={AddToCart}>
              Añadir al carrito
            </button>
            <button className="btn btn-outline-primary" onClick={AddToWish}>
              <i className='fas fa-heart'></i>
            </button>
            {message && <p>{message}</p>}
          </div>


        </div>
      </div>
    </div>


  );
}
