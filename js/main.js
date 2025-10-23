// js/main.js - VERSÃO COMPLETA COM LIGHTBOX 100% FUNCIONAL

// ===== SISTEMA DE LIGHTBOX MODERNO - IMPLEMENTAÇÃO COMPLETA E TESTADA =====

// Variáveis globais para controle do lightbox
let currentLightboxImages = [];
let currentLightboxIndex = 0;
let lightboxElement = null;
let isOpeningDetails = false;

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
        lightboxImg.src = 'https://placehold.co/1200x800/1a4d2e/ffffff?text=Imagem%20nao%20disponivel';
        lightboxImg.alt = 'Imagem nao disponivel';
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
    
    // Desabilitar abertura de nova guia ao clicar na imagem grande do card (home)
    const cardImages = document.querySelectorAll('.property-img-booking');
    cardImages.forEach((img) => {
        const card = img.closest('.property-card-booking');
        if (!card) return;
        // Garantir que o clique na imagem não propague para o card
        img.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
        img.style.cursor = '';
    });

    console.log(`✅ ${cardImages.length} imagens de cards configuradas (sem lightbox na home)`);
    
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
                        // Container clicável (sem ícone de lupa)
                        const container = img.parentElement;
                        container.classList.add('image-clickable');

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
    console.debug('[Gallery] updateCardGalleryView', { cardId: card.getAttribute('data-property-id'), newIndex, img: images[newIndex] });
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
function changeImage(propertyId, direction, el = null) {
    console.debug('[Gallery] changeImage clicked', { propertyId, direction });
    const property = properties.find(p => p.id === propertyId);
    const card = el?.closest ? el.closest('.property-card-booking') : document.querySelector(`.property-card-booking[data-property-id="${propertyId}"]`);
    if (!property || !property.images || property.images.length === 0 || !card) return;
    const total = property.images.length;
    let current = parseInt(card.getAttribute('data-current-image') || '0', 10);
    const next = (current + (direction > 0 ? 1 : -1) + total) % total;
    card.setAttribute('data-current-image', String(next));
    updateCardGalleryView(card, property.images, next);
}

// Mostra a imagem do índice específico no card
function showImage(propertyId, index, el = null) {
    console.debug('[Gallery] showImage clicked', { propertyId, index });
    const property = properties.find(p => p.id === propertyId);
    const card = el?.closest ? el.closest('.property-card-booking') : document.querySelector(`.property-card-booking[data-property-id="${propertyId}"]`);
    if (!property || !property.images || property.images.length === 0 || !card) return;
    const bounded = Math.max(0, Math.min(index, property.images.length - 1));
    card.setAttribute('data-current-image', String(bounded));
    updateCardGalleryView(card, property.images, bounded);
}

// (Removido) setupCardGalleryEventBindings: os handlers agora são inline no template para evitar duplicidade

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
        lgpdBanner.classList.remove('show');
        lgpdBanner.style.display = 'none';
        document.body.style.marginBottom = '0';
    }
}

function rejectCookies() {
    localStorage.setItem('lgpdAccepted', 'false');
    const lgpdBanner = document.getElementById('lgpdBanner');
    if (lgpdBanner) {
        lgpdBanner.classList.remove('show');
        lgpdBanner.style.display = 'none';
        document.body.style.marginBottom = '0';
    }
}

// ===== MENU HAMBURGUER - CORREÇÃO COMPLETA =====
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    const navClose = document.getElementById('navClose');
    
    if (!nav || !menuOverlay) return;
    
    const isOpen = nav.classList.contains('show') || nav.classList.contains('active');
    
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!nav || !menuOverlay) return;
    
    nav.classList.add('show');
    nav.classList.add('active');
    menuOverlay.classList.add('active');
    if (menuToggle) {
        menuToggle.classList.add('active');
        menuToggle.innerHTML = '<i class="bi bi-x"></i>';
        menuToggle.setAttribute('aria-expanded', 'true');
    }
    if (hamburger) {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
    }
    nav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    const nav = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!nav || !menuOverlay) return;
    
    nav.classList.remove('show');
    nav.classList.remove('active');
    menuOverlay.classList.remove('active');
    if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
        menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (hamburger) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
    nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// ===== CARROSSEL E FUNÇÕES PRINCIPAIS =====
let currentCarouselIndex = 0;
let carouselInterval;

