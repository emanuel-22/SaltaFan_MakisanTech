import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import logo from '../../assets/img/logo.png';


const Footer = () => {
  return (
    <footer className="footer">
      {/* Sección superior */}
      <div className="footer-top">
      <a className="navbar-brand" href="/">
        <img src={logo} className="logo d-inline-block align-text-top" alt="logo"/>
        </a>
        
        <div className="icon-container">
        <div className="icon-circle">
        <i className="fab fa-instagram"></i> {/* Icono de Instagram */}
      </div>
      <div className="icon-circle">
        <i className="fab fa-facebook"></i> {/* Icono de Facebook */}
      </div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="container footer-content">
        <div className="row text-center text-center">
          <div className="sf-links col-md-3 mb-3">
            <h5 className="footer-title">SaltaFan</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Sobre SaltaFan</a></li>
              <li><a href="#" className="footer-link">Preguntas frecuentes</a></li>
              <li><a href="#" className="footer-link">Contacto</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5 className="footer-title">Eventos</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Según temáticas</a></li>
              <li><a href="#" className="footer-link">Más populares</a></li>
              <li><a href="#" className="footer-link">Más recientes</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5 className="footer-title">Legal</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5 className="footer-title">Contacto</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Ubicación</a></li>
              <li><a href="#" className="footer-link">Mail</a></li>
              <li><a href="#" className="footer-link">Redes Sociales</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
