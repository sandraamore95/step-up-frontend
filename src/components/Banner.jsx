import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Banner.css'
export default function Banner() {
  return (
    <div className="banner" style={{ 
        backgroundImage: 'url("https://okdiario.com/coolthelifestyle/img/2021/08/19/220877195_990101775084681_6015254614178452327_n-1.jpg")',
       
      }}>
        <div className="banner-content text-white">
        
          <h1>TEMPORADA INVIERNO !!</h1>
          <Link to={`/collection`} className='btn btn-primary'>Ver Colección</Link>
        </div>
      </div>
  )
}
