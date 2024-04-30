import React, { useState, useEffect, useRef } from 'react';
import '../../styles/ShoeData.css'

export default function ShoeData({ shoe }) {

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  const updateQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const updateSize = (selectedSize) => {
    setSize(selectedSize);
  };
  const AddToCart = () => {
    // Lógica para añadir el producto al carrito
    console.log(`Añadir ${quantity} unidades de ${shoe.brand} ${shoe.model} al carrito`);
    console.log(`Con la talla elegida :  ${shoe.size}`);

  };




  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-primary">{shoe.brand} - {shoe.model}</h2>
          <h5 className="text-muted">${shoe.price}</h5>

          <div className="form-group">
            <div className="sizes">
              {shoe.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${size === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              min="1"
              value={quantity}
              onChange={updateQuantity}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={AddToCart}>Añadir al carrito</button>

        </div>
      </div>
    </div>


  );
}
