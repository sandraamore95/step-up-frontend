import React, { useState } from 'react';
import '../styles/FilterBar.css'

export default function FilterBar({  onFilter }) {
  const [brandFilter, setBrandFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');

  const handleFilter = () => {
    onFilter(brandFilter, colorFilter); // le pasamos al componente Home nuestras elecciones (marca, color)
    // se  passa las opciones al componente Catalog
  };

  return (
    <div className="container mt-3">
    <div className="row">
        <div className="col">
            <select
                className="form-select"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
            >
                <option value="">Todos</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Reebok">Reebok</option>
                <option value="Puma">Puma</option>
            </select>
        </div>
        <div className="col">
            <select
                className="form-select"
                value={colorFilter}
                onChange={(e) => setColorFilter(e.target.value)}
            >
                <option value="">Todos</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
            </select>
        </div>
        <div className="col">
            <button className="btn btn-primary" onClick={handleFilter}>Filtrar</button>
        </div>
    </div>
</div>

  );
}
