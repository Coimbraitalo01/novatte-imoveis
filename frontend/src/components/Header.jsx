import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container header-container">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Nova<span>tte</span> <span className="sub">Soluções Imobiliárias</span></h1>
          </Link>
        </div>
        <button className="mobile-menu-btn">
          <i className="fas fa-bars"></i>
        </button>
        <nav>
          <ul>
            <li><a href="/#home">Início</a></li>
            <li><a href="/#properties">Imóveis</a></li>
            <li><a href="/#about">Sobre</a></li>
            <li><a href="/#partners">Parceiros</a></li>
            <li><a href="/#contact">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;