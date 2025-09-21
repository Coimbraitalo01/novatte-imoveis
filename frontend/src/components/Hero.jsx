import React from 'react';

const Hero = ({ aplicarFiltros }) => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content fade-in">
          <h2>Encontre o imóvel dos seus sonhos no Noroeste Fluminense</h2>
          <p>Conectamos você às melhores oportunidades de venda e locação em toda a região: Pádua, Miracema, Itaperuna, Itaocara, Cambuci, Aperibé e mais!</p>
          <a href="#properties" className="btn btn-primary">Ver Imóveis</a>
          <div className="search-box fade-in delay-1">
            <div className="search-option">
              <select>
                <option>Tipo de Imóvel</option>
                <option>Casa</option>
                <option>Apartamento</option>
                <option>Terreno</option>
                <option>Comercial</option>
                <option>Chácara</option>
              </select>
            </div>
            <div className="search-option">
              <select>
                <option>Operação</option>
                <option>Venda</option>
                <option>Locação</option>
              </select>
            </div>
            <div className="search-option">
              <select>
                <option>Cidade</option>
                <option>Santo Antônio de Pádua</option>
                <option>Miracema</option>
                <option>Itaperuna</option>
                <option>Itaocara</option>
                <option>Cambuci</option>
                <option>Aperibé</option>
              </select>
            </div>
            <div className="search-btn">
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={aplicarFiltros}>Buscar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;