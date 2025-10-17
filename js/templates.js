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
                        ${property.images && property.images.length > 1 ? this.createGalleryControls(property) : ''}
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

    // Template da página de detalhes (modal)
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
                    <div class="thumbnail-container">
                        ${thumbnailsHtml}
                    </div>
                </div>
            `;
        }

        return `
            <div class="unified-view">
                <div class="row">
                    <div class="col-lg-8">
                        <h2>${property.title}</h2>
                        <p class="text-muted"><i class="bi bi-geo-alt"></i> ${property.location}</p>
                        <h3 class="price-tag text-primary mb-4">${property.price}</h3>
                        
                        <!-- Galeria de Fotos -->
                        ${galleryHtml}
                        
                        <div class="property-details mt-4">
                            <h5>Detalhes do Imóvel</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="list-group">
                                        <div class="list-group-item d-flex justify-content-between align-items-center">
                                            <span><i class="bi bi-house-door me-2"></i>Área útil</span>
                                            <strong>${property.size}</strong>
                                        </div>
                                        ${property.bedrooms > 0 ? `
                                        <div class="list-group-item d-flex justify-content-between align-items-center">
                                            <span><i class="bi bi-door-closed me-2"></i>Quartos</span>
                                            <strong>${property.bedrooms}</strong>
                                        </div>
                                        ` : ''}
                                        ${property.bathrooms > 0 ? `
                                        <div class="list-group-item d-flex justify-content-between align-items-center">
                                            <span><i class="bi bi-droplet me-2"></i>Banheiros</span>
                                            <strong>${property.bathrooms}</strong>
                                        </div>
                                        ` : ''}
                                        ${property.parking > 0 ? `
                                        <div class="list-group-item d-flex justify-content-between align-items-center">
                                            <span><i class="bi bi-car-front me-2"></i>Vagas</span>
                                            <strong>${property.parking}</strong>
                                        </div>
                                        ` : ''}
                                        <div class="list-group-item d-flex justify-content-between align-items-center">
                                            <span><i class="bi bi-building me-2"></i>Tipo</span>
                                            <strong>${property.propertyType}</strong>
                                        </div>
                                        <div class="list-group-item d-flex justify-content-between align-items-center">
                                            <span><i class="bi bi-arrow-left-right me-2"></i>Transação</span>
                                            <strong>${property.type}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Descrição -->
                        <div class="property-description mt-4">
                            <h5>Descrição</h5>
                            <p class="mb-0">${property.description}</p>
                        </div>
                        
                        <!-- Localização -->
                        <div class="property-location mt-4">
                            <h5>Localização</h5>
                            <p class="text-muted"><i class="bi bi-geo-alt-fill"></i> ${property.address}</p>
                            <div id="property-map-${property.id}" class="unified-map"></div>
                            <div class="map-actions mt-2">
                                <button class="btn btn-primary btn-sm me-2" onclick="openInGoogleMaps(${property.lat}, ${property.lng})">
                                    <i class="bi bi-arrow-up-right-square"></i> Abrir no Google Maps
                                </button>
                                <button class="btn btn-outline-secondary btn-sm" onclick="getDirections(${property.lat}, ${property.lng})">
                                    <i class="bi bi-signpost"></i> Traçar Rota
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sidebar - Corretor (MENOR) -->
                    <div class="col-lg-4">
                        <div class="corretor-card">
                            <h5 class="mb-3">Entre em Contato</h5>
                            <div class="corretor-info">
                                <div class="corretor-header">
                                    <div class="corretor-photo">${corretor.avatar}</div>
                                    <div class="corretor-details">
                                        <div class="corretor-name">${corretor.nome}</div>
                                        <div class="corretor-type">${corretor.tipo}</div>
                                        ${corretor.creci ? `<div class="corretor-creci"><small>${corretor.creci}</small></div>` : ''}
                                        <div class="corretor-phone"><i class="bi bi-telephone me-2"></i>${corretor.telefone}</div>
                                    </div>
                                </div>
                                <button class="corretor-whatsapp-btn w-100 mt-3" onclick="contactCorretor('${property.corretor}', ${property.id})">
                                    <i class="bi bi-whatsapp"></i> Entrar em Contato via WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Template da página completa (nova guia) - COM A MESMA LOGO DO ARQUIVO
    static createPropertyPage(property, corretor) {
        return `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${property.title} - Novatte Imóveis</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                <style>
                    .property-header {
                        background-color: #1a4d2e;
                        padding: 15px 0;
                        text-align: center;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .logo-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 120px;
                        overflow: hidden;
                    }
                    .logo-img {
                        height: 400px;
                        width: auto;
                        max-width: 500px;
                        object-fit: contain;
                        margin: -140px 0;
                    }
                    .property-gallery-page .main-gallery-image {
                        margin-bottom: 15px;
                        position: relative;
                    }
                    .main-gallery-img {
                        width: 100%;
                        height: 500px;
                        object-fit: cover;
                        border-radius: 12px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    
                    /* Botões de navegação da galeria */
                    .gallery-controls-page {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        right: 0;
                        display: flex;
                        justify-content: space-between;
                        transform: translateY(-50%);
                        padding: 0 20px;
                        pointer-events: none;
                    }
                    .gallery-btn-page {
                        background-color: rgba(0, 0, 0, 0.6);
                        color: white;
                        border: none;
                        padding: 12px 16px;
                        border-radius: 50%;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                        pointer-events: auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 50px;
                        height: 50px;
                        font-size: 1.2rem;
                    }
                    .gallery-btn-page:hover {
                        background-color: rgba(0, 0, 0, 0.8);
                    }
                    .image-counter-page {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: rgba(0, 0, 0, 0.7);
                        color: white;
                        padding: 8px 15px;
                        border-radius: 20px;
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    
                    .gallery-thumbnails {
                        display: flex;
                        gap: 12px;
                        overflow-x: auto;
                        padding: 15px 0;
                    }
                    .gallery-thumbnails .thumbnail {
                        width: 100px;
                        height: 80px;
                        object-fit: cover;
                        border-radius: 8px;
                        cursor: pointer;
                        opacity: 0.7;
                        transition: all 0.3s ease;
                        border: 3px solid transparent;
                    }
                    .gallery-thumbnails .thumbnail:hover,
                    .gallery-thumbnails .thumbnail.active {
                        opacity: 1;
                        border-color: #ff6b35;
                        transform: scale(1.05);
                    }
                    .property-map {
                        height: 400px;
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid #dee2e6;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    
                    /* Card do corretor MENOR */
                    .corretor-card {
                        background: #f8f9fa;
                        border-radius: 12px;
                        padding: 20px;
                        border-left: 4px solid #ff6b35;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                        position: sticky;
                        top: 20px;
                    }
                    .corretor-header {
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
                    }
                    .corretor-photo {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        background-color: #e9ecef;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        color: #1a4d2e;
                        font-size: 24px;
                        margin-right: 15px;
                        border: 2px solid #ff6b35;
                    }
                    .corretor-name {
                        font-weight: 600;
                        color: #1a4d2e;
                        margin-bottom: 5px;
                        font-size: 1.1rem;
                    }
                    .corretor-type {
                        color: #ff6b35;
                        font-size: 0.9rem;
                        margin-bottom: 5px;
                        font-weight: 500;
                    }
                    .corretor-creci {
                        color: #666;
                        font-size: 0.8rem;
                        margin-bottom: 5px;
                    }
                    .corretor-phone {
                        color: #333;
                        font-size: 0.9rem;
                    }
                    .corretor-whatsapp-btn {
                        background-color: #25D366;
                        color: white;
                        border: none;
                        padding: 12px 15px;
                        border-radius: 8px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        cursor: pointer;
                        font-size: 1rem;
                    }
                    .corretor-whatsapp-btn:hover {
                        background-color: #128C7E;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                    }
                    .property-details {
                        background: #f8f9fa;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 20px 0;
                    }
                    .property-description {
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        border-left: 4px solid #1a4d2e;
                        margin: 20px 0;
                    }
                    .property-location {
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 20px 0;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
                    }
                    .map-actions {
                        display: flex;
                        gap: 10px;
                        flex-wrap: wrap;
                    }
                    .btn {
                        border-radius: 6px;
                        padding: 8px 16px;
                        font-weight: 600;
                        font-size: 0.9rem;
                    }
                    @media (max-width: 768px) {
                        .logo-img {
                            height: 200px;
                            max-width: 280px;
                            margin: -40px 0;
                        }
                        .main-gallery-img {
                            height: 300px;
                        }
                        .gallery-thumbnails .thumbnail {
                            width: 80px;
                            height: 60px;
                        }
                        .corretor-card {
                            position: static;
                            margin-top: 30px;
                        }
                        .corretor-header {
                            flex-direction: column;
                            text-align: center;
                        }
                        .corretor-photo {
                            margin-right: 0;
                            margin-bottom: 10px;
                        }
                        .gallery-btn-page {
                            width: 40px;
                            height: 40px;
                            padding: 8px 12px;
                            font-size: 1rem;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="property-page">
                    <!-- Header COM A MESMA LOGO DO ARQUIVO -->
                    <header class="property-header">
                        <div class="container">
                            <div class="logo-container">
                                <img src="../assets/logo.png" 
                                     alt="Novatte Imóveis - Portal Imobiliário" 
                                     class="logo-img"
                                     onerror="this.onerror=null; this.src='assets/logo.png';">
                            </div>
                        </div>
                    </header>

                    <!-- Conteúdo Principal -->
                    <div class="container mt-4">
                        <div class="row">
                            <div class="col-lg-8">
                                <h1 class="mb-2">${property.title}</h1>
                                <p class="text-muted mb-3"><i class="bi bi-geo-alt"></i> ${property.location}</p>
                                <h2 class="text-primary mb-4">${property.price}</h2>
                                
                                <!-- Galeria - COM BOTÕES DE NAVEGAÇÃO -->
                                ${this.createPageGallery(property)}
                                
                                <!-- Detalhes -->
                                <div class="property-details mt-4">
                                    <h4>Detalhes do Imóvel</h4>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <ul class="list-unstyled">
                                                <li><strong>Área útil:</strong> ${property.size}</li>
                                                ${property.bedrooms > 0 ? `<li><strong>Quartos:</strong> ${property.bedrooms}</li>` : ''}
                                                ${property.bathrooms > 0 ? `<li><strong>Banheiros:</strong> ${property.bathrooms}</li>` : ''}
                                                ${property.parking > 0 ? `<li><strong>Vagas:</strong> ${property.parking}</li>` : ''}
                                                <li><strong>Tipo:</strong> ${property.propertyType}</li>
                                                <li><strong>Transação:</strong> ${property.type}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Descrição -->
                                <div class="property-description mt-4">
                                    <h4>Descrição</h4>
                                    <p>${property.description}</p>
                                </div>
                                
                                <!-- Localização -->
                                <div class="property-location mt-4">
                                    <h4>Localização</h4>
                                    <p class="text-muted"><i class="bi bi-geo-alt-fill"></i> ${property.address}</p>
                                    <div id="property-map" class="property-map"></div>
                                    <div class="map-actions mt-2">
                                        <button class="btn btn-primary btn-sm me-2" onclick="window.open('https://www.google.com/maps?q=${property.lat},${property.lng}', '_blank')">
                                            <i class="bi bi-arrow-up-right-square"></i> Abrir no Google Maps
                                        </button>
                                        <button class="btn btn-outline-secondary btn-sm" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${property.lat},${property.lng}', '_blank')">
                                            <i class="bi bi-signpost"></i> Traçar Rota
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Sidebar - Corretor (MENOR) -->
                            <div class="col-lg-4">
                                <div class="corretor-card">
                                    <h5 class="mb-3">Entre em Contato</h5>
                                    <div class="corretor-info">
                                        <div class="corretor-header">
                                            <div class="corretor-photo">${corretor.avatar}</div>
                                            <div class="corretor-details">
                                                <div class="corretor-name">${corretor.nome}</div>
                                                <div class="corretor-type">${corretor.tipo}</div>
                                                ${corretor.creci ? `<div class="corretor-creci"><small>${corretor.creci}</small></div>` : ''}
                                                <div class="corretor-phone"><i class="bi bi-telephone me-2"></i>${corretor.telefone}</div>
                                            </div>
                                        </div>
                                        <button class="corretor-whatsapp-btn w-100 mt-3" onclick="window.open('https://wa.me/${corretor.whatsapp}?text=${encodeURIComponent(this.createWhatsAppMessage(property, corretor))}', '_blank')">
                                            <i class="bi bi-whatsapp"></i> Entrar em Contato via WhatsApp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                <script>
                    // Script para galeria na nova guia
                    let currentImageIndex = 0;
                    const propertyImages = ${JSON.stringify(property.images || [])};
                    
                    function changeImage(direction) {
                        if (propertyImages.length <= 1) return;
                        
                        currentImageIndex = (currentImageIndex + direction + propertyImages.length) % propertyImages.length;
                        const mainImage = document.getElementById('mainGalleryImage');
                        const galleryCounter = document.getElementById('galleryCounter');
                        
                        if (mainImage) mainImage.src = propertyImages[currentImageIndex];
                        if (galleryCounter) galleryCounter.textContent = \`\${currentImageIndex + 1}/\${propertyImages.length}\`;
                        
                        // Atualizar thumbnails ativos
                        document.querySelectorAll('.gallery-thumbnails .thumbnail').forEach((thumb, index) => {
                            thumb.classList.toggle('active', index === currentImageIndex);
                        });
                    }
                    
                    function goToImage(index) {
                        currentImageIndex = index;
                        const mainImage = document.getElementById('mainGalleryImage');
                        const galleryCounter = document.getElementById('galleryCounter');
                        
                        if (mainImage) mainImage.src = propertyImages[currentImageIndex];
                        if (galleryCounter) galleryCounter.textContent = \`\${currentImageIndex + 1}/\${propertyImages.length}\`;
                        
                        // Atualizar thumbnails ativos
                        document.querySelectorAll('.gallery-thumbnails .thumbnail').forEach((thumb, i) => {
                            thumb.classList.toggle('active', i === currentImageIndex);
                        });
                    }
                    
                    // Inicializar mapa
                    window.onload = function() {
                        try {
                            const mapElement = document.getElementById('property-map');
                            if (mapElement && ${property.lat} && ${property.lng}) {
                                const map = L.map(mapElement).setView([${property.lat}, ${property.lng}], 15);
                                
                                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                    attribution: '© OpenStreetMap contributors'
                                }).addTo(map);
                                
                                L.marker([${property.lat}, ${property.lng}])
                                    .addTo(map)
                                    .bindPopup('<b>${property.title}</b><br>${property.location}')
                                    .openPopup();
                            }
                        } catch (error) {
                            console.error('Erro ao carregar mapa:', error);
                            const mapElement = document.getElementById('property-map');
                            if (mapElement) {
                                mapElement.innerHTML = '<div class="text-center p-4 bg-light rounded"><i class="bi bi-map display-4 text-muted"></i><p class="mt-2 text-muted">Mapa não disponível</p></div>';
                            }
                        }
                    };

                    // Expor funções globalmente
                    window.changeImage = changeImage;
                    window.goToImage = goToImage;
                </script>
            </body>
            </html>
        `;
    }

    // Galeria para página completa - COM BOTÕES DE NAVEGAÇÃO
    static createPageGallery(property) {
        if (!property.images || property.images.length === 0) return '';
        
        return `
            <div class="property-gallery-page">
                <div class="main-gallery-image position-relative">
                    <img src="${property.images[0]}" id="mainGalleryImage" class="img-fluid rounded main-gallery-img" alt="${property.title}">
                    ${property.images.length > 1 ? `
                    <div class="gallery-controls-page">
                        <button class="gallery-btn-page gallery-prev" onclick="changeImage(-1)">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button class="gallery-btn-page gallery-next" onclick="changeImage(1)">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                    <div class="image-counter-page" id="galleryCounter">1/${property.images.length}</div>
                    ` : ''}
                </div>
                ${property.images.length > 1 ? `
                <div class="gallery-thumbnails mt-3">
                    ${property.images.map((img, index) => `
                        <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                             onclick="goToImage(${index})"
                             alt="Thumbnail ${index + 1}">
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `;
    }

    // Mensagem personalizada do WhatsApp
    static createWhatsAppMessage(property, corretor) {
        return `Olá ${corretor.nome}, fiquei interessado no anúncio que vi no portal da Novatte: ${property.title} - ${property.price}. Localizado em: ${property.location}. Poderia me fornecer mais informações?`;
    }
}

// Exporta para uso global
window.PropertyTemplates = PropertyTemplates;