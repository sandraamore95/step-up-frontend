import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/WishListStyle.css'

export default function WishList() {
  const [favoriteShoes, setFavoriteShoes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const shoesPerPage = 6;

  useEffect(() => {
    const fetchFavoriteShoes = async () => {
      try {
        const response = await axios.get(`/favorites`);
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
  // Calcular los índices de los zapatos actuales
  const indexOfLastShoe = currentPage * shoesPerPage;
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentShoes = favoriteShoes.slice(indexOfFirstShoe, indexOfLastShoe);

   // Cambiar de página
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   return (
    <div className="container mt-4">
      <h3>Zapatillas Favoritas</h3>
      <div className="row">
        {currentShoes.map((shoe, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <Link to={`/detailShoe/${shoe._id}`}>
                <img src={shoe.images[0]} className="card-img-top" alt={`Imagen de ${shoe.brand}`} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{shoe.brand} - {shoe.model}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        shoesPerPage={shoesPerPage}
        totalShoes={favoriteShoes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

// Componente de Paginación
const Pagination = ({ shoesPerPage, totalShoes, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalShoes / shoesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};