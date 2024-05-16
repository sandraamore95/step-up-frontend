import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function WishList() {
    const [favoriteShoes, setFavoriteShoes] = useState([]);

  useEffect(() => {
    const fetchFavoriteShoes = async () => {
      try {
        const response = await axios.get(`/favoriteShoes`);
        setFavoriteShoes(response.data.favoriteShoes.shoes); 
      } catch (error) {
        console.error('Error al obtener las zapatillas favoritas del usuario:', error);
      }
    };

    fetchFavoriteShoes(); // Llama a la función para obtener los detalles del zapato al cargar el componente
  }, []); // El efecto se ejecutará cada vez que cambie el ID en la URL

  // Si no hay zapatillas favoritas
  if (favoriteShoes.length === 0) {
    return <div>No hay zapatillas favoritas.</div>;
  }

 
  return (
<div className="container mt-4">
  <h3>Zapatillas Favoritas</h3>
  <ul>
  {favoriteShoes.map((shoe, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <Link to={`/detailShoe/${shoe._id}`}>
                                <img src={shoe.images[0]} className="card-img-top" alt={`Imagen de ${shoe.brand}`} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{shoe.brand} - {shoe.model}</h5>
                            </div>
                        </div>
                    </div>
                ))}
  </ul>
</div>
  
  );
}
