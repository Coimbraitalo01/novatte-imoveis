// LGPD - Cookies - CORREÇÃO DEFINITIVA E TESTADA
function checkLGPD() {
    const lgpdAccepted = localStorage.getItem('lgpdAccepted');
    const lgpdBanner = document.getElementById('lgpdBanner');
    
    console.log('🔍 checkLGPD executado - Status:', lgpdAccepted);
    console.log('🔍 Banner LGPD encontrado:', !!lgpdBanner);
    
    if (!lgpdBanner) {
        console.error('❌ Banner LGPD não encontrado no DOM');
        return;
    }
    
    // CORREÇÃO: Mostrar banner apenas se NÃO foi aceito (null) ou foi rejeitado (false)
    if (lgpdAccepted === null || lgpdAccepted === 'false') {
        console.log('📢 Mostrando banner LGPD');
        lgpdBanner.style.display = 'block';
        lgpdBanner.classList.add('show');
        // Garantir que está visível e no topo
        lgpdBanner.style.zIndex = '9999';
        document.body.style.marginBottom = lgpdBanner.offsetHeight + 'px';
    } else {
        console.log('👌 Escondendo banner LGPD - aceito');
        lgpdBanner.style.display = 'none';
        lgpdBanner.classList.remove('show');
        document.body.style.marginBottom = '0';
    }
}

function acceptCookies() {
    console.log('✅ Aceitando cookies');
    localStorage.setItem('lgpdAccepted', 'true');
    const lgpdBanner = document.getElementById('lgpdBanner');
    if (lgpdBanner) {
        lgpdBanner.style.display = 'none';
        lgpdBanner.classList.remove('show');
        document.body.style.marginBottom = '0';
    }
    // Mostrar confirmação
    alert('Obrigado por aceitar nossa política de cookies!');
}

function rejectCookies() {
    console.log('❌ Rejeitando cookies');
    localStorage.setItem('lgpdAccepted', 'false');
    const lgpdBanner = document.getElementById('lgpdBanner');
    if (lgpdBanner) {
        lgpdBanner.style.display = 'none';
        lgpdBanner.classList.remove('show');
        document.body.style.marginBottom = '0';
    }
    alert('Você rejeitou os cookies. Algumas funcionalidades podem não estar disponíveis.');
}

// CORREÇÃO: Menu Hamburguer - Funções simplificadas e funcionais
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    console.log('🍔 toggleMenu chamado - Estado atual:', nav?.classList.contains('show'));
    
    if (!nav || !menuToggle || !menuOverlay) {
        console.error('❌ Elementos do menu não encontrados');
        return;
    }
    
    const isOpen = nav.classList.contains('show');
    
    if (isOpen) {
        // Fechar menu
        nav.classList.remove('show');
        menuOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
        document.body.style.overflow = '';
        console.log('📱 Menu fechado');
    } else {
        // Abrir menu
        nav.classList.add('show');
        menuOverlay.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.innerHTML = '<i class="bi bi-x"></i>';
        document.body.style.overflow = 'hidden';
        console.log('📱 Menu aberto');
    }
}

function closeMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    console.log('📱 closeMenu chamado');
    
    if (!nav || !menuToggle || !menuOverlay) return;
    
    nav.classList.remove('show');
    menuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    document.body.style.overflow = '';
}

// Função para limpar decisão anterior e testar novamente
function resetLGPD() {
    localStorage.removeItem('lgpdAccepted');
    localStorage.removeItem('cookiesAccepted');
    console.log('🔄 LGPD resetado - banner deve aparecer na próxima visita');
    checkLGPD();
}

// Função para rolar para o topo ao clicar na logo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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

// ===== FUNÇÕES PARA BOTÕES "VER MAIS" CONDICIONAIS =====

// Função para verificar se deve mostrar o botão "Ver mais imóveis"
function shouldShowLoadMore(containerId, maxItems = 6) {
    const container = document.getElementById(containerId);
    if (!container) return false;
    
    // Contar quantos imóveis estão sendo exibidos
    const displayedProperties = container.querySelectorAll('.property-card-booking').length;
    
    // Verificar se há mais propriedades disponíveis
    if (typeof properties !== 'undefined') {
        const totalProperties = properties.length;
        return displayedProperties < totalProperties && displayedProperties >= maxItems;
    }
    
    return false;
}

