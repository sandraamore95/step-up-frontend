import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CartContext from '../context/cartContext';
 // const [cartItems, setCartItems] = useState([]);

 export default function CartUser() {
  const { cart, setCart, updateQuantity } = useContext(CartContext);
  const [shoe, setShoe] = useState(null);
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    console.log(cart);

    const ids = Object.keys(cart);
    const quantities = ids.map((id) => cart[id]);
    const id = ids[0];
    console.log(quantities);

    setQuantity(quantities);
    const fetchShoe = async () => {
      try {
        const response = await axios.get(`/shoes/${id}`);
        console.log(response.data);
        setShoe(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del zapato:', error);
      }
    };
    fetchShoe();
  }, []);


  const handleRemove = () => {
    console.log(quantity);
  };

  const handleIncrease = () => {
    console.log(quantity);
    setQuantity(Number(quantity) + 1);
    updateQuantity(shoe._id,Number(quantity))

  };

  const handleDecrease = () => {
    console.log(quantity);
  };


  return (
    <div className="container">
      <h2 className="text-center">Carrito de Usuario</h2>
      {shoe && (
        <>
        
          <Link to={`/detailShoe/${shoe._id}`}>
                        <img src={shoe.images[0]} className="card-img-top" alt={`Imagen de ${shoe.brand}`} />
                      </Link>
                      <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{shoe.model}</h5>
                      <p className="card-text">Cantidad: {quantity}</p>
                      <p className="card-text">Precio: {shoe.price}</p>
                      <div className="btn-group" role="group" aria-label="Opciones">
                        <button type="button" className="btn btn-secondary" onClick={() => handleIncrease()}>+</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleDecrease()}>-</button>
                        <button type="button" className="btn btn-danger" onClick={() => handleRemove()}>Eliminar</button>
                      </div>
                      <Link to={`/detailShoe/${shoe._id}`} className="btn btn-primary mt-2">Ver Detalles</Link>
                    </div>
                  </div>
                
        </>
      )}
    </div>
  );






  /*
  
   
  
  
  
  
  
  
    useEffect(() => {
      // Función para obtener los elementos del carrito del usuario
      const fetchUserCart = async () => {
        try {
          const response = await axios.get(`cart/cart-user`);
          console.log(response.data.cart.products);
          setCartItems(response.data.cart.products);
        } catch (error) {
          console.error('Error al obtener el carrito del usuario:', error);
        }
      };
  
      fetchUserCart();
    }, [userId]); // Se ejecuta cada vez que cambia el userId
  
  
    const handleRemove = (index) => {
      removeFromCart(index);
    };
  
    const handleIncrease = (index) => {
      updateQuantity(index, cartItems[index].quantity + 1);
    };
  
    const handleDecrease = (index) => {
      if (cartItems[index].quantity > 1) {
        updateQuantity(index, cartItems[index].quantity - 1);
      }
    };
    
    return (
      <div className="container">
        <h2 className="text-center">Carrito de Usuario</h2>
        <div className="row">
          {cartItems.map((cart, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={cart.product.images[0]} className="img-fluid rounded-start" alt={cart.product.model} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{cart.product.model}</h5>
                      <p className="card-text">Cantidad: {cart.quantity}</p>
                      <p className="card-text">Precio: {cart.product.price}</p>
                      <div className="btn-group" role="group" aria-label="Opciones">
                        <button type="button" className="btn btn-secondary" onClick={() => handleIncrease(index)}>+</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleDecrease(index)}>-</button>
                        <button type="button" className="btn btn-danger" onClick={() => handleRemove(index)}>Eliminar</button>
                      </div>
                      <Link to={`/detailShoe/${cart.product._id}`} className="btn btn-primary mt-2">Ver Detalles</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
  
  
  */

}
