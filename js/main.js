// LGPD - Cookies
function checkLGPD() {
    if (!localStorage.getItem('lgpdAccepted')) {
        document.getElementById('lgpdBanner').style.display = 'block';
    } else {
        document.getElementById('lgpdBanner').style.display = 'none';
    }
}

function acceptCookies() {
    localStorage.setItem('lgpdAccepted', 'true');
    document.getElementById('lgpdBanner').style.display = 'none';
}

function rejectCookies() {
    localStorage.setItem('lgpdAccepted', 'false');
    document.getElementById('lgpdBanner').style.display = 'none';
}

// Função para rolar para o topo ao clicar na logo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Menu toggle para mobile - FUNÇÃO ATUALIZADA
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    nav.classList.toggle('show');
    menuOverlay.classList.toggle('active');
    
    // Alterna entre ícone de menu e X
    if (nav.classList.contains('show')) {
        menuToggle.innerHTML = '<i class="bi bi-x"></i>';
        menuToggle.classList.add('active');
    } else {
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
        menuToggle.classList.remove('active');
    }
}

// Função para fechar o menu quando um link for clicado
function closeMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    nav.classList.remove('show');
    menuOverlay.classList.remove('active');
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    menuToggle.classList.remove('active');
}

// Função para gerenciar dados do usuário
function openDataManagement() {
    alert('Para gerenciar seus dados, entre em contato conosco através do email: novatteimoveis@gmail.com');
}

// Variáveis para controle do carrossel
let currentCarouselIndex = 0;
let carouselInterval;

// Variáveis para controle de galeria
let currentGalleryIndex = 0;
let currentGalleryImages = [];

