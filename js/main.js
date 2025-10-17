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

// Menu toggle para mobile
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('show');
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

// ===== FUNÇÕES DA GALERIA CORRIGIDAS =====

// Mudar imagem na galeria do card - FUNÇÃO CORRIGIDA
function changeImage(propertyId, direction) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images || property.images.length <= 1) return;
    
    // Encontrar o card correto usando data-id
    const card = document.querySelector(`.property-card-booking[onclick="openPropertyInNewTab(${propertyId})"]`);
    if (!card) return;
    
    const imgElement = card.querySelector('.property-img-booking');
    const counterElement = card.querySelector('.image-counter');
    const thumbnails = card.querySelectorAll('.thumbnail');
    
    let currentIndex = parseInt(counterElement.textContent.split('/')[0]) - 1;
    let newIndex = (currentIndex + direction + property.images.length) % property.images.length;
    
    // Atualizar imagem principal
    imgElement.src = property.images[newIndex];
    
    // Atualizar contador
    counterElement.textContent = `${newIndex + 1}/${property.images.length}`;
    
    // Atualizar thumbnails ativos
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === newIndex);
    });
}

// Mostrar imagem específica - FUNÇÃO CORRIGIDA
function showImage(propertyId, index) {
    const property = properties.find(p => p.id === propertyId);
    if (!property || !property.images) return;
    
    // Encontrar o card correto usando data-id
    const card = document.querySelector(`.property-card-booking[onclick="openPropertyInNewTab(${propertyId})"]`);
    if (!card) return;
    
    const imgElement = card.querySelector('.property-img-booking');
    const counterElement = card.querySelector('.image-counter');
    const thumbnails = card.querySelectorAll('.thumbnail');
    
    // Atualizar imagem principal
    imgElement.src = property.images[index];
    
    // Atualizar contador
    counterElement.textContent = `${index + 1}/${property.images.length}`;
    
    // Atualizar thumbnails ativos
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// ===== FUNÇÕES DO MODAL DE DETALHES =====

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

// Abrir imóvel em nova guia
function openPropertyInNewTab(propertyId) {
    // Criar uma página temporária com os detalhes do imóvel
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const corretor = corretores[property.corretor];
    const newWindow = window.open('', '_blank');
    
    // Usar caminho relativo para a logo
    const propertyPage = PropertyTemplates.createPropertyPage(property, corretor);
    newWindow.document.write(propertyPage);
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