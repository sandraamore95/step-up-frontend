import React, { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/SearchBar.css'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [shoes, setShoes] = useState([]); // Estado para almacenar todas las zapatillas
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Estado para controlar si se muestran los resultados
  const searchBarRef = useRef(null); // Ref para la barra de búsqueda


  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get('/shoes');
        setShoes(response.data);
      } catch (error) {
        console.error('Error al obtener las zapatillas:', error);
      }
    };

    fetchShoes();
  }, []);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() !== '') {
      const filteredShoes = shoes.filter((shoe) =>
        shoe.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredShoes);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      // Cerrar resultados si se hace clic fuera de la barra de búsqueda o de los resultados
      setShowResults(false);
      setSearchTerm('')
    }
  };

  useEffect(() => {
    // Agregar event listener al documento para detectar clics fuera de la barra de búsqueda y los resultados
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Eliminar event listener al desmontar el componente
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={searchBarRef} className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar zapatillas..."
        className="search-input"
      />
      {showResults && (
        <div className="search-results">
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <Link to={`/detailShoe/${result._id}`}>
                  <img src={result.images[0]} alt={`${result.brand} ${result.model}`} className="shoe-image" />    {result.brand} - {result.model}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}