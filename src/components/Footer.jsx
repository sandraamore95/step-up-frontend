import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <h4>Contacto</h4>
            <p>Correo electrónico: info@example.com</p>
            <p>Teléfono: +123 456 789</p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h4>Enlaces Rápidos</h4>
            <ul className="list-unstyled">
              <li><a href="/">Inicio</a></li>
              <li><a href="/catalogo">Catálogo</a></li>
              <li><a href="/nosotros">Nosotros</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12">
            <h4>Suscríbete</h4>
            <p>Suscríbete para recibir noticias y ofertas especiales.</p>
            <form>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Tu Correo Electrónico" />
              </div>
              <button type="submit" className="btn btn-primary">Suscribirse</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom  mt-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; 2024 Nombre de la Tienda - Todos los derechos reservados</p>
            </div>
            <div className="col-md-6">
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
