// OrderContext.js
import { createContext, useContext } from 'react';
import { CartContext } from './cartContext';
import { generatePDF } from '../utils/utils';  // Importa la función desde utils.js

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const { cartItems } = useContext(CartContext);

  // Función para iniciar el pedido (llama a la función de PDF)
  const startOrder = async () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    console.log(cartItems);
    generatePDF(cartItems);  // Llama a la función de generar PDF
  };

  return (
    <OrderContext.Provider value={{ startOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
