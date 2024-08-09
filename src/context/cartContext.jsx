import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

export const CartContext = createContext();

//PROBLEMAS PARA SOLUCIONAR
/*
1) LOCALSTORAGE AL RECARGAR LA PAGINA , SE VA ALA MIERDA EL CARRITOLOCAL - XXXXXXX
2) YA FUNCIONA LO DE ELIMINAR DE GOLPE REMOVE PARA LOCALSTORAGE INVITADOS - DONE
3) DISMINUIR Y AUMENTAR LA CANTIDAD DE LA ZAPATILLA EN LOCALSTORAGE INVITADOS - DONE
4) parte BACKEND - MIRAR ELIMINAR CANTIDAD , O REMOVE TOTAL , O SUMAR CANTIDAD TAMTBIEN  -XXXXXXX
5) si le das al boton borrar , antes de que le llegue el item al backend , poner el quantity a 0 

USUARIO INVITADO
SUMAR , RESTAR, ELIMINAR ---FUNCIONA
NO FUNCIONA : 
CUANDO  SE LE CAMBIA LA TALLA A UNA QUE YA TIENE , DEBERIA PONSERSELA EN EL PRODUCTO Q YA ESTA SUMANDOLE 


*/



const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart-user');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //USE EFFECT USUARIO AUTENTICADO -> BACKEND
  useEffect(() => {
    if (user) {
      console.log("USUARIO AUTENTICADO");
      const fetchCart = async () => {
        try {
          const response = await axios.get(`/cart/cart-user`);
          setCartItems(response.data.cart.products);
          console.log("el carrito esta asi ", cartItems);
        } catch (error) {
          console.error('Error fetching cart for authenticated user:', error);
        }
      };
      fetchCart();
    }
  }, [user]);


  // USE EFFECT USUARIO INVITADO -> LOCALSTORAGE
  useEffect(() => {
    if (!user) {
      console.log("USUARIO INVITADO");
      localStorage.setItem('cart-user', JSON.stringify(cartItems));
      console.log("el carrito esta asi ", cartItems);
    }
  }, [cartItems]);


  //USE EFFECT SINCRONIZACION CARRITO LOCALSTORAGE + BACKEND
  useEffect(() => {
    if (user) {
      const syncCartLocalWithBackend = async () => {
        try {
          const savedCart = JSON.parse(localStorage.getItem('cart-user')) || [];
          if (savedCart.length > 0) {
            console.log("sincronizando carrito local con backend");
            await axios.post(`/cart/add`, { cart: savedCart });
            localStorage.removeItem('cart-user');
          }
          // Fetch the updated cart from backend to ensure cartItems is up-to-date
          const response = await axios.get(`/cart/cart-user`);
          setCartItems(response.data.cart.products);
        } catch (error) {
          console.error('Error syncing local cart with backend:', error);
        }
      };
      syncCartLocalWithBackend();
    }
  }, [user]);


  //USE EFFFECT CUANDO EL USUARIO CIERRA SESION - DELETE LOCALSTORAGE CARRITO
  useEffect(() => {
    if (!user) {
      localStorage.removeItem('cart-user');
      setCartItems([])
    }
  }, [user]);



  const addToCart = async (newItem) => {
    try {

      if (user) {
        // Enviar el nuevo producto al backend para usuarios autenticados
        const response = await axios.post(`/cart/add`, { cart: [newItem] });
        const updatedCart = response.data.cart.products;
        setCartItems(updatedCart);

      } else {
        const productDetails = await axios.get(`/shoes/${newItem.product}`);
        console.log(productDetails.data);
        const fullNewItem = {
          ...newItem,
          product: productDetails.data
        };

        // Añadir el producto a local storage para usuarios invitados
        setCartItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(
            item => item.product._id === fullNewItem.product._id && item.size === fullNewItem.size
          );

          let updatedCart;
          if (existingItemIndex >= 0) {
            updatedCart = prevItems.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + fullNewItem.quantity }
                : item
            );
          } else {
            updatedCart = [...prevItems, fullNewItem];
          }

          localStorage.setItem('cart-user', JSON.stringify(updatedCart));
          return updatedCart;
        });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
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



  const removeFromCart = async (item) => {
    console.log('el producto ha borrar', item);
    const productId = item.product._id;
    const size = item.size;
    // primero tenemos que ver si es invitado o usuario
    if (!user) {
      console.log("es invitado");
      //recogemos el localCarrito
      let cart = JSON.parse(localStorage.getItem('cart-user')) || [];
      console.log(cart);
      // Filtrar el carrito para eliminar el producto
      cart = cart.filter(cartItem => !(cartItem.product._id === productId && cartItem.size === size));
      console.log(cart);
      // Guardar el carrito actualizado en el localStorage
      localStorage.setItem('cart-user', JSON.stringify(cart));
      // Actualizar el estado del carrito en el frontend
      setCartItems(cart);
    } else {
      console.log("Vamos a borrar del carrito del usuario auntenticado");
      item.quantity=0;
      console.log(item);

    try {
        const response = await axios.put('/cart/delete', {
          data: {
            product: item
          }
        });
        console.log(response.data.message);

        // Update the cart items in the frontend
        setCartItems(cartItems.filter((item) => !(item.product._id === productId && item.size === size)));
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }


  
    }



  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, updateSize, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;