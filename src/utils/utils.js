// utils.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Función para generar el PDF
export const generatePDF = (cartItems) => {
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
