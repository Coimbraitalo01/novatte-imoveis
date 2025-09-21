import React from 'react';
import { Link } from 'react-router-dom';

const Properties = ({ imoveis, loading, error }) => {
  // Formatar preço baseado no tipo de operação
  const formatarPreco = (imovel) => {
    if (imovel.operation === 'locacao') {
      return `R$ ${imovel.price.toLocaleString('pt-BR')}/mês`;
    }
    return `R$ ${imovel.price.toLocaleString('pt-BR')}`;
  };

  return (
    <section className="properties" id="properties">
      <div className="container">
        <div className="section-title fade-in">
          <h2>Imóveis em Destaque</h2>
          <p>Confira oportunidades em Pádua, Miracema, Itaperuna, Itaocara, Cambuci, Aperibé e toda região!</p>
        </div>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Carregando imóveis...</p>
          </div>
        )}
        
        {error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#e74c3c' }}>
            <p>Erro ao carregar imóveis. Mostrando dados de exemplo.</p>
          </div>
        )}
        
        <div className="property-grid" id="property-grid">
          {imoveis.map((imovel, index) => (
            <div key={imovel._id || index} className={`property-card fade-in delay-${(index % 3) + 1}`}>
              <div className="property-img">
                <img 
                  src={imovel.images && imovel.images.length > 0 ? imovel.images[0] : "https://via.placeholder.com/600x400?text=Imóvel"} 
                  alt={imovel.title} 
                />
              </div>
              <div className="property-info">
                <h3>{imovel.title}</h3>
                <p className="property-location">
                  <i className="fas fa-map-marker-alt"></i> {imovel.city}, {imovel.neighborhood}
                </p>
                <p className="property-price">
                  {formatarPreco(imovel)}
                </p>
                <div className="property-features">
                  <div className="feature">
                    <i className="fas fa-bed"></i> {imovel.bedrooms || 0} Quartos
                  </div>
                  <div className="feature">
                    <i className="fas fa-bath"></i> {imovel.bathrooms || 0} Banheiros
                  </div>
                  <div className="feature">
                    <i className="fas fa-ruler-combined"></i> {imovel.area}
                  </div>
                </div>
                <div className="property-legenda" style={{ marginTop: 16, color: '#86450A', fontSize: '1.05rem', minHeight: '60px' }}>
                  {imovel.description}
                </div>
                <Link to={`/property/${imovel._id}`} className="btn btn-outline" style={{ marginTop: 12 }}>
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="#" className="btn btn-outline fade-in">Ver Todos os Imóveis</a>
        </div>
      </div>
    </section>
  );
};

export default Properties;