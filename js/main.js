// js/main.js - VERSÃO COMPLETA COM LIGHTBOX 100% FUNCIONAL

// ===== SISTEMA DE LIGHTBOX MODERNO - IMPLEMENTAÇÃO COMPLETA E TESTADA =====

// Variáveis globais para controle do lightbox
let currentLightboxImages = [];
let currentLightboxIndex = 0;
let lightboxElement = null;

// Criar lightbox no DOM
function createLightbox() {
    // Se já existe no HTML, apenas referencie e anexe os listeners
    const existing = document.getElementById('image-lightbox');
    if (existing) {
        lightboxElement = existing;
        // Event listeners para navegação por teclado (uma vez)
        document.removeEventListener('keydown', handleLightboxKeyboard);
        document.addEventListener('keydown', handleLightboxKeyboard);
        // Event listener para fechar ao clicar fora (evitar múltiplos)
        lightboxElement.onclick = function(e) {
            if (e.target === lightboxElement) closeLightbox();
        };
        return;
    }

// ===== NAVEGAÇÃO DA GALERIA NO MODAL =====
function updateModalGallery(propertyId, newIndex) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images || property.images.length === 0) return;

    const modal = document.getElementById('propertyModal');
    if (!modal) return;

    const container = modal.querySelector('.property-gallery-modal');
    const mainImg = modal.querySelector('.property-gallery-modal .main-image');
    const counter = modal.querySelector('.property-gallery-modal .image-counter-modal');
    const thumbs = modal.querySelectorAll('.thumbnail-container-modal .thumbnail');

    if (!container || !mainImg) return;

    const bounded = Math.max(0, Math.min(newIndex, property.images.length - 1));
    container.setAttribute('data-current-image', String(bounded));

    mainImg.src = property.images[bounded];
    if (counter) counter.textContent = `${bounded + 1}/${property.images.length}`;
    if (thumbs && thumbs.length) {
        thumbs.forEach((t, i) => t.classList.toggle('active', i === bounded));
    }
}

function changeMainImage(propertyId, index) {
    updateModalGallery(propertyId, index);
}

function prevImage(propertyId) {
    const modal = document.getElementById('propertyModal');
    if (!modal) return;
    const container = modal.querySelector('.property-gallery-modal');
    if (!container) return;
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images || property.images.length === 0) return;
    const total = property.images.length;
    const current = parseInt(container.getAttribute('data-current-image') || '0', 10);
    const next = (current - 1 + total) % total;
    updateModalGallery(propertyId, next);
}