// Função para atualizar a visibilidade dos botões "Ver mais"
function updateLoadMoreButtons() {
    const featuredLoadMore = document.getElementById('featuredLoadMore');
    const allPropertiesLoadMore = document.getElementById('allPropertiesLoadMore');
    
    console.log('🔄 Atualizando botões "Ver mais"');
    
    // Botão "Imóveis em Destaque"
    if (featuredLoadMore) {
        const shouldShow = shouldShowLoadMore('property-list');
        featuredLoadMore.style.display = shouldShow ? 'block' : 'none';
        console.log(`📊 Botão destaque: ${shouldShow ? 'VISÍVEL' : 'OCULTO'}`);
    }
    
    // Botão "Todos os Imóveis"
    if (allPropertiesLoadMore) {
        const shouldShow = shouldShowLoadMore('all-properties-list', 12);
        allPropertiesLoadMore.style.display = shouldShow ? 'block' : 'none';
        console.log(`📊 Botão todos: ${shouldShow ? 'VISÍVEL' : 'OCULTO'}`);
    }
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
        // Atualizar botões após renderizar
        setTimeout(updateLoadMoreButtons, 100);
        return;
    }
    
    container.innerHTML = properties.map(property => 
        PropertyTemplates.createPropertyCard(property)
    ).join('');
    
    // Atualizar botões após renderizar
    setTimeout(updateLoadMoreButtons, 100);
}

// Função para renderizar todos os imóveis
function renderAllProperties() {
    if (typeof properties !== 'undefined') {
        // Imóveis em destaque (primeiros 6)
        renderProperties(properties.slice(0, 6), 'property-list');
        
        // Todos os imóveis (todos ou limitado para paginação)
        const initialAllProperties = properties.slice(0, 12); // Mostra 12 inicialmente
        renderProperties(initialAllProperties, 'all-properties-list');
        
        console.log(`🏠 Total de imóveis: ${properties.length}`);
        console.log(`📱 Imóveis em destaque: 6`);
        console.log(`📊 Todos os imóveis: ${Math.min(12, properties.length)}`);
    } else {
        console.error('Properties não definido');
    }
}

// Função para carregar mais imóveis na seção de destaque
function loadMoreFeatured() {
    if (typeof properties === 'undefined') return;
    
    const currentCount = document.querySelectorAll('#property-list .property-card-booking').length;
    const newProperties = properties.slice(currentCount, currentCount + 3);
    
    if (newProperties.length > 0) {
        const container = document.getElementById('property-list');
        newProperties.forEach(property => {
            container.innerHTML += PropertyTemplates.createPropertyCard(property);
        });
        updateLoadMoreButtons();
        console.log(`➕ Carregados mais ${newProperties.length} imóveis em destaque`);
    }
}

