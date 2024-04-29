import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ShoeGallery from '../components/DetailShoe/ShoeGallery';
import ShoeData from '../components/DetailShoe/ShoeData';

export default function DetailShoe() {

  const { id } = useParams(); // Obtén el parámetro de la URL
  const [shoe, setShoe] = useState(null); // Estado para almacenar los detalles del zapato

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener los detalles del zapato con el ID proporcionado
    const fetchShoe = async () => {
      try {
        const response = await axios.get(`/shoes/${id}`);
        setShoe(response.data); // Almacena los detalles del zapato en el estado
      } catch (error) {
        console.error('Error al obtener los detalles del zapato:', error);
      }
    };

    fetchShoe(); // Llama a la función para obtener los detalles del zapato al cargar el componente
  }, [id]); // El efecto se ejecutará cada vez que cambie el ID en la URL

  // Si el estado shoe es null, muestra un mensaje de carga
  if (!shoe) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-4">
    <h2 className="text-center mb-4">Detalles del Zapato</h2>
    <div className="row">
      <div className="col-md-6 mb-4">
        <ShoeGallery shoe={shoe} />
      </div>
      <div className="col-md-6 mb-4">
        <ShoeData shoe={shoe} />
      </div>
    </div>
  </div>
  
  );
}