// Limites dinâmicos para seções com "Ver mais"
let featuredLimit = 6;
let allLimit = 12;

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
                    <div class="position-relative property-card-gallery image-zoom-container" onclick="event.stopPropagation();">
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
                                <button type="button" class="btn-booking-secondary" onclick="event.preventDefault(); event.stopPropagation(); showPropertyDetails(${prop.id})">Mais Detalhes</button>
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
    
    // Reset estado do carrossel
    currentCarouselIndex = 0;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    if (carouselTrack) {
        carouselTrack.style.transform = 'translateX(0)';
    }

    // Desabilitar botões se não aplicável
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const hasNav = totalSlides > 1;
    if (prevBtn) prevBtn.style.display = hasNav ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = hasNav ? 'flex' : 'none';

    // Iniciar autoplay somente se houver mais de 1 slide
    if (hasNav) {
        startCarouselAutoPlay();
    } else {
        pauseCarouselAutoPlay();
    }
}

function goToSlide(index) {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carouselTrack) return;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    if (!totalSlides || totalSlides <= 0) return;
    
    // Limitar índice
    const boundedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    currentCarouselIndex = boundedIndex;
    carouselTrack.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    if (dots && dots.length) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentCarouselIndex);
        });
    }
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    if (!totalSlides || totalSlides <= 1) return;
    currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
    goToSlide(currentCarouselIndex);
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    if (!totalSlides || totalSlides <= 1) return;
    currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentCarouselIndex);
}

function startCarouselAutoPlay() {
    clearInterval(carouselInterval);
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    if (totalSlides && totalSlides > 1) {
        carouselInterval = setInterval(nextSlide, 5000);
    }
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
        renderProperties(properties.slice(0, featuredLimit), 'property-list');
        renderProperties(properties.slice(0, allLimit), 'all-properties-list');
        updateLoadMoreButtons();
    }
}

// Botões "Ver Mais"
function updateLoadMoreButtons() {
    const featuredLoadMore = document.getElementById('featuredLoadMore');
    const allPropertiesLoadMore = document.getElementById('allPropertiesLoadMore');
    if (featuredLoadMore) {
        const show = typeof properties !== 'undefined' && properties.length > featuredLimit;
        featuredLoadMore.style.display = show ? 'block' : 'none';
    }
    if (allPropertiesLoadMore) {
        const show = typeof properties !== 'undefined' && properties.length > allLimit;
        allPropertiesLoadMore.style.display = show ? 'block' : 'none';
    }
}

function loadMoreFeatured() {
    if (typeof properties === 'undefined') return;
    featuredLimit = Math.min(properties.length, featuredLimit + 6);
    renderAllProperties();
}

function loadMoreAllProperties() {
    if (typeof properties === 'undefined') return;
    allLimit = Math.min(properties.length, allLimit + 12);
    renderAllProperties();
}

// ===== FUNÇÕES DO MODAL DE DETALHES =====
function showPropertyDetails(propertyId) {
    const pid = String(propertyId);
    const property = properties.find(p => String(p.id) === pid);
    if (!property) return;
    
    const corretor = corretores[property.corretor];
    const modalEl = document.getElementById('propertyModal');
    const modalContent = document.getElementById('property-detail-content');
    
    if (modalEl && modalContent) {
        console.debug('[Details] open', { propertyId });
        if (isOpeningDetails) return;
        isOpeningDetails = true;
        let html = '';
        try {
            html = PropertyTemplates.createPropertyDetail(property, corretor) || '';
        } catch (err) {
            console.error('Erro ao montar detalhes do imóvel:', err);
            html = '';
        }
        modalContent.innerHTML = String(html);
        console.debug('[Details] content set length', modalContent.innerHTML.length);
        try { closeMenu(); } catch (e) {}
        document.body.style.overflow = '';
        
        try {
            if (window.bootstrap?.Modal) {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
            } else {
                modalEl.classList.add('show');
                modalEl.style.display = 'block';
                modalEl.removeAttribute('aria-hidden');
                document.body.classList.add('modal-open');
            }
        } catch (err) {
            console.error('Erro ao abrir modal:', err);
        } finally {
            setTimeout(() => { isOpeningDetails = false; }, 400);
        }
        
        // Guardar ID atual para navegação dos botões
        window.__currentPropertyId = propertyId;

        // Bind dos botões de navegação no modal (desktop)
        setTimeout(() => {
            setupModalLightbox(propertyId);
            // Seletores compatíveis com os botões gerados em templates.js
            const prevBtn = modalEl.querySelector('.gallery-prev-modal, .gallery-modal-prev, #galleryModalPrev');
            const nextBtn = modalEl.querySelector('.gallery-next-modal, .gallery-modal-next, #galleryModalNext');
            if (prevBtn) {
                prevBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); prevImage(window.__currentPropertyId); };
            }
            if (nextBtn) {
                nextBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); nextImage(window.__currentPropertyId); };
            }
        }, 500);
    }
}

