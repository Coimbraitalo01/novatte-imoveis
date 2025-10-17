// js/templates.js

// Templates para componentes reutilizáveis
class PropertyTemplates {
    
    // Template do card de propriedade
    static createPropertyCard(property) {
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="property-card-booking" onclick="openPropertyInNewTab(${property.id})">
                    <div class="position-relative property-card-gallery">
                        <img src="${property.image}" class="property-img-booking" alt="${property.title}">
                        <span class="badge ${property.type === 'Venda' ? 'bg-primary' : 'bg-secondary'} property-badge-booking">${property.type}</span>
                        ${property.images.length > 1 ? this.createGalleryControls(property) : ''}
                    </div>
                    <div class="property-content-booking">
                        <h3 class="property-title-booking">${property.title}</h3>
                        <p class="property-location-booking"><i class="bi bi-geo-alt"></i> ${property.location}</p>
                        <div class="property-features-booking">
                            ${this.createFeatureIcons(property)}
                        </div>
                        <p class="property-description-booking">${property.description}</p>
                        <div class="property-footer-booking">
                            <div class="property-price-booking">${property.price}</div>
                            <div class="property-actions-booking">
                                <button class="btn-booking-secondary" onclick="event.stopPropagation(); showPropertyDetails(${property.id})">Mais Detalhes</button>
                                <button class="btn-booking-whatsapp" onclick="event.stopPropagation(); contactCorretor('${property.corretor}', ${property.id})">
                                    <i class="bi bi-whatsapp"></i> Contato
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Controles da galeria
    static createGalleryControls(property) {
        return `
            <div class="gallery-controls">
                <button class="gallery-btn" onclick="event.stopPropagation(); changeImage(${property.id}, -1)">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button class="gallery-btn" onclick="event.stopPropagation(); changeImage(${property.id}, 1)">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
            <div class="image-counter">1/${property.images.length}</div>
            <div class="thumbnail-container">
                ${property.images.map((img, index) => `
                    <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                         onclick="event.stopPropagation(); showImage(${property.id}, ${index})" alt="Thumbnail ${index + 1}">
                `).join('')}
            </div>
        `;
    }

    // Ícones de features
    static createFeatureIcons(property) {
        return `
            <div class="feature-item-booking">
                <i class="bi bi-house-door"></i> ${property.size}
            </div>
            ${property.bedrooms > 0 ? `
            <div class="feature-item-booking">
                <i class="bi bi-door-closed"></i> ${property.bedrooms} quarto${property.bedrooms > 1 ? 's' : ''}
            </div>
            ` : ''}
            ${property.bathrooms > 0 ? `
            <div class="feature-item-booking">
                <i class="bi bi-droplet"></i> ${property.bathrooms} banheiro${property.bathrooms > 1 ? 's' : ''}
            </div>
            ` : ''}
            ${property.parking > 0 ? `
            <div class="feature-item-booking">
                <i class="bi bi-car-front"></i> ${property.parking} vaga${property.parking > 1 ? 's' : ''}
            </div>
            ` : ''}
        `;
    }

    // Template da página de detalhes
    static createPropertyDetail(property, corretor) {
        let galleryHtml = '';
        if (property.images && property.images.length > 0) {
            let thumbnailsHtml = '';
            
            property.images.forEach((img, index) => {
                thumbnailsHtml += `
                    <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                         onclick="changeMainImage(${property.id}, ${index})" 
                         alt="${property.title} - Foto ${index + 1}">
                `;
            });

            galleryHtml = `
                <div class="property-gallery">
                    <div class="image-counter">1/${property.images.length}</div>
                    <img src="${property.images[0]}" class="main-image" 
                         onclick="openGalleryModal(${property.id}, 0)" 
                         alt="${property.title}">
                    <div class="gallery-controls">
                        <button class="gallery-btn" onclick="prevImage(${property.id})" id="prevBtn-${property.id}">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button class="gallery-btn" onclick="nextImage(${property.id})" id="nextBtn-${property.id}">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                    <div class="thumbnail-container">
                        ${thumbnailsHtml}
                    </div>
                </div>
            `;
        }

        return `
            <div class="unified-view">
                <h2>${property.title}</h2>
                <p><i class="bi bi-geo-alt"></i> ${property.location}</p>
                <h3 class="price-tag">${property.price}</h3>
                
                <!-- Galeria de Fotos -->
                ${galleryHtml}
                
                <div class="row">
                    <div class="col-md-6">
                        <h5>Detalhes do Imóvel</h5>
                        <ul class="list-group">
                            <li class="list-group-item"><i class="bi bi-house-door"></i> Área útil: ${property.size}</li>
                            <li class="list-group-item"><i class="bi bi-door-closed"></i> Quartos: ${property.bedrooms}</li>
                            <li class="list-group-item"><i class="bi bi-droplet"></i> Banheiros: ${property.bathrooms}</li>
                            <li class="list-group-item"><i class="bi bi-car-front"></i> Vagas: ${property.parking}</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Descrição acima do mapa -->
                <div class="description-above-map">
                    <h5>Descrição</h5>
                    <p>${property.description}</p>
                </div>
                
                <!-- Informações do Corretor -->
                <div class="corretor-info">
                    <div class="corretor-header">
                        <div class="corretor-photo">${corretor.avatar}</div>
                        <div class="corretor-details">
                            <div class="corretor-name">${corretor.nome}</div>
                            <div class="corretor-type">${corretor.tipo}</div>
                            ${corretor.creci ? `<div class="corretor-creci">${corretor.creci}</div>` : ''}
                            <div><i class="bi bi-telephone"></i> ${corretor.telefone}</div>
                        </div>
                    </div>
                    <button class="corretor-whatsapp-btn" onclick="window.open('https://wa.me/${corretor.whatsapp}?text=${encodeURIComponent(this.createWhatsAppMessage(property, corretor))}', '_blank')">
                        <i class="bi bi-whatsapp"></i> Entrar em Contato via WhatsApp
                    </button>
                </div>
                
                <div class="mt-4">
                    <h5>Localização</h5>
                    <p><i class="bi bi-geo-alt-fill"></i> ${property.address}</p>
                    <div id="property-map-${property.id}" class="unified-map"></div>
                    <div class="map-actions">
                        <button class="btn btn-primary" onclick="openInGoogleMaps(${property.lat}, ${property.lng})">
                            <i class="bi bi-arrow-up-right-square"></i> Abrir no Google Maps
                        </button>
                        <button class="btn btn-outline-secondary" onclick="getDirections(${property.lat}, ${property.lng})">
                            <i class="bi bi-signpost"></i> Traçar Rota
                        </button>
                    </div>
                </div>
                
                <div class="mt-4">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        `;
    }

    // Mensagem personalizada do WhatsApp
    static createWhatsAppMessage(property, corretor) {
        return `Olá ${corretor.nome}, fiquei interessado no anúncio que vi no portal da Novatte: ${property.title} - ${property.price}. Poderia me retornar mais informações?`;
    }
}

// Exporta para uso global
window.PropertyTemplates = PropertyTemplates;