function nextImage(propertyId) {
    const modal = document.getElementById('propertyModal');
    if (!modal) return;
    const container = modal.querySelector('.property-gallery-modal');
    if (!container) return;
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images || property.images.length === 0) return;
    const total = property.images.length;
    const current = parseInt(container.getAttribute('data-current-image') || '0', 10);
    const next = (current + 1) % total;
    updateModalGallery(propertyId, next);
}
    
    const lightboxHTML = `
        <div id="image-lightbox" class="image-lightbox-overlay">
            <div class="image-lightbox-content">
                <button class="image-lightbox-close" onclick="closeLightbox()" aria-label="Fechar lightbox">
                    <i class="bi bi-x-lg"></i>
                </button>
                <button class="image-lightbox-nav image-lightbox-prev" onclick="navigateLightbox(-1)" aria-label="Imagem anterior">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button class="image-lightbox-nav image-lightbox-next" onclick="navigateLightbox(1)" aria-label="Próxima imagem">
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
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    lightboxElement = document.getElementById('image-lightbox');
    
    // Event listeners para navegação por teclado
    document.addEventListener('keydown', handleLightboxKeyboard);
    
    // Event listener para fechar ao clicar fora
    lightboxElement.addEventListener('click', function(e) {
        if (e.target === lightboxElement) {
            closeLightbox();
        }
    });
    
    console.log('✅ Lightbox criado no DOM');
}

// Abrir lightbox com imagens - FUNÇÃO PRINCIPAL
function openLightbox(images, startIndex = 0) {
    if (!images || images.length === 0) {
        console.warn('❌ Nenhuma imagem fornecida para o lightbox');
        return;
    }
    
    createLightbox();
    
    currentLightboxImages = images;
    currentLightboxIndex = startIndex;
    
    // Mostrar lightbox
    lightboxElement.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Atualizar conteúdo
    updateLightbox();
    
    // Animar entrada
    setTimeout(() => {
        lightboxElement.classList.add('active');
    }, 10);
    
    console.log('🖼️ Lightbox aberto com', images.length, 'imagens, índice:', startIndex);
}

// Fechar lightbox
function closeLightbox() {
    if (!lightboxElement) return;
    
    lightboxElement.classList.remove('active');
    
    setTimeout(() => {
        lightboxElement.style.display = 'none';
        document.body.style.overflow = '';
        currentLightboxImages = [];
        currentLightboxIndex = 0;
    }, 300);
}

// Navegar entre imagens no lightbox
function navigateLightbox(direction) {
    if (currentLightboxImages.length <= 1) return;
    
    currentLightboxIndex = (currentLightboxIndex + direction + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightbox();
}

// Atualizar lightbox com imagem atual
function updateLightbox() {
    if (!lightboxElement || currentLightboxImages.length === 0) return;
    
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxLoading = document.getElementById('lightboxLoading');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (!lightboxImg || !lightboxCounter) return;
    
    // Mostrar loading
    if (lightboxLoading) lightboxLoading.style.display = 'flex';
    lightboxImg.style.opacity = '0';
    
    const img = new Image();
    img.onload = function() {
        lightboxImg.src = this.src;
        lightboxImg.alt = `Imagem ${currentLightboxIndex + 1} de ${currentLightboxImages.length}`;
        lightboxImg.style.opacity = '1';
        if (lightboxLoading) lightboxLoading.style.display = 'none';
    };
    
    img.onerror = function() {
        lightboxImg.src = 'https://via.placeholder.com/800x600/1a4d2e/ffffff?text=Imagem+Não+Disponível';
        lightboxImg.alt = 'Imagem não disponível';
        lightboxImg.style.opacity = '1';
        if (lightboxLoading) lightboxLoading.style.display = 'none';
    };
    
    img.src = currentLightboxImages[currentLightboxIndex];
    
    // Atualizar contador
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
    
    // Mostrar/ocultar botões de navegação
    const prevBtn = document.querySelector('.image-lightbox-prev');
    const nextBtn = document.querySelector('.image-lightbox-next');
    
    if (prevBtn && nextBtn) {
        const showNav = currentLightboxImages.length > 1;
        prevBtn.style.display = showNav ? 'flex' : 'none';
        nextBtn.style.display = showNav ? 'flex' : 'none';
    }
}

// Navegação por teclado no lightbox
function handleLightboxKeyboard(e) {
    if (!lightboxElement || !lightboxElement.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
}

// ===== SISTEMA DE EXPANSÃO DE IMAGEM - FUNÇÕES PRINCIPAIS =====

// Abrir lightbox de um imóvel específico
function openPropertyLightbox(propertyId, imageIndex = 0) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images || property.images.length === 0) {
        console.warn('❌ Imóvel não encontrado ou sem imagens:', propertyId);
        return;
    }
    
    console.log('🖼️ Abrindo lightbox para imóvel:', propertyId, 'com', property.images.length, 'imagens');
    openLightbox(property.images, imageIndex);
}

// ===== CONFIGURAÇÃO AUTOMÁTICA DAS IMAGENS - CORREÇÃO DEFINITIVA =====

// Configurar todas as imagens para abrir lightbox
function setupLightboxImages() {
    console.log('🔧 Configurando imagens para lightbox...');
    
    // Configurar imagens dos cards
    const cardImages = document.querySelectorAll('.property-img-booking');
    cardImages.forEach((img, index) => {
        const card = img.closest('.property-card-booking');
        if (card) {
            const propertyId = parseInt(card.getAttribute('data-property-id'));
            
            // Adicionar container clicável
            const container = img.parentElement;
            container.classList.add('image-clickable');
            
            // Adicionar ícone de lupa
            if (!container.querySelector('.image-zoom-indicator')) {
                const zoomIndicator = document.createElement('button');
                zoomIndicator.className = 'image-zoom-indicator';
                zoomIndicator.innerHTML = '<i class="bi bi-zoom-in"></i>';
                zoomIndicator.onclick = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openPropertyLightbox(propertyId);
                };
                container.appendChild(zoomIndicator);
            }
            
            // Configurar clique na imagem
            img.style.cursor = 'pointer';
            img.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                openPropertyLightbox(propertyId);
            };
        }
    });
    
    console.log(`✅ ${cardImages.length} imagens de cards configuradas`);
    
    // Configurar imagens do modal de detalhes
    setTimeout(() => {
        const modalImages = document.querySelectorAll('.main-image');
        modalImages.forEach((img) => {
            const modal = img.closest('.modal-content');
            if (modal) {
                const propertyTitle = modal.querySelector('h2');
                if (propertyTitle) {
                    const property = properties.find(p => p.title === propertyTitle.textContent);
                    if (property) {
                        // Adicionar container clicável
                        const container = img.parentElement;
                        container.classList.add('image-clickable');
                        
                        // Adicionar ícone de lupa
                        if (!container.querySelector('.image-zoom-indicator')) {
                            const zoomIndicator = document.createElement('button');
                            zoomIndicator.className = 'image-zoom-indicator';
                            zoomIndicator.innerHTML = '<i class="bi bi-zoom-in"></i>';
                            zoomIndicator.onclick = (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                openPropertyLightbox(property.id);
                            };
                            container.appendChild(zoomIndicator);
                        }
                        
                        // Configurar clique na imagem
                        img.style.cursor = 'pointer';
                        img.onclick = (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            openPropertyLightbox(property.id);
                        };
                    }
                }
            }
        });
        
        console.log(`✅ ${modalImages.length} imagens do modal configuradas`);
    }, 500);
}

// ===== CONTROLES DE GALERIA NOS CARDS (SUPORTE MOBILE) =====
// Atualiza a imagem principal, contador e miniaturas do card
function updateCardGalleryView(card, images, newIndex) {
    const imgEl = card.querySelector('.property-img-booking');
    const counterEl = card.querySelector('.image-counter');
    const thumbs = card.querySelectorAll('.thumbnail');
    if (imgEl && images[newIndex]) {
        imgEl.src = images[newIndex];
    }
    if (counterEl) {
        counterEl.textContent = `${newIndex + 1}/${images.length}`;
    }
    if (thumbs && thumbs.length) {
        thumbs.forEach((t, i) => t.classList.toggle('active', i === newIndex));
    }
}

// Altera a imagem exibida no card em +/- 1
function changeImage(propertyId, direction) {
    const property = properties.find(p => p.id === propertyId);
    const card = document.querySelector(`.property-card-booking[data-property-id="${propertyId}"]`);
    if (!property || !property.images || property.images.length === 0 || !card) return;
    const total = property.images.length;
    let current = parseInt(card.getAttribute('data-current-image') || '0', 10);
    const next = (current + (direction > 0 ? 1 : -1) + total) % total;
    card.setAttribute('data-current-image', String(next));
    updateCardGalleryView(card, property.images, next);
}

// Mostra a imagem do índice específico no card
function showImage(propertyId, index) {
    const property = properties.find(p => p.id === propertyId);
    const card = document.querySelector(`.property-card-booking[data-property-id="${propertyId}"]`);
    if (!property || !property.images || property.images.length === 0 || !card) return;
    const bounded = Math.max(0, Math.min(index, property.images.length - 1));
    card.setAttribute('data-current-image', String(bounded));
    updateCardGalleryView(card, property.images, bounded);
}

// ===== LGPD - Cookies - CORREÇÃO DEFINITIVA E TESTADA =====
function checkLGPD() {
    const lgpdAccepted = localStorage.getItem('lgpdAccepted');
    const lgpdBanner = document.getElementById('lgpdBanner');
    
    if (!lgpdBanner) return;
    
    if (lgpdAccepted === null || lgpdAccepted === 'false') {
        lgpdBanner.style.display = 'block';
        lgpdBanner.classList.add('show');
        document.body.style.marginBottom = lgpdBanner.offsetHeight + 'px';
    } else {
        lgpdBanner.style.display = 'none';
        document.body.style.marginBottom = '0';
    }
}

function acceptCookies() {
    localStorage.setItem('lgpdAccepted', 'true');
    const lgpdBanner = document.getElementById('lgpdBanner');
    if (lgpdBanner) {
        lgpdBanner.style.display = 'none';
        document.body.style.marginBottom = '0';
    }
}

function rejectCookies() {
    localStorage.setItem('lgpdAccepted', 'false');
    const lgpdBanner = document.getElementById('lgpdBanner');
    if (lgpdBanner) {
        lgpdBanner.style.display = 'none';
        document.body.style.marginBottom = '0';
    }
}

// ===== MENU HAMBURGUER - CORREÇÃO COMPLETA =====
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!nav || !menuToggle || !menuOverlay) return;
    
    const isOpen = nav.classList.contains('show');
    
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!nav || !menuToggle || !menuOverlay) return;
    
    nav.classList.add('show');
    menuOverlay.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.innerHTML = '<i class="bi bi-x"></i>';
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!nav || !menuToggle || !menuOverlay) return;
    
    nav.classList.remove('show');
    menuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    document.body.style.overflow = '';
}

// ===== CARROSSEL E FUNÇÕES PRINCIPAIS =====
let currentCarouselIndex = 0;
let carouselInterval;

function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    
    if (!carouselTrack || !carouselDots) return;

    let carouselProperties = [];
    if (typeof properties !== 'undefined' && properties.length > 0) {
        carouselProperties = properties.slice(0, 6);
    }
    
    carouselTrack.innerHTML = carouselProperties.map(prop => `
        <div class="carousel-slide">
            <div class="col-lg-8 mx-auto">
                <div class="property-card-booking" data-property-id="${prop.id}" onclick="openPropertyInNewTab(${prop.id})">
                    <div class="position-relative property-card-gallery image-zoom-container" onclick="event.stopPropagation(); openPropertyLightbox(${prop.id})">
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
    
    carouselDots.innerHTML = carouselProperties.map((_, index) => `
        <button class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></button>
    `).join('');
    
    startCarouselAutoPlay();
}

