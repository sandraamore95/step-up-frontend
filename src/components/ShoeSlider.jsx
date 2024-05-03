import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'; // Importa el componente Link
import {useState, useEffect } from 'react';
import '../styles/Slider.css'

const ShoeSlider = ({ shoesData }) => {

  useEffect(() => {
 
  }, );

 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {shoesData.map((shoe, index) => (
        <div key={index} className="shoe-slide">
          <div>
          <img src={shoe.images[0]} className="card-img-top" alt={`Imagen de ${shoe.brand}`} />
          </div>
          <p>{shoe.offer}</p>
          <Link to={`/detailshoe/${shoe._id}`} className='btn btn-primary'>Ir a la Oferta</Link>
        </div>
      ))}
    </Slider>
  );
};


export default ShoeSlider;