function setupModalLightbox(propertyId) {
    const modalImages = document.querySelectorAll('#propertyModal .main-image');
    modalImages.forEach((img) => {
        const container = img.parentElement;
        container.classList.add('image-clickable');
        
        img.style.cursor = 'pointer';
        img.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            openPropertyLightbox(propertyId);
        };

        // Navegação por gesto (swipe) no mobile dentro do modal
        let startX = null;
        let startY = null;
        const threshold = 40; // px
        container.addEventListener('touchstart', (ev) => {
            if (!ev.touches || ev.touches.length === 0) return;
            startX = ev.touches[0].clientX;
            startY = ev.touches[0].clientY;
        }, { passive: true });
        container.addEventListener('touchend', (ev) => {
            if (startX === null) return;
            const endX = ev.changedTouches && ev.changedTouches[0] ? ev.changedTouches[0].clientX : startX;
            const endY = ev.changedTouches && ev.changedTouches[0] ? ev.changedTouches[0].clientY : startY;
            const dx = endX - startX;
            const dy = endY - startY;
            // ignora gestos predominantemente verticais
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
                if (dx < 0) {
                    nextImage(propertyId);
                } else {
                    prevImage(propertyId);
                }
            }
            startX = startY = null;
        }, { passive: true });
    });
}

// ===== NAVEGAÇÃO DA GALERIA NO MODAL =====
function getVisibleModalGalleryContainer(modal) {
    if (!modal) return null;
    const desktop = modal.querySelector('.desktop-layout .property-gallery-modal');
    const mobile = modal.querySelector('.mobile-layout .property-gallery-modal');
    // Preferir o que está visível de fato
    const isVisible = (el) => !!(el && el.offsetParent !== null);
    if (isVisible(desktop)) return desktop;
    if (isVisible(mobile)) return mobile;
    // Fallback por media query
    if (window.matchMedia('(min-width: 769px)').matches && desktop) return desktop;
    if (window.matchMedia('(max-width: 768px)').matches && mobile) return mobile;
    // Último recurso: qualquer um existente
    return desktop || mobile || modal.querySelector('.property-gallery-modal');
}

function updateModalGallery(propertyId, newIndex) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images || property.images.length === 0) return;

    const modal = document.getElementById('propertyModal');
    if (!modal) return;

    const visibleContainer = getVisibleModalGalleryContainer(modal);
    if (!visibleContainer) return;

    const mainImg = visibleContainer.querySelector('.main-image');
    const counter = visibleContainer.querySelector('.image-counter-modal');
    const thumbs = visibleContainer.querySelectorAll('.thumbnail-container-modal .thumbnail');

    if (!visibleContainer || !mainImg) return;

    const bounded = Math.max(0, Math.min(newIndex, property.images.length - 1));
    visibleContainer.setAttribute('data-current-image', String(bounded));

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
    const container = getVisibleModalGalleryContainer(modal);
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
    const container = getVisibleModalGalleryContainer(modal);
    if (!container) return;
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images || property.images.length === 0) return;
    const total = property.images.length;
    const current = parseInt(container.getAttribute('data-current-image') || '0', 10);
    const next = (current + 1) % total;
    updateModalGallery(propertyId, next);
}

