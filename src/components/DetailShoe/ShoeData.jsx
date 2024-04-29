import React from 'react'

export default function ShoeData({ shoe }) {
    return (
        <div>
          <h3>{shoe.brand} - {shoe.model}</h3>
          <p>Tamaño: {shoe.size}</p>
          <p>Precio: ${shoe.price}</p>
          <p>Color: {shoe.color}</p>
          <p>Popularity : {shoe.popularity}</p>
          <p>Información adicional: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="btn btn-primary">Añadir al carrito</button>
        </div>
      );
}
