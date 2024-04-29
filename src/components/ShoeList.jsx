import React from "react";
import { Link } from 'react-router-dom';
import '../styles/ShoeList.css'
export default function ShoesList({ filteredShoes }) {



  return (
    <div className="row">
      {filteredShoes.map((shoe, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card">
          <Link to={`/detailShoe/${shoe._id}`}>
                <img src={shoe.images[0]} className="card-img-top" alt={`Imagen de ${shoe.brand}`} />
                <div className="favorite">
            <i className="fas fa-heart"></i> 
            
        </div>
              </Link>
            <div className="card-body">
              <h5 className="card-title">{shoe.brand} - {shoe.model}</h5>
            </div>
          </div>
        </div>
      ))}
        <Link to={`/catalogo`} className='btn btn-primary'>VER EL CATALOGO</Link>
    </div>
  );
}
