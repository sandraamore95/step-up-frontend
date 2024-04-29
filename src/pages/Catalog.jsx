import React, { useEffect, useState ,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import { ShoesContext } from '../context/shoesContext';


export default function Catalog() {
    const { shoes } = useContext(ShoesContext);
    const [filteredShoes, setFilteredShoes] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [shoesPerPage] = useState(6);

    useEffect(() => {
        setFilteredShoes(shoes); 
    }, [shoes]); 

    const handleFilter = (brand, color) => {
        let filtered;
        if (brand && color) {
            filtered = shoes.filter(shoe => shoe.brand === brand && shoe.color === color);
        } else if (brand) {
            filtered = shoes.filter(shoe => shoe.brand === brand);
        } else {
            filtered = shoes;
        }
        setFilteredShoes(filtered);
        setCurrentPage(1); 
    };

   //PAGINACION
    const indexOfLastShoe = currentPage * shoesPerPage;
    const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
    const currentShoes = filteredShoes.slice(indexOfFirstShoe, indexOfLastShoe);

    const nextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="container mt-4">
            <h2>Catálogo de Zapatillas</h2>
            <FilterBar onFilter={handleFilter} />
            <div className="row">
                {currentShoes.map((shoe, index) => (
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
            </div>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={nextPage} disabled={indexOfLastShoe >= filteredShoes.length}>Siguiente</button>
            </div>
        </div>
    );
}