// Inicializar carrossel
function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    
    // Verificar se os elementos existem
    if (!carouselTrack || !carouselDots) {
        console.log('Elementos do carrossel não encontrados');
        return;
    }

    // Selecionar os primeiros 6 imóveis para o carrossel
    let carouselProperties = [];
    if (typeof properties !== 'undefined' && properties.length > 0) {
        carouselProperties = properties.slice(0, 6);
    } else {
        carouselProperties = [];
    }
    
    // Criar slides do carrossel
    carouselTrack.innerHTML = carouselProperties.map(prop => `
        <div class="carousel-slide">
            <div class="col-lg-8 mx-auto">
                <div class="property-card-booking" onclick="openPropertyInNewTab(${prop.id})">
                    <div class="position-relative">
                        <img src="${prop.image || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'}" 
                             class="property-img-booking" alt="${prop.title}">
                        <span class="badge ${prop.type === 'Venda' ? 'bg-primary' : 'bg-secondary'} property-badge-booking">${prop.type}</span>
                    </div>
                    <div class="property-content-booking">
                        <h3 class="property-title-booking">${prop.title}</h3>
                        <p class="property-location-booking"><i class="bi bi-geo-alt"></i> ${prop.location}</p>
                        <div class="property-features-booking">
                            <div class="feature-item-booking">
                                <i class="bi bi-house-door"></i> ${prop.size}
                            </div>
                            ${prop.bedrooms > 0 ? `
                            <div class="feature-item-booking">
                                <i class="bi bi-door-closed"></i> ${prop.bedrooms} quarto${prop.bedrooms > 1 ? 's' : ''}
                            </div>
                            ` : ''}
                            ${prop.bathrooms > 0 ? `
                            <div class="feature-item-booking">
                                <i class="bi bi-droplet"></i> ${prop.bathrooms} banheiro${prop.bathrooms > 1 ? 's' : ''}
                            </div>
                            ` : ''}
                            ${prop.parking > 0 ? `
                            <div class="feature-item-booking">
                                <i class="bi bi-car-front"></i> ${prop.parking} vaga${prop.parking > 1 ? 's' : ''}
                            </div>
                            ` : ''}
                        </div>
                        <p class="property-description-booking">${prop.description}</p>
                        <div class="property-footer-booking">
                            <div class="property-price-booking">${prop.price}</div>
                            <div class="property-actions-booking">
                                <button class="btn-booking-secondary" onclick="event.stopPropagation(); showPropertyDetails(${prop.id})">Mais Detalhes</button>
                                <button class="btn-booking-whatsapp" onclick="event.stopPropagation(); contactCorretor('${prop.corretor}', ${prop.id})">
                                    <i class="bi bi-whatsapp"></i> Contato
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Criar dots de navegação
    carouselDots.innerHTML = carouselProperties.map((_, index) => `
        <button class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></button>
    `).join('');
    
    // Iniciar autoplay
    startCarouselAutoPlay();
}

// Navegar para slide específico
function goToSlide(index) {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carouselTrack) return;
    
    currentCarouselIndex = index;
    carouselTrack.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    // Atualizar dots ativos
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCarouselIndex);
    });
}

// Navegar para próximo slide
function nextSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
    goToSlide(currentCarouselIndex);
}

// Navegar para slide anterior
function prevSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentCarouselIndex);
}

// Iniciar autoplay do carrossel
function startCarouselAutoPlay() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

// Pausar autoplay
function pauseCarouselAutoPlay() {
    clearInterval(carouselInterval);
}

// Função para renderizar a lista de imóveis
function renderProperties(properties, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (properties.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search display-1 text-muted"></i>
                <h4 class="mt-3 text-muted">Nenhum imóvel encontrado</h4>
                <p class="text-muted">Tente ajustar os filtros para ver mais resultados</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = properties.map(property => 
        PropertyTemplates.createPropertyCard(property)
    ).join('');
}

// Função para renderizar todos os imóveis
function renderAllProperties() {
    if (typeof properties !== 'undefined') {
        renderProperties(properties, 'all-properties-list');
        renderProperties(properties.slice(0, 6), 'property-list');
    } else {
        console.error('Properties não definido');
    }
}

// ===== FUNÇÕES DA GALERIA COMPLETAMENTE CORRIGIDAS =====

// Mudar imagem na galeria do card - FUNÇÃO CORRIGIDA PARA AMBAS AS SEÇÕES
function changeImage(propertyId, direction) {
    console.log('changeImage chamado:', propertyId, direction);
    
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images || property.images.length <= 1) return;
    
    // Encontrar todos os cards que pertencem a este propertyId
    const cards = document.querySelectorAll('.property-card-booking');
    
    cards.forEach(card => {
        // Verificar se este card tem imagens deste property
        const imgElement = card.querySelector('.property-img-booking');
        if (imgElement && property.images.includes(imgElement.src) || 
            (property.images[0] && imgElement.src.includes(property.images[0].split('/').pop()))) {
            
            const counterElement = card.querySelector('.image-counter');
            const thumbnails = card.querySelectorAll('.thumbnail');
            
            // Encontrar índice atual
            let currentIndex = 0;
            if (counterElement && counterElement.textContent) {
                try {
                    currentIndex = parseInt(counterElement.textContent.split('/')[0]) - 1;
                } catch (e) {
                    currentIndex = 0;
                }
            } else {
                // Fallback: encontrar pelo src da imagem
                const currentSrc = imgElement.src;
                currentIndex = property.images.findIndex(img => currentSrc.includes(img.split('/').pop()));
                if (currentIndex === -1) currentIndex = 0;
            }
            
            let newIndex = (currentIndex + direction + property.images.length) % property.images.length;
            
            // Atualizar imagem principal
            imgElement.src = property.images[newIndex];
            
            // Atualizar contador
            if (counterElement) {
                counterElement.textContent = `${newIndex + 1}/${property.images.length}`;
            }
            
            // Atualizar thumbnails ativos
            thumbnails.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === newIndex);
            });
        }
    });
}

// Mostrar imagem específica - FUNÇÃO CORRIGIDA PARA AMBAS AS SEÇÕES
function showImage(propertyId, index) {
    console.log('showImage chamado:', propertyId, index);
    
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    // Encontrar todos os cards que pertencem a este propertyId
    const cards = document.querySelectorAll('.property-card-booking');
    
    cards.forEach(card => {
        const imgElement = card.querySelector('.property-img-booking');
        if (imgElement && property.images.includes(imgElement.src) || 
            (property.images[0] && imgElement.src.includes(property.images[0].split('/').pop()))) {
            
            const counterElement = card.querySelector('.image-counter');
            const thumbnails = card.querySelectorAll('.thumbnail');
            
            // Atualizar imagem principal
            imgElement.src = property.images[index];
            
            // Atualizar contador
            if (counterElement) {
                counterElement.textContent = `${index + 1}/${property.images.length}`;
            }
            
            // Atualizar thumbnails ativos
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }
    });
}

// ===== FUNÇÕES DO MODAL DE DETALHES CORRIGIDAS =====

// Mudar imagem principal no modal
function changeMainImage(propertyId, index) {
    console.log('changeMainImage chamado:', propertyId, index);
    
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    const modal = document.getElementById('propertyModal');
    const mainImage = modal.querySelector('.main-image');
    const counter = modal.querySelector('.image-counter-modal');
    const thumbnails = modal.querySelectorAll('.thumbnail-container-modal .thumbnail');
    
    if (mainImage) mainImage.src = property.images[index];
    if (counter) counter.textContent = `${index + 1}/${property.images.length}`;
    
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Navegar para imagem anterior no modal
function prevImage(propertyId) {
    console.log('prevImage chamado:', propertyId);
    
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    const modal = document.getElementById('propertyModal');
    const counter = modal.querySelector('.image-counter-modal');
    if (!counter) return;
    
    let currentIndex = parseInt(counter.textContent.split('/')[0]) - 1;
    let newIndex = (currentIndex - 1 + property.images.length) % property.images.length;
    changeMainImage(propertyId, newIndex);
}

// Navegar para próxima imagem no modal
function nextImage(propertyId) {
    console.log('nextImage chamado:', propertyId);
    
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    const modal = document.getElementById('propertyModal');
    const counter = modal.querySelector('.image-counter-modal');
    if (!counter) return;
    
    let currentIndex = parseInt(counter.textContent.split('/')[0]) - 1;
    let newIndex = (currentIndex + 1) % property.images.length;
    changeMainImage(propertyId, newIndex);
}

// Mostrar detalhes do imóvel no modal
function showPropertyDetails(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const corretor = corretores[property.corretor];
    const modalContent = document.getElementById('property-detail-content');
    
    if (modalContent) {
        modalContent.innerHTML = PropertyTemplates.createPropertyDetail(property, corretor);
        
        // Inicializar mapa
        setTimeout(() => {
            initPropertyMap(propertyId, property.lat, property.lng, property.title);
        }, 100);
        
        // Abrir modal
        const modal = new bootstrap.Modal(document.getElementById('propertyModal'));
        modal.show();
    }
}

// Inicializar mapa do imóvel
function initPropertyMap(propertyId, lat, lng, title) {
    const mapElement = document.getElementById(`property-map-${propertyId}`);
    if (!mapElement) return;
    
    try {
        const map = L.map(mapElement).setView([lat, lng], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>${title}</b><br>Localização do imóvel`)
            .openPopup();
            
    } catch (error) {
        console.error('Erro ao carregar mapa:', error);
        mapElement.innerHTML = `
            <div class="text-center p-4 bg-light rounded">
                <i class="bi bi-map display-4 text-muted"></i>
                <p class="mt-2 text-muted">Mapa não disponível</p>
                <button class="btn btn-primary mt-2" onclick="openInGoogleMaps(${lat}, ${lng})">
                    Abrir no Google Maps
                </button>
            </div>
        `;
    }
}

