import { createContext, useState, useEffect, useContext,useRef } from 'react';
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

    // Referencia para rastrear si el usuario alguna vez estuvo autenticado
    const wasAuthenticatedRef = useRef(false);

  //USE EFFECT SINCRONIZACION CARRITO LOCALSTORAGE + BACKEND
  useEffect(() => {
    if (user && !wasAuthenticatedRef.current) {
      wasAuthenticatedRef.current = true; // Marca que ya se autenticó una vez
      const syncCartLocalWithBackend = async () => {
        try {
          const savedCart = JSON.parse(localStorage.getItem('cart-user')) || [];
          if (savedCart.length > 0) {
            await axios.post(`/cart/add`, { cart: savedCart });
            localStorage.removeItem('cart-user');
          }
          const response = await axios.get(`/cart/cart-user`);
          setCartItems(response.data.cart.products);
        } catch (error) {
          console.error('Error syncing cart with backend:', error);
        }
      };
      syncCartLocalWithBackend();
    }
  }, [user]);

  // USE EFFECT USUARIO INVITADO -> LOCALSTORAGE
    useEffect(() => {
      if (!user) {
        console.log("USUARIO INVITADO");
        localStorage.setItem('cart-user', JSON.stringify(cartItems));
      }
    }, [cartItems]);


  //USE EFFFECT CUANDO EL USUARIO CIERRA SESION - DELETE LOCALSTORAGE CARRITO
   useEffect(() => {
    if (!user && wasAuthenticatedRef.current) {
      localStorage.removeItem('cart-user');
      setCartItems([]);
      wasAuthenticatedRef.current = false; // Resetea la referencia
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

// Actualiza la cantidad de un producto
const updateQuantity = (productId, size, quantity) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.product._id === productId && item.size === size
        ? { ...item, quantity }
        : item
    )
  );
};

// Actualiza la talla de un producto
const updateSize = (productId, oldSize, newSize) => {
  setCartItems((prevItems) => {
    const existingIndex = prevItems.findIndex(
      (item) => item.product._id === productId && item.size === oldSize
    );
    const targetIndex = prevItems.findIndex(
      (item) => item.product._id === productId && item.size === newSize
    );

    if (existingIndex >= 0 && targetIndex >= 0) {
      const updatedCart = [...prevItems];
      updatedCart[targetIndex].quantity += updatedCart[existingIndex].quantity;
      updatedCart.splice(existingIndex, 1);
      return updatedCart;
    }

    return prevItems.map((item, index) =>
      index === existingIndex ? { ...item, size: newSize } : item
    );
  });
};

// Elimina un producto del carrito
const removeFromCart = async (item) => {
  //const { product, size } = item;
  console.log('el producto ha borrar', item);
  const productId = item.product._id;
  const size = item.size;
  try {
    if (user) {
      console.log("vamos a updatear o deletear somos usuario autenticado");
      await axios.put('/cart/delete', {
          data: {
            product: item
          }
        });
    }
    // Update the cart items in the frontend
    setCartItems(cartItems.filter((item) => !(item.product._id === productId && item.size === size)));
    if (!user) {
      console.log("es invitado");
      //recogemos el localCarrito
      localStorage.setItem('cart-user', JSON.stringify(cartItems));
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, updateSize, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;




/*

const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart-user');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // USE EFFECT - Sincronización carrito cuando el usuario cambia de estado (de invitado a autenticado)
  useEffect(() => {
    if (user) {
      // Si el usuario está autenticado, se sincroniza el carrito del localStorage con el backend
      const syncCartWithBackend = async () => {
        try {
          const savedCart = JSON.parse(localStorage.getItem('cart-user')) || [];
          if (savedCart.length > 0) {
            console.log("Sincronizando carrito local con backend");
            // Sincroniza el carrito en el backend
            // El carrito localstorage save Base de datos
            await axios.post(`/cart/add`, { cart: savedCart });

            // Una vez sincronizado, eliminamos el carrito de localStorage
            localStorage.removeItem('cart-user');
          }

          // Luego, obtenemos el carrito actualizado desde el backend
          const response = await axios.get(`/cart/cart-user`);
          setCartItems(response.data.cart.products);
        } catch (error) {
          console.error('Error syncing cart with backend:', error);
        }
      };

      syncCartWithBackend();
    }
  }, [user]);


  useEffect(() => {
    if (!user) {
      // Guardamos el carrito del invitado en el localStorage
      localStorage.setItem('cart-user', JSON.stringify(cartItems));
      console.log("El carrito ahora es:", cartItems);
    }
  }, [cartItems]); // Este useEffect se ejecuta cada vez que cambia cartItems

   // USE EFFECT - Eliminar carrito en localStorage cuando el usuario cierra sesión
   useEffect(() => {
    if (!user) {
      console.log("El usuario ha cerrado sesión. Limpiando carrito local.");
      
      // Solución: solo limpiamos el carrito de localStorage cuando el estado se ha sincronizado correctamente
      localStorage.removeItem('cart-user'); 
      setCartItems([]);  // Limpiar carrito en el estado de React
    }
  }, [user]);  // Solo se activa cuando el estado de 'user' cambia

  useEffect(() => {
    if (!user) {
      // Guardamos el carrito del invitado en el localStorage
      localStorage.setItem('cart-user', JSON.stringify(cartItems));
      console.log("El carrito ahora es:", cartItems);
    }
  }, [cartItems]); // Este useEffect se ejecuta cada vez que cambia cartItems


const addToCart = async (newItem) => {
  try {
    if (user) {
      // Enviar al backend para usuarios autenticados
      const response = await axios.post(`/cart/add`, { cart: [newItem] });
      const updatedCart = response.data.cart.products;
      setCartItems(updatedCart);
    } else {
      const productDetails = await axios.get(`/shoes/${newItem.product}`);
      const fullNewItem = { ...newItem, product: productDetails.data };

      // Actualiza el carrito en el estado
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

        // Guardar en localStorage
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
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.product._id === productId && item.size === oldSize) {
          return { ...item, size: newSize }; // Actualiza la talla
        }
        return item;
      });
    });
  };


  const removeFromCart = async (item) => {
    const productId = item.product._id;
    const size = item.size;
  
    if (!user) {
      // Si es usuario invitado, actualizamos el carrito en localStorage
      let cart = JSON.parse(localStorage.getItem('cart-user')) || [];
      cart = cart.filter(cartItem => !(cartItem.product._id === productId && cartItem.size === size));
      localStorage.setItem('cart-user', JSON.stringify(cart));
      setCartItems(cart); // Actualiza el carrito en el estado
    } else {
      // Si es usuario autenticado, enviamos al backend para eliminar el producto
      try {
        await axios.put('/cart/delete', { productId, size }); // Asegúrate de que el backend esté esperando estos datos
        setCartItems(prevItems => prevItems.filter(item => !(item.product._id === productId && item.size === size)));
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


*/