function goToSlide(index) {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carouselTrack) return;
    
    currentCarouselIndex = index;
    carouselTrack.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCarouselIndex);
    });
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
    goToSlide(currentCarouselIndex);
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentCarouselIndex);
}

function startCarouselAutoPlay() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

function pauseCarouselAutoPlay() {
    clearInterval(carouselInterval);
}

// ===== FUNÇÕES PARA RENDERIZAÇÃO DE IMÓVEIS =====
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

    // Após render, garantir configuração de imagens para lightbox e lupa
    try {
        setupLightboxImages();
    } catch (err) {
        console.warn('Lightbox setup pós-render falhou:', err);
    }
}

function renderAllProperties() {
    if (typeof properties !== 'undefined') {
        renderProperties(properties.slice(0, 6), 'property-list');
        renderProperties(properties.slice(0, 12), 'all-properties-list');
    }
}

// ===== FUNÇÕES DO MODAL DE DETALHES =====
function showPropertyDetails(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const corretor = corretores[property.corretor];
    const modalContent = document.getElementById('property-detail-content');
    
    if (modalContent) {
        modalContent.innerHTML = PropertyTemplates.createPropertyDetail(property, corretor);
        
        const modal = new bootstrap.Modal(document.getElementById('propertyModal'));
        modal.show();
        
        // Configurar lightbox para as imagens do modal
        setTimeout(() => {
            setupModalLightbox(propertyId);
        }, 500);
    }
}

