import React, { useState, useEffect } from 'react';
import ShoeSlider from './ShoeSlider';
import axios from 'axios'

export default function SpecialOffers() {
  const [offers, setOffers] = useState([]);
  
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // Realiza la solicitud GET al servidor para obtener las ofertas
        const response = await axios.get('/offers');
        setOffers(response.data); // inicializamos el array de ofertas , con el getAllOffers() de nuestro endpoint
      } catch (error) {
        console.error('Error al obtener las ofertas:', error);
      }
    };

    fetchOffers(); // Llama a la función para obtener las zapatillas al cargar el componente
  }, []);


  
  // Crear un nuevo array con todos los zapatos y su oferta correspondiente
  const allShoesWithOffer = offers.reduce((acc, offer) => {
    const shoesWithOffer = offer.includedShoes.map(shoe => ({
      ...shoe,
      offer: offer.title // Agregar la referencia a la oferta
    }));
    return acc.concat(shoesWithOffer);
  }, []);

  return (
    <div className="container mt-4">
    <div className="special-offers-container">
    <h2 className="special-offers-title">¡Ofertas Especiales!</h2>
    <div className="shoe-slider-container">
      <ShoeSlider shoesData={allShoesWithOffer} />
    </div>
  </div></div>
);
}