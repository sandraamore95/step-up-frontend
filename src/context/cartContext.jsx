import { createContext, useState, useEffect,useContext } from 'react';
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
      const fetchCart = async () => {
        try {
          const response = await axios.get(`/cart/cart-user`);
          setCartItems(response.data.cart);
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
    } else {
      // Optionally, save the cart to the backend for authenticated users
      const saveCart = async () => {
        try {
          await axios.post(`/cart/add`, { cart: cartItems });
        } catch (error) {
          console.error('Error saving cart for authenticated user:', error);
        }
      };

      saveCart();
    }
  }, [cartItems, user]);

  const addToCart = (product, quantity, size) => {
      // Buscar si el producto ya existe en el carrito con la misma talla
    const existingItem = cartItems.find(
      (item) => item.product._id === product._id && item.size === size
    );
    //si el producto ya existe en el carrito con la misma talla, se incrementa la cantidad en lugar de añadir un nuevo elemento.
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item // se devuelve el item actual sin cambios
        )
      );
    } else {
      //crear un nuevo arreglo que es una copia de cartItems, con un objeto adicional agregado al final
      setCartItems([...cartItems, { product, quantity, size }]);
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