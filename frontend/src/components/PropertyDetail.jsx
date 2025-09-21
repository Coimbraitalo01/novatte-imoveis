import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PropertyDetail = ({ imoveis }) => {
  const { id } = useParams();
  
  // Encontrar o imóvel pelo ID
  const property = imoveis.find(prop => prop._id.toString() === id.toString());

  if (!property) {
    return (
      <div className="property-detail-page">
        <Header />
        <div className="property-detail-container">
          <Link to="/" className="back-button">
            <i className="fas fa-arrow-left"></i> Voltar para a lista
          </Link>
          
          <div className="property-not-found">
            <div className="logo" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1>Nova<span>tte</span> <span className="sub">Soluções Imobiliárias</span></h1>
            </div>
            <h2>Imóvel não encontrado</h2>
            <p>O imóvel com ID {id} não foi encontrado em nossa base.</p>
            <Link to="/" className="btn btn-primary">Ver todos os imóveis</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Formatar preço baseado no tipo de operação
  const formatarPreco = (imovel) => {
    if (imovel.operation === 'locacao') {
      return `R$ ${imovel.price.toLocaleString('pt-BR')}/mês`;
    }
    return `R$ ${imovel.price.toLocaleString('pt-BR')}`;
  };

  return (
    <div className="property-detail-page">
      <Header />
      <div className="property-detail-container">
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Voltar para a lista
        </Link>
        
        <div className="property-detail-content">
          <div className="property-detail-gallery">
            <div className="property-main-image">
              <img 
                src={property.images && property.images.length > 0 ? property.images[0] : "https://via.placeholder.com/800x600?text=Imóvel"} 
                alt={property.title} 
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600?text=Imagem+Indisponível";
                }}
              />
            </div>
            {property.images && property.images.length > 1 && (
              <div className="property-thumbnails">
                {property.images.slice(0, 4).map((img, index) => (
                  <div key={index} className="property-thumbnail">
                    <img 
                      src={img} 
                      alt={`${property.title} ${index + 1}`}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/100x100?text=Imagem";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="property-detail-info">
            <h1 className="property-detail-title">{property.title}</h1>
            <p className="property-detail-price">{formatarPreco(property)}</p>
            
            <div className="property-detail-location">
              <i className="fas fa-map-marker-alt"></i>
              {property.city}, {property.neighborhood}
            </div>
            
            <div className="property-detail-features">
              <div className="property-feature">
                <i className="fas fa-bed"></i>
                <div className="property-feature-value">{property.bedrooms || 0}</div>
                <div className="property-feature-label">Quartos</div>
              </div>
              
              <div className="property-feature">
                <i className="fas fa-bath"></i>
                <div className="property-feature-value">{property.bathrooms || 0}</div>
                <div className="property-feature-label">Banheiros</div>
              </div>
              
              <div className="property-feature">
                <i className="fas fa-ruler-combined"></i>
                <div className="property-feature-value">{property.area}</div>
                <div className="property-feature-label">Área</div>
              </div>
            </div>
            
            <div className="property-detail-description">
              <h3>Descrição</h3>
              <p>{property.description}</p>
            </div>
            
            <div className="property-detail-actions">
              <button className="contact-agent-btn">
                <i className="fas fa-envelope"></i> Falar com Corretor
              </button>
              
              <button className="whatsapp-btn">
                <i className="fab fa-whatsapp"></i> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;