import { createContext, useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

export const CartContext = createContext();


const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart-user');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Referencia para rastrear si el usuario alguna vez estuvo autenticado
  const wasAuthenticatedRef = useRef(false);

 // USE EFFECT - Sincronización del carrito con el backend cuando el usuario se logea
 useEffect(() => {
  console.log("ESTAMOS EN EL USE EFFECT USUARIO AUTENTICADO");
  if (user && !wasAuthenticatedRef.current) {
    console.log("estamos en ya se autentico una vez");
    wasAuthenticatedRef.current = true; // Marca que ya se autenticó una vez
    const syncCartLocalWithBackend = async () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem('cart-user')) || [];
        if (savedCart.length > 0) {
          console.log("Sincronizando carrito con backend...");
          // Primero, sincroniza el carrito local con el backend
          await axios.post(`/cart/add`, { cart: savedCart });

          // Una vez sincronizado, elimina el carrito de localStorage
          localStorage.removeItem('cart-user');
        }

        // Luego, actualiza el estado con el carrito del backend
        const response = await axios.get(`/cart/cart-user`);
        setCartItems(response.data.cart.products);
      } catch (error) {
        console.error('Error sincronizando el carrito con el backend:', error);
      }
    };
    syncCartLocalWithBackend();
  }
}, [user]);


  // USE EFFECT - Actualización de carrito para el usuario INVITADO
  useEffect(() => {
    if (!user) {
      console.log("USUARIO INVITADO");
      // Sincroniza el carrito de invitado en localStorage
      localStorage.setItem('cart-user', JSON.stringify(cartItems));
    }
  }, [cartItems]);


  // USE EFFECT - Cuando el usuario cierra sesión, elimina el carrito de localStorage
  useEffect(() => {
    if (!user && wasAuthenticatedRef.current) {
      console.log("El usuario ha cerrado sesión. Limpiando carrito.");
      localStorage.removeItem('cart-user'); // Elimina el carrito en localStorage
      setCartItems([]); // Limpiar carrito en el estado de React
      wasAuthenticatedRef.current = false;
    }
  }, [user]);

  // Agrega un producto al carrito
  const addToCart = async (newItem) => {
    if (!newItem || !newItem.product || !newItem.size || newItem.quantity <= 0) {
      console.error('Producto inválido:', newItem);
      return;
    }

    try {
      if (user) {
        const response = await axios.post(`/cart/add`, { cart: [newItem] });
        setCartItems(response.data.cart.products);
      } else {
        const productDetails = await axios.get(`/shoes/${newItem.product}`);
        const fullNewItem = { ...newItem, product: productDetails.data };

        setCartItems((prevItems) => {
          const existingIndex = prevItems.findIndex(
            (item) =>
              item.product._id === fullNewItem.product._id &&
              item.size === fullNewItem.size
          );

          let updatedCart;
          if (existingIndex >= 0) {
            updatedCart = prevItems.map((item, index) =>
              index === existingIndex
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
    // Primero, actualizamos el carrito con la nueva cantidad
    setCartItems((prevItems) => {
      // Mapeamos todos los items y actualizamos el que corresponda
      const updatedCart = prevItems.map((item) =>
        item.product._id === productId && item.size === size
          ? { ...item, quantity }  // Actualiza la cantidad
          : item
      );

      // Crear el item actualizado (nuevo item con los valores correctos)
      const updatedItem = updatedCart.find(item => item.product._id === productId && item.size === size);

      // Sincronizar con el backend usando manageCartItem
      if (user) {
        console.log('Nuevo item creado:', updatedItem);
        manageCartItem(updatedItem); // Llamamos con el nuevo item
      }else{
          localStorage.setItem('cart-user', JSON.stringify(updatedCart));
      }

      // Retornamos el carrito actualizado
      return updatedCart;
    });
  };

  // Actualiza la talla de un producto
  const updateSize = (productId, oldSize, newSize) => {
    // Actualiza el carrito en el frontend
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];

      // Encuentra el índice del producto original
      const originalIndex = updatedCart.findIndex(
        (item) => item.product._id === productId && item.size === oldSize
      );

      // Encuentra si ya existe un producto con la nueva talla
      const targetIndex = updatedCart.findIndex(
        (item) => item.product._id === productId && item.size === newSize
      );

      if (originalIndex !== -1) {
        if (targetIndex !== -1) {
          console.log("ACTUALIZAR TALLA A UN PRODUCTO EXISTENTE");
          // Combina las cantidades y elimina el producto original
          updatedCart[targetIndex].quantity += updatedCart[originalIndex].quantity;
          updatedCart.splice(originalIndex, 1);
        } else {
          console.log("ACTUALIZAR TALLA A UN PRODUCTO");
          updatedCart[originalIndex].size = newSize;
        }
      } else {
        console.warn("No se encontró el producto para actualizar la talla.");
      }

      console.log("Carrito actualizado en frontend:", updatedCart);
      return updatedCart; // Devuelve el carrito actualizado
    });

    // Datos del producto actualizado
    const updatedItem = {
      product: { _id: productId },
      size: newSize,
      quantity:
        cartItems.find(
          (item) => item.product._id === productId && item.size === oldSize
        )?.quantity || 0,
    };

    console.log("Producto con talla actualizada:", updatedItem);

    try {
      if (user) {
        console.log("ACTUALIZAR CANTIDAD CON USUARIO LOGIN");
        manageCartItem(updatedItem); // Nota: Quitamos 'await' si manageCartItem no es async
      } else {
        localStorage.setItem('cart-user', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };


  // Maneja el carrito del usuario backend
  const manageCartItem = async (item) => {
    console.log("Managing cart item:", item);
    const productId = item.product._id;
    const size = item.size;
    try {
      if (user) {
        console.log("Sincronizando con el backend...");
        // Actualiza el carrito en el backend
        await axios.put('/cart/update', {
          data: { product: item }
        });
      }
      
      // Luego, actualizar el carrito en el frontend
      setCartItems((prevItems) => {
        // Filtra el producto original
        const updatedCart = prevItems.map((cartItem) =>
          cartItem.product._id === productId && cartItem.size === size
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        );
  
        // Sincroniza con localStorage si no estás autenticado
        if (!user) {
          localStorage.setItem("cart-user", JSON.stringify(updatedCart));
        }
  
        return updatedCart;
      });
  
      console.log("Carrito actualizado en el frontend");
    } catch (error) {
      console.error("Error al manejar el carrito:", error);
      alert("Hubo un problema al actualizar el carrito. Por favor, intenta nuevamente.");
    }
  };

  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, updateSize, manageCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

