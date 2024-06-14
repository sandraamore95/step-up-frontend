import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart-user');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (user) {
      console.log("somos usuario autenticado");
      const fetchCart = async () => {
        try {
          const response = await axios.get(`/cart/cart-user`);
          console.log(response.data.cart.products);
          setCartItems(response.data.cart.products);
          console.log("el carrito esta asi ", cartItems);
        } catch (error) {
          console.error('Error fetching cart for authenticated user:', error);
        }
      };

      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      console.log("estamos aqui porque somos usuario invitado");
      localStorage.setItem('cart-user', JSON.stringify(cartItems));
      console.log("el carrito esta asi ", cartItems);
    } else {
      //cuando eres usuario invitado con localstorage items y vas a iniciar sesion 
 console.log("eres usuario autenticado con items en el localstorage + backend cartUser");

 const savedCart = JSON.parse(localStorage.getItem('cart-user')) || []; console.log(savedCart);
      const saveCart = async () => {
        try {
          console.log(cartItems);
          if (cartItems.length != 0) {
          
            await axios.post(`/cart/add`, { cart: savedCart });
          }

        } catch (error) {
          console.error('Error saving cart for authenticated user:', error);
        }
      };

      saveCart();
    }
  }, [cartItems, user]); // cuando el usuario inicia sesion  || cuando el localStorage se añade al backend cambia el cartItems , asi que vuelve a empezar el useEffect()


  const addToCart = (product, quantity, size) => {
    // Buscar si el producto ya existe en el carrito con la misma talla
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product._id === product._id && item.size === size
    );
  
    // Si el producto ya existe en el carrito con la misma talla, se incrementa la cantidad
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // Si no existe, se añade un nuevo elemento al arreglo de productos
      const updatedCartItems = [
        ...cartItems,
        {
          product: {
            _id: product._id,
            // Agregar otras propiedades del producto si es necesario
          },
          quantity,
          size,
        },
      ];
  
      setCartItems(updatedCartItems);
      
    }
  };
  

  const updateQuantity = (productId, size, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateSize = (productId, oldSize, newSize) => {
    setCartItems(
      cartItems.map((item) =>
        item.product._id === productId && item.size === oldSize
          ? { ...item, size: newSize }
          : item
      )
    );
  };

  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter((item) => !(item.product._id === productId && item.size === size)));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, updateSize, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;