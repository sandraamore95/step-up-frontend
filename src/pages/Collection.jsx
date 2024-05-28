import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Collections.css'

export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedCollectionData, setSelectedCollectionData] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(`/collections`);
        setCollections(response.data)
        //Recoge todas las colecciones
        if (response.data.length > 0) {
          // Inicializa  a la primera colección
          const firstCollection = response.data[0].name;
          setSelectedCollection(firstCollection);
          fetchCollectionData(firstCollection);
        }
      } catch (error) {
        console.error('Error al obtener las colecciones:', error);
      }
    };

    fetchCollection();
  }, []);


  const fetchCollectionData = async (collectionName) => {
    try {
      const response = await axios.get(`/collections/name/${collectionName}`);
      console.log(response.data);
      setSelectedCollectionData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la colección:', error);
    }
  };


  const handleCollectionChange = (event) => {
    const collectionName = event.target.value;
    setSelectedCollection(collectionName);
    fetchCollectionData(collectionName);
  };

  return (
    <div className="container mt-4">
    <h2 className="text-center">Colecciones</h2>
    <div className="form-group">
      <label htmlFor="collectionSelect" className="form-label-custom">Selecciona una colección:</label>
      <select
        id="collectionSelect"
        className="form-select form-select-custom"
        value={selectedCollection}
        onChange={handleCollectionChange}
      >
        {collections.map((collection, index) => (
          <option key={index} value={collection.name}>
            {collection.name}
          </option>
        ))}
      </select>
    </div>
    {selectedCollectionData && (
      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{selectedCollectionData.name}</h5>
              <p className="card-text">{selectedCollectionData.description}</p>
              <div className="row">
                {selectedCollectionData.includedShoes.map((shoe, index) => (
                  <div key={index} className="col-md-4 col-sm-6 mb-4">
                    <div className="card h-100">
                      <Link to={`/detailShoe/${shoe._id}`}>
                        <img src={shoe.images[0]} className="card-img-top" alt={`Imagen de ${shoe.brand}`} />
                      </Link>
                      <div className="card-body">
                        <h6 className="card-title">{shoe.brand}</h6>
                        <p className="card-text">{shoe.model}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>

  );
}
