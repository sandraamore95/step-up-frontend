import React from 'react'

export default function ShoeGallery({shoe }) {
    return (
        <div>
        <h3>Galería de Imágenes del Zapato</h3>
        <div className="row">
            {shoe.images.slice(0, 4).map((image, index) => (
                <div key={index} className="col-md-6 mb-2">
                    <img src={image} alt={`Imagen ${index + 1}`} className="img-fluid" />
                </div>
            ))}
        </div>
    </div>
      );
}
