import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Collection() {
    const [collections, setCollections] = useState([]);


  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(`/collections`);
        console.log(response.data);
        setCollections(response.data)
      } catch (error) {
        console.error('Error al obtener las colecciones:', error);
      }
    };

    fetchCollection(); 
  },[]); 

//hay muchas colecciones pero quiero sacar la mas nueva
// Accede solo a la primera colección
const lastCollection  = collections.length > 0 ? collections[collections.length -1] : null;

  return (
    <div className="container mt-4">
    <h2>Colección</h2>
    {lastCollection  && (
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{lastCollection .name}</h5>
              <p className="card-text">{lastCollection .description}</p>
              <ul className="list-group list-group-flush">
                {lastCollection .includedShoes.map((shoe, index) => (
                  <li key={index} className="list-group-item">
                    <Link to={`/detailShoe/${shoe._id}`}>
                      <img src={shoe.images[0]} className="card-img-top" alt={`Imagen de ${shoe.brand}`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
}
