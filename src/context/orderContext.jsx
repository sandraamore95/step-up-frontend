import { createContext, useContext } from 'react';
import { CartContext } from './cartContext';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const OrderContext = createContext();

 const OrderProvider = ({ children }) => {
  const { cartItems} = useContext(CartContext);
  // Función para generar el PDF del pedido

  const generatePDF = (cartItems) => {
    const doc = new jsPDF();
  
    doc.setFontSize(20);
    doc.text("Resumen de tu Pedido", 14, 15);
  
    const tableColumn = ["Producto", "Tamaño", "Cantidad", "Precio Unitario", "Subtotal"];
    const tableRows = [];
  
    let totalPrice = 0;
  
    cartItems.forEach((item) => {
      const productTotal = item.product.price * item.quantity;
      totalPrice += productTotal;
  
      tableRows.push([
        `${item.product.brand} - ${item.product.model}`,
        item.size,
        item.quantity,
        `$${item.product.price.toFixed(2)}`,
        `$${productTotal.toFixed(2)}`
      ]);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: 'grid'
    });
  
    const finalY = doc.lastAutoTable.finalY || 25;
    doc.setFontSize(14);
    doc.text(`Precio Total: $${totalPrice.toFixed(2)}`, 14, finalY + 15);
  
    doc.save("pedido.pdf");
  };
    
 
  const startOrder = async () => {
    console.log(cartItems);
    generatePDF(cartItems);
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

}
  return (
    <OrderContext.Provider value={{ startOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;