// ===== FUNÇÕES DA GALERIA MODAL =====

// Abrir galeria modal
function openGalleryModal(propertyId, startIndex = 0) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    currentGalleryImages = property.images;
    currentGalleryIndex = startIndex;
    
    updateGalleryModal();
    
    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    modal.show();
}

// Atualizar galeria modal
function updateGalleryModal() {
    const modalImg = document.getElementById('galleryModalImg');
    const modalCounter = document.getElementById('galleryModalCounter');
    
    if (modalImg && modalCounter && currentGalleryImages.length > 0) {
        modalImg.src = currentGalleryImages[currentGalleryIndex];
        modalCounter.textContent = `${currentGalleryIndex + 1}/${currentGalleryImages.length}`;
    }
}

// Navegar na galeria modal
function galleryModalNext() {
    if (currentGalleryImages.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    updateGalleryModal();
}

function galleryModalPrev() {
    if (currentGalleryImages.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateGalleryModal();
}

// ===== FUNÇÕES PRINCIPAIS =====

// Abrir imóvel em nova guia - FUNÇÃO COMPLETAMENTE REFEITA
function openPropertyInNewTab(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const corretor = corretores[property.corretor];
    
    // Criar HTML completo para a nova guia
    const propertyPageHTML = `
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
            
            .logo-img {
                height: 400px;
                width: auto;
                object-fit: contain;
                max-width: 500px;
                margin: -140px 0;
            }
            
            .property-content {
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
                
                .property-content {
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
                <img src="${window.location.origin}/assets/logo.png" 
                     alt="Novatte Imóveis - Portal Imobiliário" 
                     class="logo-img">
            </div>
        </div>
        
        <div class="property-content">
            ${PropertyTemplates.createPropertyDetail(property, corretor, true)}
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
        </script>
    </body>
    </html>`;
    
    const newWindow = window.open('', '_blank');
    newWindow.document.write(propertyPageHTML);
    newWindow.document.close();
}

// Contatar corretor via WhatsApp
function contactCorretor(corretorId, propertyId = null) {
    const corretor = corretores[corretorId];
    const property = propertyId ? properties.find(p => p.id === propertyId) : null;
    
    if (!corretor) return;
    
    let message = `Olá ${corretor.nome}! `;
    
    if (property) {
        message += `Tenho interesse no imóvel: ${property.title} - ${property.price}. `;
        message += `Localizado em: ${property.location}. `;
        message += `Poderia me fornecer mais informações?`;
    } else {
        message += `Gostaria de mais informações sobre os imóveis disponíveis.`;
    }
    
    const whatsappUrl = `https://wa.me/${corretor.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Funções de mapa
function openInGoogleMaps(lat, lng) {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
}

function getDirections(lat, lng) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar LGPD
    checkLGPD();

    // Botões LGPD
    document.getElementById('acceptCookies')?.addEventListener('click', acceptCookies);
    document.getElementById('rejectCookies')?.addEventListener('click', rejectCookies);

    // Botão WhatsApp fixo
    document.getElementById('whatsappFixedBtn')?.addEventListener('click', function() {
        window.open('https://wa.me/5522992054592?text=Olá! Gostaria de mais informações sobre os imóveis.', '_blank');
    });

    // Inicializar carrossel
    initCarousel();
    
    // Eventos para carrossel
    document.getElementById('carouselPrev')?.addEventListener('click', prevSlide);
    document.getElementById('carouselNext')?.addEventListener('click', nextSlide);
    
    // Pausar autoplay ao interagir com o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', pauseCarouselAutoPlay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoPlay);
    }

    // Eventos da galeria modal
    document.getElementById('galleryModalNext')?.addEventListener('click', galleryModalNext);
    document.getElementById('galleryModalPrev')?.addEventListener('click', galleryModalPrev);

    // INICIALIZAR E RENDERIZAR IMÓVEIS
    setTimeout(() => {
        renderAllProperties();
        if (typeof initFilter === 'function') {
            initFilter();
        }
    }, 100);

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Formatação do campo de preço
    document.getElementById('max-price')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = parseInt(value).toLocaleString('pt-BR');
            e.target.value = value;
        }
    });

    // Formatação do campo de valor máximo na seção "Encontre seu imóvel"
    document.getElementById('maxValue')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = parseInt(value).toLocaleString('pt-BR');
            e.target.value = value;
        }
    });

    // Form de busca de imóvel
    document.getElementById('propertySearchForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('fullName').value;
        
        alert('Obrigado, ' + name + '! Entraremos em contato quando encontrarmos imóveis do seu interesse.');
        this.reset();
    });

    // Filtros
    document.getElementById('applyFiltersBtn')?.addEventListener('click', function() {
        if (typeof propertyFilter !== 'undefined') {
            const filtered = propertyFilter.applyFilters();
            renderProperties(filtered, 'property-list');
            document.getElementById('loadMoreBtn').style.display = 
                propertyFilter.hasMoreProperties() ? 'block' : 'none';
        } else {
            alert('Sistema de filtros em desenvolvimento');
        }
    });

    document.getElementById('clearFiltersBtn')?.addEventListener('click', function() {
        if (typeof propertyFilter !== 'undefined') {
            const allProperties = propertyFilter.clearFilters();
            renderProperties(allProperties.slice(0, 6), 'property-list');
            document.getElementById('loadMoreBtn').style.display = 'block';
        } else {
            document.getElementById('property-type').value = 'all';
            document.getElementById('city').value = 'all';
            document.getElementById('transaction-type').value = 'all';
            document.getElementById('max-price').value = '';
        }
    });

    document.getElementById('resetFiltersBtn')?.addEventListener('click', function() {
        if (typeof propertyFilter !== 'undefined') {
            const allProperties = propertyFilter.clearFilters();
            renderProperties(allProperties.slice(0, 6), 'property-list');
            document.getElementById('loadMoreBtn').style.display = 'block';
        }
    });

    document.getElementById('loadMoreBtn')?.addEventListener('click', function() {
        if (typeof propertyFilter !== 'undefined') {
            const moreProperties = propertyFilter.loadMore();
            renderProperties(moreProperties, 'property-list');
            
            if (!propertyFilter.hasMoreProperties()) {
                this.style.display = 'none';
            }
        } else {
            alert('Funcionalidade de carregar mais será implementada em breve');
        }
    });
});

// Exportar funções para uso global
window.changeImage = changeImage;
window.showImage = showImage;
window.changeMainImage = changeMainImage;
window.prevImage = prevImage;
window.nextImage = nextImage;
window.openGalleryModal = openGalleryModal;