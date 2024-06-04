import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';

 export default function CartUser() {
  const { cartItems, updateQuantity, updateSize, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={`${item.product._id}-${item.size}`}>
              <img src={item.product.images[0]} alt={item.product.name} />
              <p>{item.product.name}</p>
              <p>Price: ${item.product.price}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>

              <label htmlFor={`quantity-${item.product._id}-${item.size}`}>Quantity:</label>
              <select
                id={`quantity-${item.product._id}-${item.size}`}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product._id, item.size, parseInt(e.target.value))}
              >
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <label htmlFor={`size-${item.product._id}-${item.size}`}>Size:</label>
              <select
                id={`size-${item.product._id}-${item.size}`}
                value={item.size}
                onChange={(e) => updateSize(item.product._id, item.size, e.target.value)}
              >
                {item.product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <button onClick={() => removeFromCart(item.product._id, item.size)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