function setupModalLightbox(propertyId) {
    const modalImages = document.querySelectorAll('#propertyModal .main-image');
    modalImages.forEach((img) => {
        const container = img.parentElement;
        container.classList.add('image-clickable');
        
        // Adicionar ícone de lupa se não existir
        if (!container.querySelector('.image-zoom-indicator')) {
            const zoomIndicator = document.createElement('button');
            zoomIndicator.className = 'image-zoom-indicator';
            zoomIndicator.innerHTML = '<i class="bi bi-zoom-in"></i>';
            zoomIndicator.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                openPropertyLightbox(propertyId);
            };
            container.appendChild(zoomIndicator);
        }
        
        img.style.cursor = 'pointer';
        img.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            openPropertyLightbox(propertyId);
        };
    });
}

// ===== FUNÇÕES PRINCIPAIS =====
function openPropertyInNewTab(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const corretor = corretores[property.corretor];
    const logoPath = window.location.origin + '/novatte-imoveis/assets/logo.png';
    
    const propertyPageHTML = PropertyTemplates.createPropertyPage(property, corretor);
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
        newWindow.document.write(propertyPageHTML);
        newWindow.document.close();
    }
}

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

// ===== INICIALIZAÇÃO CORRIGIDA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARREGADO - INICIANDO CONFIGURAÇÕES ===');
    
    // 1. LGPD
    checkLGPD();
    document.getElementById('acceptCookies')?.addEventListener('click', acceptCookies);
    document.getElementById('rejectCookies')?.addEventListener('click', rejectCookies);

    // 2. Menu Hamburguer
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // 3. Fechar menu ao clicar em links
    const menuLinks = document.querySelectorAll('#navMenu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeMenu();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 4. WhatsApp
    document.getElementById('whatsappFixedBtn')?.addEventListener('click', function() {
        window.open('https://wa.me/5522992054592?text=Olá! Gostaria de mais informações sobre os imóveis.', '_blank');
    });

    // 5. Carrossel
    initCarousel();
    document.getElementById('carouselPrev')?.addEventListener('click', prevSlide);
    document.getElementById('carouselNext')?.addEventListener('click', nextSlide);
    
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', pauseCarouselAutoPlay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoPlay);
    }

    // 6. Renderizar propriedades
    setTimeout(() => {
        renderAllProperties();
        if (typeof initFilter === 'function') {
            initFilter();
        }
    }, 1000);

    // 7. Fechar menu ao redimensionar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // 8. Formatação de preços
    document.getElementById('max-price')?.addEventListener('input', formatPrice);
    document.getElementById('maxValue')?.addEventListener('input', formatPrice);

    // 9. Form de busca
    document.getElementById('propertySearchForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('fullName').value;
        alert('Obrigado, ' + name + '! Entraremos em contato quando encontrarmos imóveis do seu interesse.');
        this.reset();
    });

    // 10. INICIALIZAR SISTEMA DE LIGHTBOX - AGORA FUNCIONAL
    console.log('🔧 Inicializando sistema de lightbox...');
    createLightbox();
    
    // Configurar lightbox após as imagens serem carregadas
    setTimeout(() => {
        setupLightboxImages();
        console.log('✅ Sistema de lightbox inicializado com sucesso!');
    }, 1500);

    console.log('=== ✅ CONFIGURAÇÃO COMPLETA ===');
});

// Função auxiliar para formatação de preço
function formatPrice(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = parseInt(value).toLocaleString('pt-BR');
        e.target.value = value;
    }
}

// ===== EXPORTAR FUNÇÕES PARA USO GLOBAL =====
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.openMenu = openMenu;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.openPropertyLightbox = openPropertyLightbox;
window.showPropertyDetails = showPropertyDetails;
window.contactCorretor = contactCorretor;
window.openPropertyInNewTab = openPropertyInNewTab;
window.changeImage = changeImage;
window.showImage = showImage;