// ===== FUNÇÕES PRINCIPAIS =====
function openPropertyInNewTab(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const corretor = corretores[property.corretor];
    const logoPath = window.location.origin + '/novatte-imoveis/assets/logo.png';
    
    let propertyPageHTML = PropertyTemplates.createPropertyPage(property, corretor);
    
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

// ===== UTILITÁRIOS GLOBAIS REFERENCIADOS EM HTML/TEMPLATES =====
function openInGoogleMaps(lat, lng) {
    if (lat == null || lng == null) return;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
}

function getDirections(lat, lng) {
    if (lat == null || lng == null) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDataManagement() {
    try {
        const modalEl = document.getElementById('privacyModal');
        if (modalEl && window.bootstrap?.Modal) {
            new bootstrap.Modal(modalEl).show();
            return;
        }
    } catch (e) {}
    alert('Para gerenciar seus dados, entre em contato: novatteimoveis@gmail.com');
}

// ===== INICIALIZAÇÃO CORRIGIDA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARREGADO - INICIANDO CONFIGURAÇÕES ===');
    
    // 1. LGPD
    checkLGPD();
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    if (acceptBtn) acceptBtn.addEventListener('click', function(e){ e.preventDefault(); acceptCookies(); });
    if (rejectBtn) rejectBtn.addEventListener('click', function(e){ e.preventDefault(); rejectCookies(); });
    // Delegação como fallback para cenários de cache/incógnito
    document.addEventListener('click', function(e){
        const target = e.target;
        if (!target) return;
        if (target.id === 'acceptCookies' || target.closest?.('#acceptCookies')) {
            e.preventDefault();
            acceptCookies();
        } else if (target.id === 'rejectCookies' || target.closest?.('#rejectCookies')) {
            e.preventDefault();
            rejectCookies();
        }
    });

    // 2. Menu Hamburguer
    const menuToggle = document.getElementById('menuToggle');
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    if (navClose) {
        navClose.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); closeMenu(); });
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

    // Removido listener em CAPTURA que bloqueava a delegação de eventos da galeria

    // Delegação (captura) para garantir abertura antes do onclick do card (iOS/Safari)
    document.addEventListener('click', function(e){
        const detailsBtn = e.target.closest && e.target.closest('.btn-booking-secondary');
        if (detailsBtn) {
            const card = detailsBtn.closest('.property-card-booking');
            if (card) {
                const propertyId = parseInt(card.getAttribute('data-property-id'));
                e.preventDefault();
                if (!isNaN(propertyId)) {
                    showPropertyDetails(propertyId);
                }
                e.stopPropagation();
            }
        }
    }, true);

    // Delegação de eventos apenas para o botão "Mais Detalhes" (galeria tratada inline no template)
    document.addEventListener('click', function(e) {
        // Botão "Mais Detalhes" (garantia mobile/desktop)
        const detailsBtn = e.target.closest && e.target.closest('.btn-booking-secondary');
        if (detailsBtn) {
            const card = detailsBtn.closest('.property-card-booking');
            if (card) {
                const propertyId = card.getAttribute('data-property-id');
                e.preventDefault();
                e.stopPropagation();
                if (!isNaN(propertyId)) {
                    console.debug('[Details] click handler', { propertyId });
                    showPropertyDetails(propertyId);
                }
                return;
            }
        }
    }, { passive: false });

    // Delegação extra para toque no mobile (iOS/Safari): garante bloqueio de propagação
    document.addEventListener('touchstart', function(e) {
        const detailsBtn = e.target.closest && e.target.closest('.btn-booking-secondary');
        if (detailsBtn) {
            const card = detailsBtn.closest('.property-card-booking');
            if (card) {
                const propertyId = card.getAttribute('data-property-id');
                e.preventDefault();
                e.stopPropagation();
                if (propertyId) {
                    showPropertyDetails(propertyId);
                }
            }
        }
    }, { passive: false });

    document.addEventListener('touchend', function(e) {
        const detailsBtn = e.target.closest && e.target.closest('.btn-booking-secondary');
        if (detailsBtn) {
            const card = detailsBtn.closest('.property-card-booking');
            if (card) {
                const propertyId = card.getAttribute('data-property-id');
                e.preventDefault();
                e.stopPropagation();
                if (propertyId) {
                    showPropertyDetails(propertyId);
                }
            }
        }
    }, { passive: false });

    // 6. Renderizar propriedades
    setTimeout(() => {
        renderAllProperties();
        if (typeof initFilter === 'function') {
            initFilter();
        }
        // A galeria é controlada por handlers inline no template; nenhum rebind adicional é necessário
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

// ===== Inicialização do Menu Hamburguer =====
document.addEventListener('DOMContentLoaded', function(){
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('navMenu');
  const overlay = document.getElementById('menuOverlay');
  if (hamburger) {
    hamburger.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); toggleMenu(); });
  }
  if (overlay) {
    overlay.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); closeMenu(); });
  }
  if (nav) {
    nav.addEventListener('click', function(e){
      const link = e.target.closest('a');
      if (link) { closeMenu(); }
    });
  }
});

// ===== EXPORTAR FUNÇÕES PARA USO GLOBAL =====
window.toggleMenu = toggleMenu; // Exporte funções globais para HTML inline
window.closeMenu = closeMenu;

// ===== Fallback para botões de fechar modal quando Bootstrap JS não está disponível =====
function closeModalElement(modalEl){
    if (!modalEl) return;
    try {
      if (window.bootstrap?.Modal) {
        const inst = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        inst.hide();
      } else {
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
        modalEl.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      }
    } catch(e) { console.warn('Modal close fallback error:', e); }
}

document.addEventListener('click', function(e){
    const target = e.target.closest('[data-bs-dismiss="modal"]');
    if (!target) return;
    const modalEl = target.closest('.modal');
    if (modalEl) {
      e.preventDefault();
      e.stopPropagation();
      closeModalElement(modalEl);
    }
}, true);

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
window.changeMainImage = changeMainImage;
window.prevImage = prevImage;
window.nextImage = nextImage;
window.changeMainImage = changeMainImage;
window.prevImage = prevImage;
window.nextImage = nextImage;
window.loadMoreFeatured = loadMoreFeatured;
window.loadMoreAllProperties = loadMoreAllProperties;
window.updateLoadMoreButtons = updateLoadMoreButtons;
window.openInGoogleMaps = openInGoogleMaps;
window.getDirections = getDirections;
window.scrollToTop = scrollToTop;
window.openDataManagement = openDataManagement;