// Função para carregar mais imóveis na seção "Todos os Imóveis"
function loadMoreAllProperties() {
    if (typeof properties === 'undefined') return;
    
    const currentCount = document.querySelectorAll('#all-properties-list .property-card-booking').length;
    const newProperties = properties.slice(currentCount, currentCount + 6);
    
    if (newProperties.length > 0) {
        const container = document.getElementById('all-properties-list');
        newProperties.forEach(property => {
            container.innerHTML += PropertyTemplates.createPropertyCard(property);
        });
        updateLoadMoreButtons();
        console.log(`➕ Carregados mais ${newProperties.length} imóveis em "Todos os Imóveis"`);
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
    
    // CORREÇÃO: Usar caminho absoluto para a logo no GitHub Pages
    const logoPath = window.location.origin + '/novatte-imoveis/assets/logo.png';
    
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
                padding: 15px 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                height: 100px;
            }
            
            .logo-img {
                height: 300px;
                width: auto;
                object-fit: contain;
                max-width: 400px;
                margin: -100px 0;
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
                    padding: 8px 15px;
                    height: 100px;
                }
                
                .logo-img {
                    height: 300px !important;
                    max-width: 400px !important;
                    margin: -100px 0 !important;
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
                
                /* CORREÇÃO: Layout mobile para nova ordem */
                .mobile-property-detail .corretor-card {
                    order: 2;
                    margin-top: 20px;
                }
                
                .mobile-property-detail .property-details-sidebar {
                    order: 3;
                    margin-top: 20px;
                }
                
                .mobile-property-detail .property-location {
                    order: 4;
                    margin-top: 20px;
                }
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
            
            function openGalleryModal(startIndex) {
                // Simples implementação para nova guia
                changeMainImage(startIndex);
            }
        </script>
    </body>
    </html>`;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
        newWindow.document.write(propertyPageHTML);
        newWindow.document.close();
    }
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

// ===== INICIALIZAÇÃO CORRIGIDA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARREGADO - INICIANDO CONFIGURAÇÕES ===');
    
    // 1. LGPD - PRIMEIRO E AGORA FUNCIONAL
    console.log('1. Iniciando checkLGPD...');
    checkLGPD();

    // 2. Botões LGPD
    console.log('2. Configurando botões LGPD...');
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
        console.log('✅ Botão Aceitar configurado');
    } else {
        console.error('❌ Botão Aceitar não encontrado');
    }
    
    if (rejectBtn) {
        rejectBtn.addEventListener('click', rejectCookies);
        console.log('✅ Botão Rejeitar configurado');
    } else {
        console.error('❌ Botão Rejeitar não encontrado');
    }

    // 3. Menu Hamburguer - CORREÇÃO DEFINITIVA
    console.log('3. Configurando menu hamburguer...');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
        console.log('✅ Botão menu configurado');
    } else {
        console.error('❌ Botão menu não encontrado');
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
        console.log('✅ Overlay menu configurado');
    }

    // 4. Fechar menu ao clicar em links
    console.log('4. Configurando links do menu...');
    const menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    console.log(`✅ Links do menu configurados: ${menuLinks.length}`);

    // 5. Botão WhatsApp
    console.log('5. Configurando WhatsApp...');
    const whatsappBtn = document.getElementById('whatsappFixedBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            window.open('https://wa.me/5522992054592?text=Olá! Gostaria de mais informações sobre os imóveis.', '_blank');
        });
        console.log('✅ WhatsApp configurado');
    }

    // 6. Inicializar carrossel
    console.log('6. Inicializando carrossel...');
    initCarousel();
    
    // 7. Eventos para carrossel
    document.getElementById('carouselPrev')?.addEventListener('click', prevSlide);
    document.getElementById('carouselNext')?.addEventListener('click', nextSlide);
    
    // 8. Pausar autoplay ao interagir com o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', pauseCarouselAutoPlay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoPlay);
    }

    // 9. Eventos da galeria modal
    document.getElementById('galleryModalNext')?.addEventListener('click', galleryModalNext);
    document.getElementById('galleryModalPrev')?.addEventListener('click', galleryModalPrev);

    // 10. INICIALIZAR E RENDERIZAR IMÓVEIS
    setTimeout(() => {
        console.log('10. Renderizando propriedades...');
        renderAllProperties();
        if (typeof initFilter === 'function') {
            initFilter();
        }
    }, 1000);

    // 11. Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                closeMenu(); // Fecha menu mobile ao clicar em link
            }
        });
    });

    // 12. Formatação do campo de preço
    document.getElementById('max-price')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = parseInt(value).toLocaleString('pt-BR');
            e.target.value = value;
        }
    });

    // 13. Formatação do campo de valor máximo na seção "Encontre seu imóvel"
    document.getElementById('maxValue')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = parseInt(value).toLocaleString('pt-BR');
            e.target.value = value;
        }
    });

    // 14. Form de busca de imóvel
    document.getElementById('propertySearchForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('fullName').value;
        
        alert('Obrigado, ' + name + '! Entraremos em contato quando encontrarmos imóveis do seu interesse.');
        this.reset();
    });

    // 15. Atualizar botões "Ver mais" após carregamento completo
    setTimeout(() => {
        updateLoadMoreButtons();
        console.log('✅ Botões "Ver mais" atualizados');
    }, 2000);

    console.log('=== ✅ CONFIGURAÇÃO COMPLETA ===');
});

// Exportar funções para uso global
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.changeImage = changeImage;
window.showImage = showImage;
window.changeMainImage = changeMainImage;
window.prevImage = prevImage;
window.nextImage = nextImage;
window.openGalleryModal = openGalleryModal;
window.loadMoreFeatured = loadMoreFeatured;
window.loadMoreAllProperties = loadMoreAllProperties;
window.updateLoadMoreButtons = updateLoadMoreButtons;
window.resetLGPD = resetLGPD;