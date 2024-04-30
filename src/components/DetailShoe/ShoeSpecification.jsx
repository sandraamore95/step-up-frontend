import React from 'react'

export default function ShoeSpecification({ shoe }) {
    return (
        <div className="text-left !important"> {/* Aplica la clase text-left aquí */}
            <h3>Información del producto</h3>
         <p>{shoe.description}</p>
        </div>
    );
}
