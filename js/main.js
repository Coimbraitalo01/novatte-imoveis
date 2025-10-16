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

// Inicializar carrossel
function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    
    // Verificar se os elementos existem
    if (!carouselTrack || !carouselDots) {
        console.log('Elementos do carrossel não encontrados');
        return;
    }

    // Selecionar os primeiros 6 imóveis para o carrossel (se properties existir)
    let carouselProperties = [];
    if (typeof properties !== 'undefined' && properties.length > 0) {
        carouselProperties = properties.slice(0, 6);
    } else {
        // Fallback - criar dados básicos se properties não existir
        carouselProperties = [
            {
                id: 1,
                title: "Imóvel Exemplo 1",
                type: "Venda",
                price: "R$ 350.000",
                location: "Itaperuna, RJ",
                size: "120m²",
                bedrooms: 3,
                bathrooms: 2,
                parking: 2,
                description: "Excelente imóvel para sua família"
            },
            {
                id: 2,
                title: "Imóvel Exemplo 2", 
                type: "Aluguel",
                price: "R$ 1.200/mês",
                location: "Santo Antônio de Pádua, RJ",
                size: "70m²",
                bedrooms: 2,
                bathrooms: 1,
                parking: 1,
                description: "Apartamento bem localizado"
            }
        ];
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
                                <button class="btn-booking-whatsapp" onclick="event.stopPropagation(); contactCorretor('italo')">
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

// Funções placeholder para evitar erros
function openPropertyInNewTab(propertyId) {
    console.log('Abrir propriedade:', propertyId);
    // Implementação temporária
    alert(`Detalhes do imóvel ${propertyId} - Esta funcionalidade será implementada em breve`);
}

function showPropertyDetails(propertyId) {
    console.log('Mostrar detalhes:', propertyId);
    // Implementação temporária
    alert(`Detalhes do imóvel ${propertyId} - Esta funcionalidade será implementada em breve`);
}

function contactCorretor(corretorId) {
    console.log('Contatar corretor:', corretorId);
    // Implementação temporária
    window.open('https://wa.me/5522992054592?text=Olá! Gostaria de mais informações sobre os imóveis.', '_blank');
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

    // Filtros (implementação básica)
    document.getElementById('applyFiltersBtn')?.addEventListener('click', function() {
        alert('Funcionalidade de filtros será implementada em breve');
    });

    document.getElementById('clearFiltersBtn')?.addEventListener('click', function() {
        alert('Funcionalidade de limpar filtros será implementada em breve');
    });

    document.getElementById('resetFiltersBtn')?.addEventListener('click', function() {
        alert('Funcionalidade de resetar filtros será implementada em breve');
    });

    document.getElementById('loadMoreBtn')?.addEventListener('click', function() {
        alert('Funcionalidade de carregar mais será implementada em breve');
    });
});