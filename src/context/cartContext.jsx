import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
  

    const updateQuantity = (id, cantidad) => {
        console.log(cantidad);
        setCart((prevCart) => {
          const newCart = { ...prevCart };
          if (newCart[id]) {
            newCart[id] += cantidad;
          } else {
            newCart[id] = cantidad;
          }
          return newCart;
        });
      };

      
    return (
      <CartContext.Provider value={{ cart, setCart,  updateQuantity }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export default CartContext;