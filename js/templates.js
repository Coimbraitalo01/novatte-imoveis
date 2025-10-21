// js/templates.js - VERSÃO COMPLETA E CORRIGIDA COM LIGHTBOX

// Templates para componentes reutilizáveis
class PropertyTemplates {
    
    // Template do card de propriedade - SEM ÍCONE DE LUPA
    static createPropertyCard(property) {
        return `
            <div class="col-lg-4 col-md-6 mb-4" data-property-id="${property.id}">
                <div class="property-card-booking" data-property-id="${property.id}" data-current-image="0" onclick="openPropertyInNewTab(${property.id})">
                    <div class="position-relative property-card-gallery image-zoom-container">
                        <img src="${property.images ? property.images[0] : property.image}" 
                             class="property-img-booking" onclick="event.stopPropagation();"
                             alt="${property.title}">
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
                                <button type="button" class="btn-booking-secondary" onclick="event.preventDefault(); event.stopPropagation(); showPropertyDetails(${property.id})">Mais Detalhes</button>
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

    // Controles da galeria - SEM ÍCONES DE ZOOM
    static createGalleryControls(property) {
        return `
            <div class="gallery-controls">
                <button type="button" class="gallery-btn" data-direction="-1"
                        onclick="event.preventDefault(); event.stopPropagation(); changeImage(${property.id}, -1, this)">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button type="button" class="gallery-btn" data-direction="1"
                        onclick="event.preventDefault(); event.stopPropagation(); changeImage(${property.id}, 1, this)">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
            <div class="image-counter">1/${property.images.length}</div>
            <div class="thumbnail-container">
                ${property.images.map((img, index) => `
                    <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" data-thumb-index="${index}"
                         onclick="event.preventDefault(); event.stopPropagation(); showImage(${property.id}, ${index}, this)"
                         alt="Thumbnail ${index + 1}">
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

    // Template para o botão "Ver mais imóveis"
    static createLoadMoreButton(sectionId, onClickFunction) {
        return `
            <div class="load-more-container" id="${sectionId}LoadMore">
                <button class="btn-load-more" onclick="${onClickFunction}">
                    <i class="bi bi-arrow-down-circle me-2"></i>Ver Mais Imóveis
                </button>
            </div>
        `;
    }

    // Template da página de detalhes (modal) - COM LIGHTBOX INTEGRADO
    static createPropertyDetail(property, corretor, isNewTab = false) {
        const whatsappFunction = isNewTab ? 
            `contactCorretor('${corretor.whatsapp}', '${property.title}', '${property.price}')` :
            `contactCorretor('${property.corretor}', ${property.id})`;
        
        let galleryHtml = '';
        if (property.images && property.images.length > 0) {
            galleryHtml = this.createModalGallery(property, isNewTab);
        }

        // Estrutura para desktop
        const desktopLayout = `
            <div class="unified-view desktop-layout">
                <div class="row">
                    <div class="col-lg-8">
                        <h2>${property.title}</h2>
                        <p class="text-muted"><i class="bi bi-geo-alt"></i> ${property.location}</p>
                        <h3 class="price-tag text-primary mb-4">${property.price}</h3>
                        
                        <!-- Galeria de Fotos COM LIGHTBOX -->
                        ${galleryHtml}
                        
                        <!-- Descrição -->
                        <div class="property-description-section">
                            <h5>Descrição</h5>
                            <p class="property-description-text">${property.description}</p>
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
                    
                    <!-- Sidebar - Detalhes do Imóvel acima e Corretor abaixo -->
                    <div class="col-lg-4">
                        <!-- DETALHES DO IMÓVEL -->
                        <div class="property-details-sidebar">
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

                        <div class="corretor-card mt-4">
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
                    </div>
                </div>
            </div>
        `;

        // Estrutura para mobile
        const mobileLayout = `
            <div class="unified-view mobile-property-detail mobile-layout">
                <div class="row">
                    <div class="col-12">
                        <h2>${property.title}</h2>
                        <p class="text-muted"><i class="bi bi-geo-alt"></i> ${property.location}</p>
                        <h3 class="price-tag text-primary mb-4">${property.price}</h3>
                        
                        <!-- Galeria de Fotos COM LIGHTBOX -->
                        ${galleryHtml}
                        
                        <!-- Descrição -->
                        <div class="property-description-section">
                            <h5>Descrição</h5>
                            <p class="property-description-text">${property.description}</p>
                        </div>

                        <!-- DETALHES DO IMÓVEL -->
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
                        
                        <!-- CORRETOR -->
                        <div class="corretor-card mt-4">
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
                        
                        <!-- LOCALIZAÇÃO -->
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
                </div>
            </div>
        `;

        // Retornar layout baseado no dispositivo
        if (isNewTab) {
            return `
                ${desktopLayout}
                <style>
                    @media (max-width: 768px) {
                        .desktop-layout { display: none; }
                        .mobile-layout { display: block; }
                    }
                    @media (min-width: 769px) {
                        .mobile-layout { display: none; }
                    }
                </style>
                ${mobileLayout}
            `;
        }

        // Para modal, retornar apenas desktop layout
        return desktopLayout;
    }

    // Galeria para modal - SEM ÍCONES DE ZOOM
    static createModalGallery(property, isNewTab = false) {
        if (!property.images || property.images.length === 0) return '';
        
        let thumbnailsHtml = '';
        
        property.images.forEach((img, index) => {
            thumbnailsHtml += `
                <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                     onclick="${isNewTab ? `changeMainImage(${index})` : `changeMainImage(${property.id}, ${index})`}" 
                     alt="${property.title} - Foto ${index + 1}">
            `;
        });

        // Funções para lightbox
        const lightboxFunction = isNewTab ? 
            `openPropertyLightboxNewTab(${JSON.stringify(property.images)}, ${0})` : 
            `openPropertyLightbox(${property.id})`;

        const prevFunction = isNewTab ? 'prevImage()' : `prevImage(${property.id})`;
        const nextFunction = isNewTab ? 'nextImage()' : `nextImage(${property.id})`;

        return `
            <div class="property-gallery-modal" data-current-image="0">
                <div class="main-gallery-container position-relative image-zoom-container" 
                     onclick="${lightboxFunction}">
                    <img src="${property.images[0]}" class="main-image" 
                         alt="${property.title}">
                    
                    <!-- BOTÕES DE NAVEGAÇÃO -->
                    ${property.images.length > 1 ? `
                    <div class="gallery-controls-modal">
                        <button class="gallery-btn-modal gallery-prev-modal" onclick="event.stopPropagation(); ${prevFunction}">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button class="gallery-btn-modal gallery-next-modal" onclick="event.stopPropagation(); ${nextFunction}">
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

    // Template da página completa (nova guia) - COM LIGHTBOX INTEGRADO
    static createPropertyPage(property, corretor) {
        const logoPath = window.location.origin + '/novatte-imoveis/assets/logo.png';
        
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
            padding: 15px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            height: 100px;
        }
        
        .logo-container {
            display: flex;
            align-items: center;
            height: 100%;
            flex: 0 0 auto;
        }
        
        .logo-img {
            height: 300px;
            width: auto;
            object-fit: contain;
            max-width: 400px;
            margin: -100px 0;
        }
        
        .unified-view {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px;
        }
        
        /* ===== LIGHTBOX MODERNO - ESTILOS INCLUÍDOS ===== */
        .image-lightbox-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(10px);
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .image-lightbox-overlay.active {
            display: flex;
            opacity: 1;
        }
        
        .image-lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90vh;
            width: auto;
            height: auto;
            margin: 0 auto;
        }
        
        .image-lightbox-image-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }
        
        .image-lightbox-img {
            max-width: 100%;
            max-height: 80vh;
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
        }
        
        .image-lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10001;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .image-lightbox-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }
        
        .image-lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10001;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .image-lightbox-nav:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
        }
        
        .image-lightbox-prev {
            left: 20px;
        }
        
        .image-lightbox-next {
            right: 20px;
        }
        
        .image-lightbox-counter {
            position: absolute;
            top: -50px;
            left: 0;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            backdrop-filter: blur(10px);
        }
        
        .image-lightbox-caption {
            position: absolute;
            bottom: -50px;
            left: 0;
            right: 0;
            text-align: center;
            color: white;
            font-size: 0.9rem;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 8px;
        }
        
        .image-lightbox-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10002;
        }
        
        /* ESTILOS PARA EXPANSÃO DE IMAGEM */
        .image-zoom-container {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            border-radius: 12px;
        }
        
        .image-zoom-container .main-image {
            transition: transform 0.3s ease, filter 0.3s ease;
        }
        
        .image-zoom-container:hover .main-image {
            transform: scale(1.02);
            filter: brightness(1.05);
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
                padding: 8px 15px;
                height: 100px;
            }
            
            .logo-img {
                height: 300px !important;
                max-width: 400px !important;
                margin: -100px 0 !important;
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
            
            /* LIGHTBOX MOBILE */
            .image-lightbox-overlay {
                padding: 10px;
            }
            
            .image-lightbox-content {
                max-width: 95%;
                max-height: 85vh;
            }
            
            .image-lightbox-close {
                top: -40px;
                right: -5px;
                width: 40px;
                height: 40px;
                font-size: 1.3rem;
            }
            
            .image-lightbox-nav {
                width: 45px;
                height: 45px;
                font-size: 1.2rem;
            }
            
            .image-lightbox-prev {
                left: 10px;
            }
            
            .image-lightbox-next {
                right: 10px;
            }
            
            .image-lightbox-counter {
                top: -40px;
                font-size: 0.8rem;
                padding: 6px 12px;
            }
            
            .image-lightbox-caption {
                bottom: -40px;
                font-size: 0.8rem;
            }
            
            .desktop-layout { display: none; }
            .mobile-layout { display: block; }
        }

        @media (min-width: 769px) {
            .mobile-layout { display: none; }
        }

        @media (max-width: 480px) {
            .property-header {
                padding: 6px 12px;
                height: 90px;
            }
            
            .logo-img {
                height: 250px !important;
                max-width: 350px !important;
                margin: -80px 0 !important;
            }
            
            .image-lightbox-content {
                max-width: 98%;
            }
            
            .image-lightbox-close {
                top: -35px;
                width: 35px;
                height: 35px;
                font-size: 1.1rem;
            }
            
            .image-lightbox-nav {
                width: 40px;
                height: 40px;
                font-size: 1.1rem;
            }
        }
    </style>
</head>
<body>
    <div class="property-header">
        <div class="logo-container">
            <img src="${logoPath}" 
                 alt="Novatte Imóveis - Portal Imobiliário" 
                 class="logo-img"
                 onerror="this.src='https://via.placeholder.com/400x300/1a4d2e/ffffff?text=Novatte+Imóveis'; this.style.margin='0'; this.style.height='auto';">
        </div>
    </div>
    
    <div class="unified-view">
        ${this.createPropertyDetail(property, corretor, true)}
    </div>
    
    <!-- LIGHTBOX MODERNO -->
    <div id="image-lightbox" class="image-lightbox-overlay">
        <div class="image-lightbox-content">
            <button class="image-lightbox-close" onclick="closeLightboxNewTab()" aria-label="Fechar lightbox">
                <i class="bi bi-x-lg"></i>
            </button>
            <button class="image-lightbox-nav image-lightbox-prev" onclick="navigateLightboxNewTab(-1)" aria-label="Imagem anterior">
                <i class="bi bi-chevron-left"></i>
            </button>
            <button class="image-lightbox-nav image-lightbox-next" onclick="navigateLightboxNewTab(1)" aria-label="Próxima imagem">
                <i class="bi bi-chevron-right"></i>
            </button>
            <div class="image-lightbox-counter" id="lightboxCounter"></div>
            <div class="image-lightbox-image-container">
                <img id="lightboxImage" class="image-lightbox-img" src="" alt="">
                <div class="image-lightbox-loading" id="lightboxLoading">
                    <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Carregando...</span>
                    </div>
                </div>
            </div>
            <div class="image-lightbox-caption" id="lightboxCaption"></div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script>
        // Inicializar mapa
        setTimeout(() => {
            const mapElement = document.getElementById('property-map-${property.id}');
            if (mapElement) {
                const map = L.map(mapElement).setView([${property.lat}, ${property.lng}], 15);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}/.png', {
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
            if (counter) counter.textContent = (currentImageIndex + 1) + '/' + propertyImages.length;
            
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
        
        // ===== LIGHTBOX PARA NOVA GUIA =====
        let currentLightboxImages = [];
        let currentLightboxIndex = 0;
        const lightboxElement = document.getElementById('image-lightbox');
        
        function openPropertyLightboxNewTab(images, startIndex = 0) {
            if (!images || images.length === 0) return;
            
            currentLightboxImages = images;
            currentLightboxIndex = startIndex;
            updateLightboxNewTab();
            
            setTimeout(() => {
                lightboxElement.style.display = 'flex';
                lightboxElement.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 10);
        }
        
        function closeLightboxNewTab() {
            if (!lightboxElement) return;
            
            lightboxElement.classList.remove('active');
            
            setTimeout(() => {
                lightboxElement.style.display = 'none';
                document.body.style.overflow = '';
                currentLightboxImages = [];
                currentLightboxIndex = 0;
            }, 300);
        }
        
        function navigateLightboxNewTab(direction) {
            if (currentLightboxImages.length <= 1) return;
            
            currentLightboxIndex = (currentLightboxIndex + direction + currentLightboxImages.length) % currentLightboxImages.length;
            updateLightboxNewTab();
        }
        
        function updateLightboxNewTab() {
            if (!lightboxElement || currentLightboxImages.length === 0) return;
            
            const lightboxImg = document.getElementById('lightboxImage');
            const lightboxCounter = document.getElementById('lightboxCounter');
            const lightboxLoading = document.getElementById('lightboxLoading');
            const lightboxCaption = document.getElementById('lightboxCaption');
            
            if (!lightboxImg || !lightboxCounter) return;
            
            lightboxLoading.style.display = 'flex';
            lightboxImg.style.opacity = '0';
            
            const img = new Image();
            img.onload = function() {
                lightboxImg.src = this.src;
                lightboxImg.alt = 'Imagem ' + (currentLightboxIndex + 1) + ' de ' + currentLightboxImages.length;
                lightboxImg.style.opacity = '1';
                lightboxLoading.style.display = 'none';
                
                if (lightboxCaption) {
                    lightboxCaption.textContent = 'Imagem ' + (currentLightboxIndex + 1) + ' de ' + currentLightboxImages.length;
                }
            };
            
            img.onerror = function() {
                lightboxImg.src = 'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Imagem+Não+Disponível';
                lightboxImg.alt = 'Imagem não disponível';
                lightboxImg.style.opacity = '1';
                lightboxLoading.style.display = 'none';
                
                if (lightboxCaption) {
                    lightboxCaption.textContent = 'Imagem não disponível';
                }
            };
            
            img.src = currentLightboxImages[currentLightboxIndex];
            
            lightboxCounter.textContent = (currentLightboxIndex + 1) + ' / ' + currentLightboxImages.length;
            
            const prevBtn = document.querySelector('.image-lightbox-prev');
            const nextBtn = document.querySelector('.image-lightbox-next');
            
            if (prevBtn && nextBtn) {
                const showNav = currentLightboxImages.length > 1;
                prevBtn.style.display = showNav ? 'flex' : 'none';
                nextBtn.style.display = showNav ? 'flex' : 'none';
            }
        }
        
        document.addEventListener('keydown', function(e) {
            if (!lightboxElement || !lightboxElement.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightboxNewTab();
                    break;
                case 'ArrowLeft':
                    navigateLightboxNewTab(-1);
                    break;
                case 'ArrowRight':
                    navigateLightboxNewTab(1);
                    break;
            }
        });
        
        lightboxElement.addEventListener('click', function(e) {
            if (e.target === lightboxElement) {
                closeLightboxNewTab();
            }
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            const expandableImages = document.querySelectorAll('.image-zoom-container img');
            expandableImages.forEach((img, index) => {
                const container = img.closest('.image-zoom-container');
                if (container) {
                    const handler = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        openPropertyLightboxNewTab(propertyImages, index);
                    };
                    container.addEventListener('click', handler);
                    img.addEventListener('click', handler);
                }
            });
        });
        
        function openInGoogleMaps(lat, lng) {
            window.open('https://www.google.com/maps?q=' + lat + ',' + lng, '_blank');
        }
        
        function getDirections(lat, lng) {
            window.open('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng, '_blank');
        }
        
        function contactCorretor(whatsapp, propertyTitle, propertyPrice) {
            const message = 'Olá! Tenho interesse no imóvel: ' + propertyTitle + ' - ' + propertyPrice + '. Poderia me fornecer mais informações?';
            const whatsappUrl = 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(message);
            window.open(whatsappUrl, '_blank');
        }
    </script>
</body>
</html>`;
    }

    // Mensagem personalizada do WhatsApp
    static createWhatsAppMessage(property, corretor) {
        return 'Olá ' + corretor.nome + ', fiquei interessado no anúncio que vi no portal da Novatte: ' + property.title + ' - ' + property.price + '. Localizado em: ' + property.location + '. Poderia me fornecer mais informações?';
    }
}

// Exporta para uso global
window.PropertyTemplates = PropertyTemplates;