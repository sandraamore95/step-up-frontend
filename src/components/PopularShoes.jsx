import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PopularShoes.css'
import { ShoesContext } from '../context/shoesContext';

export default function PopularShoes() {
    const { shoes } = useContext(ShoesContext);

    // Ordenar las zapatillas según su popularidad (de mayor a menor) sin modificar el array original
    const popularShoes = [...shoes].sort((a, b) => b.popularity - a.popularity).slice(0, 8); // Mostrar solo las 8zapatillas más populares

    return (
        <div className="container mt-4">
            <h2>Las 10 zapatillas más populares entre nuestros usuarios</h2>
            <div className="popular-shoes">
                {popularShoes.map((shoe) => (
                    <div key={shoe._id} className="shoe-card">
                        <Link to={`/detailShoe/${shoe._id}`}>
                            <img src={shoe.images[0]} className="card-img-top" alt={`Imagen de ${shoe.brand} ${shoe.model}`} />
                        </Link>

                    </div>
                ))}
            </div>
            <Link className='btn btn-primary' to={`/catalogo`}>
                Ver el Catálogo
            </Link>
        </div>
    )
}
