// js/templates.js

// Templates para componentes reutilizáveis
class PropertyTemplates {
    
    // Template do card de propriedade
    static createPropertyCard(property) {
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="property-card-booking" onclick="openPropertyInNewTab(${property.id})">
                    <div class="position-relative property-card-gallery">
                        <img src="${property.images ? property.images[0] : property.image}" class="property-img-booking" alt="${property.title}">
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

    // Template da página de detalhes (modal) - COM LAYOUT CORRETO E BOTÕES FUNCIONAIS
    static createPropertyDetail(property, corretor, isNewTab = false) {
        const whatsappFunction = isNewTab ? 
            `contactCorretor('${corretor.whatsapp}', '${property.title}', '${property.price}')` :
            `contactCorretor('${property.corretor}', ${property.id})`;
        
        let galleryHtml = '';
        if (property.images && property.images.length > 0) {
            galleryHtml = this.createModalGallery(property, isNewTab);
        }

        return `
            <div class="unified-view">
                <div class="row">
                    <div class="col-lg-8">
                        <h2>${property.title}</h2>
                        <p class="text-muted"><i class="bi bi-geo-alt"></i> ${property.location}</p>
                        <h3 class="price-tag text-primary mb-4">${property.price}</h3>
                        
                        <!-- Galeria de Fotos COM BOTÕES FUNCIONAIS -->
                        ${galleryHtml}
                        
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
                    
                    <!-- Sidebar - Corretor E Detalhes do Imóvel JUNTOS -->
                    <div class="col-lg-4">
                        <div class="corretor-card">
                            <h5 class="mb-3">Entre em Contato</h5>
                            <div class="corretor-info">
                                <div class="corretor-header">
                                    <div class="corretor-photo">${corretor.nome ? corretor.nome.charAt(0).toUpperCase() : 'C'}</div>
                                    <div class="corretor-details">
                                        <div class="corretor-name">${corretor.nome || 'Corretor'}</div>
                                        <div class="corretor-type">${corretor.tipo || 'Corretor de Imóveis'}</div>
                                        ${corretor.creci ? `<div class="corretor-creci"><small>CRECI: ${corretor.creci}</small></div>` : ''}
                                        <div class="corretor-phone"><i class="bi bi-telephone me-2"></i>${corretor.telefone || '(22) 99205-4592'}</div>
                                    </div>
                                </div>
                                <button class="corretor-whatsapp-btn w-100 mt-3" onclick="${whatsappFunction}">
                                    <i class="bi bi-whatsapp"></i> Entrar em Contato via WhatsApp
                                </button>
                            </div>
                        </div>
                        
                        <!-- DETALHES DO IMÓVEL AGORA ABAIXO DO CORRETOR NA LATERAL -->
                        <div class="property-details-sidebar mt-4">
                            <h5>Detalhes do Imóvel</h5>
                            <div class="details-list">
                                <div class="detail-item">
                                    <span class="detail-label"><i class="bi bi-house-door me-2"></i>Área útil</span>
                                    <span class="detail-value">${property.size}</span>
                                </div>
                                ${property.bedrooms > 0 ? `
                                <div class="detail-item">
                                    <span class="detail-label"><i class="bi bi-door-closed me-2"></i>Quartos</span>
                                    <span class="detail-value">${property.bedrooms}</span>
                                </div>
                                ` : ''}
                                ${property.bathrooms > 0 ? `
                                <div class="detail-item">
                                    <span class="detail-label"><i class="bi bi-droplet me-2"></i>Banheiros</span>
                                    <span class="detail-value">${property.bathrooms}</span>
                                </div>
                                ` : ''}
                                ${property.parking > 0 ? `
                                <div class="detail-item">
                                    <span class="detail-label"><i class="bi bi-car-front me-2"></i>Vagas</span>
                                    <span class="detail-value">${property.parking}</span>
                                </div>
                                ` : ''}
                                <div class="detail-item">
                                    <span class="detail-label"><i class="bi bi-building me-2"></i>Tipo</span>
                                    <span class="detail-value">${property.propertyType || 'Não informado'}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label"><i class="bi bi-arrow-left-right me-2"></i>Transação</span>
                                    <span class="detail-value">${property.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Galeria para modal - COM BOTÕES DE NAVEGAÇÃO FUNCIONAIS
    static createModalGallery(property, isNewTab = false) {
        let thumbnailsHtml = '';
        
        property.images.forEach((img, index) => {
            thumbnailsHtml += `
                <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                     onclick="${isNewTab ? `changeMainImage(${index})` : `changeMainImage(${property.id}, ${index})`}" 
                     alt="${property.title} - Foto ${index + 1}">
            `;
        });

        const prevFunction = isNewTab ? 'prevImage()' : `prevImage(${property.id})`;
        const nextFunction = isNewTab ? 'nextImage()' : `nextImage(${property.id})`;
        const galleryClick = isNewTab ? 'openGalleryModal(0)' : `openGalleryModal(${property.id}, 0)`;

        return `
            <div class="property-gallery-modal">
                <div class="main-gallery-container position-relative">
                    <img src="${property.images[0]}" class="main-image" 
                         onclick="${galleryClick}" 
                         alt="${property.title}">
                    
                    <!-- BOTÕES DE NAVEGAÇÃO NO MODAL - AGORA FUNCIONAIS -->
                    ${property.images.length > 1 ? `
                    <div class="gallery-controls-modal">
                        <button class="gallery-btn-modal gallery-prev-modal" onclick="${prevFunction}">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button class="gallery-btn-modal gallery-next-modal" onclick="${nextFunction}">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                    <div class="image-counter-modal">1/${property.images.length}</div>
                    ` : ''}
                </div>
                
                ${property.images.length > 1 ? `
                <div class="thumbnail-container-modal">
                    ${thumbnailsHtml}
                </div>
                ` : ''}
            </div>
        `;
    }

    // Template da página completa (nova guia) - COM LOGO CORRIGIDA
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
                    :root {
                        --primary-color: #1a4d2e;
                        --secondary-color: #ff6b35;
                        --light-color: #f8f9fa;
                        --dark-color: #333;
                    }
                    
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: var(--light-color);
                        color: var(--dark-color);
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                    }
                    
                    .property-header {
                        background-color: var(--primary-color);
                        padding: 15px 60px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        height: 120px;
                    }
                    
                    .logo-container {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        flex: 0 0 auto;
                    }
                    
                    .logo-img {
                        height: 400px;
                        width: auto;
                        object-fit: contain;
                        max-width: 500px;
                        margin: -140px 0;
                    }
                    
                    .unified-view {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 30px;
                    }
                    
                    .property-gallery-modal {
                        margin-bottom: 25px;
                    }
                    
                    .main-gallery-container {
                        position: relative;
                        margin-bottom: 15px;
                    }
                    
                    .property-gallery-modal .main-image {
                        height: 450px;
                        object-fit: cover;
                        width: 100%;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: transform 0.3s ease;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    
                    .gallery-controls-modal {
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
                    
                    .gallery-btn-modal {
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
                    
                    .gallery-btn-modal:hover {
                        background-color: rgba(0, 0, 0, 0.8);
                    }
                    
                    .image-counter-modal {
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
                    
                    .thumbnail-container-modal {
                        display: flex;
                        gap: 12px;
                        margin-top: 15px;
                        overflow-x: auto;
                        padding: 10px 0;
                    }
                    
                    .thumbnail-container-modal .thumbnail {
                        width: 100px;
                        height: 80px;
                        object-fit: cover;
                        border-radius: 8px;
                        cursor: pointer;
                        opacity: 0.7;
                        transition: all 0.3s ease;
                        border: 3px solid transparent;
                    }
                    
                    .thumbnail-container-modal .thumbnail:hover,
                    .thumbnail-container-modal .thumbnail.active {
                        opacity: 1;
                        border-color: var(--secondary-color);
                        transform: scale(1.05);
                    }
                    
                    .property-details-sidebar {
                        background: #f8f9fa;
                        border-radius: 12px;
                        padding: 20px;
                        border-left: 4px solid var(--primary-color);
                        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                    }
                    
                    .details-list {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }
                    
                    .detail-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px 0;
                        border-bottom: 1px solid #e9ecef;
                    }
                    
                    .detail-item:last-child {
                        border-bottom: none;
                    }
                    
                    .detail-label {
                        color: #555;
                        font-size: 0.9rem;
                        display: flex;
                        align-items: center;
                    }
                    
                    .detail-value {
                        font-weight: 600;
                        color: var(--primary-color);
                        font-size: 0.95rem;
                    }
                    
                    .corretor-info {
                        background-color: var(--light-color);
                        border-radius: 10px;
                        padding: 20px;
                        margin-top: 20px;
                        border-left: 4px solid var(--secondary-color);
                        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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
                        color: var(--primary-color);
                        font-size: 20px;
                        margin-right: 15px;
                        border: 2px solid var(--secondary-color);
                    }
                    
                    .corretor-name {
                        font-weight: 600;
                        color: var(--primary-color);
                        margin-bottom: 5px;
                        font-size: 1.1rem;
                    }
                    
                    .corretor-whatsapp-btn {
                        background-color: #25D366;
                        color: white;
                        border: none;
                        padding: 12px 15px;
                        border-radius: 8px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        width: 100%;
                        cursor: pointer;
                        font-size: 0.95rem;
                        text-decoration: none;
                    }
                    
                    .corretor-whatsapp-btn:hover {
                        background-color: #128C7E;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                        color: white;
                        text-decoration: none;
                    }
                    
                    .unified-map {
                        height: 400px;
                        border-radius: 12px;
                        overflow: hidden;
                        margin: 20px 0;
                        border: 1px solid #dee2e6;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    
                    .map-actions {
                        display: flex;
                        gap: 12px;
                        flex-wrap: wrap;
                    }
                    
                    .btn-primary {
                        background-color: var(--primary-color);
                        border-color: var(--primary-color);
                    }
                    
                    .btn-primary:hover {
                        background-color: #0f3d20;
                        border-color: #0f3d20;
                    }
                    
                    .btn-secondary {
                        background-color: var(--secondary-color);
                        border-color: var(--secondary-color);
                    }
                    
                    .btn-secondary:hover {
                        background-color: #e55a25;
                        border-color: #e55a25;
                    }
                    
                    @media (max-width: 768px) {
                        .property-header {
                            padding: 15px 20px;
                            height: 100px;
                        }
                        
                        .logo-img {
                            height: 300px;
                            margin: -100px 0;
                        }
                        
                        .unified-view {
                            padding: 20px;
                        }
                        
                        .property-gallery-modal .main-image {
                            height: 300px;
                        }
                        
                        .gallery-btn-modal {
                            width: 40px;
                            height: 40px;
                            padding: 8px 12px;
                            font-size: 1rem;
                        }
                        
                        .thumbnail-container-modal .thumbnail {
                            width: 80px;
                            height: 60px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="property-header">
                    <div class="logo-container">
                        <img src="https://coimbraitalo01.github.io/novatte-imoveis/assets/logo.png" 
                             alt="Novatte Imóveis - Portal Imobiliário" 
                             class="logo-img">
                    </div>
                </div>
                
                <div class="unified-view">
                    ${this.createPropertyDetail(property, corretor, true)}
                </div>
                
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                <script>
                    // Inicializar mapa
                    setTimeout(() => {
                        const mapElement = document.getElementById('property-map-${property.id}');
                        if (mapElement) {
                            const map = L.map(mapElement).setView([${property.lat}, ${property.lng}], 15);
                            
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: '© OpenStreetMap contributors'
                            }).addTo(map);
                            
                            L.marker([${property.lat}, ${property.lng}])
                                .addTo(map)
                                .bindPopup('<b>${property.title}</b><br>Localização do imóvel')
                                .openPopup();
                        }
                    }, 100);
                    
                    // Funções da galeria
                    let currentImageIndex = 0;
                    const propertyImages = ${JSON.stringify(property.images || [])};
                    
                    function changeMainImage(index) {
                        if (propertyImages.length === 0) return;
                        currentImageIndex = index;
                        const mainImage = document.querySelector('.main-image');
                        const counter = document.querySelector('.image-counter-modal');
                        const thumbnails = document.querySelectorAll('.thumbnail');
                        
                        if (mainImage) mainImage.src = propertyImages[currentImageIndex];
                        if (counter) counter.textContent = \`\${currentImageIndex + 1}/\${propertyImages.length}\`;
                        
                        thumbnails.forEach((thumb, i) => {
                            thumb.classList.toggle('active', i === currentImageIndex);
                        });
                    }
                    
                    function nextImage() {
                        if (propertyImages.length === 0) return;
                        currentImageIndex = (currentImageIndex + 1) % propertyImages.length;
                        changeMainImage(currentImageIndex);
                    }
                    
                    function prevImage() {
                        if (propertyImages.length === 0) return;
                        currentImageIndex = (currentImageIndex - 1 + propertyImages.length) % propertyImages.length;
                        changeMainImage(currentImageIndex);
                    }
                    
                    function openInGoogleMaps(lat, lng) {
                        window.open(\`https://www.google.com/maps?q=\${lat},\${lng}\`, '_blank');
                    }
                    
                    function getDirections(lat, lng) {
                        window.open(\`https://www.google.com/maps/dir/?api=1&destination=\${lat},\${lng}\`, '_blank');
                    }
                    
                    function contactCorretor(whatsapp, propertyTitle, propertyPrice) {
                        const message = \`Olá! Tenho interesse no imóvel: \${propertyTitle} - \${propertyPrice}. Poderia me fornecer mais informações?\`;
                        const whatsappUrl = \`https://wa.me/\${whatsapp}?text=\${encodeURIComponent(message)}\`;
                        window.open(whatsappUrl, '_blank');
                    }
                    
                    function openGalleryModal(startIndex) {
                        // Simples implementação para nova guia
                        changeMainImage(startIndex);
                    }
                </script>
            </body>
            </html>`;
    }

    // Galeria para página completa - COM BOTÕES DE NAVEGAÇÃO
    static createPageGallery(property) {
        if (!property.images || property.images.length === 0) return '';
        
        return `
            <div class="property-gallery-page">
                <div class="main-gallery-container position-relative">
                    <img src="${property.images[0]}" id="mainGalleryImage" class="main-image" alt="${property.title}">
                    ${property.images.length > 1 ? `
                    <div class="gallery-controls-modal">
                        <button class="gallery-btn-modal gallery-prev-modal" onclick="changeImage(-1)">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button class="gallery-btn-modal gallery-next-modal" onclick="changeImage(1)">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                    <div class="image-counter-modal" id="galleryCounter">1/${property.images.length}</div>
                    ` : ''}
                </div>
                ${property.images.length > 1 ? `
                <div class="thumbnail-container-modal">
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