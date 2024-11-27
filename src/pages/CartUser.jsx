import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { OrderContext } from '../context/orderContext';




export default function CartUser() {
  const { cartItems, updateQuantity, updateSize, manageCartItem } = useContext(CartContext);
  const { startOrder } = useContext(OrderContext);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };
  useEffect(() => {
    console.log('CartItems length:', cartItems.length);
    console.log('CartItems:', cartItems);
  }, [cartItems]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {cartItems.map((item) => (
                <div key={`${item.product._id}-${item.size}`} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <img
                      src={item.product.images?.[0] || '/default-image.jpg'}
                      className="card-img-top"
                      alt={item.product.model || 'Producto sin modelo'}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.product.brand} - {item.product.model}
                      </h5>

                      <div className="form-group">
                        <label htmlFor={`quantity-${item.product._id}-${item.size}`}>Cantidad:</label>
                        <select
                          id={`quantity-${item.product._id}-${item.size}`}
                          className="form-control"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product._id, item.size, parseInt(e.target.value))}
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor={`size-${item.product._id}-${item.size}`}>Tamaño:</label>
                        <select
                          id={`size-${item.product._id}-${item.size}`}
                          className="form-control"
                          value={item.size}
                          onChange={(e) => updateSize(item.product._id, item.size, e.target.value)}
                        >
                          {item.product.sizes?.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        className="btn btn-danger mt-3"
                        onClick={() => {
                          updateQuantity(item.product._id, item.size, 0); // Actualiza la cantidad a 0
                          const itemToDelete = { ...item, quantity: 0 }; // Crea un objeto con cantidad 0
                          manageCartItem(itemToDelete); // Llamamos a la función para manejar la eliminación
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">

            <div className="card-body">
              <h5 className="card-title">Resumen del pedido</h5>
              <div className="card-text">
                <p>Subtotal: ${getTotalPrice()}</p>
                <p>Envío: Gratis</p>
                <p>Total: ${getTotalPrice()}</p>
                <p>Impuestos incluidos</p>
              </div>
              <button onClick={startOrder} className="btn btn-primary btn-block">
                Comenzar pedido
              </button>
              <div className="mt-3">
                <p>Envío gratis a partir de 30 €</p>
                <p>Devolución gratuita en 30 días</p>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}