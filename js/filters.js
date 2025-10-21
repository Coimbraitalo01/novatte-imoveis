// js/filters.js

// Sistema de Filtros
function initFilter() {
    console.log('🎛️ Inicializando sistema de filtros...');
    
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Aplicar filtros ao carregar a página se houver parâmetros na URL
    setTimeout(() => {
        applyURLFilters();
    }, 500);
}

function applyFilters() {
    console.log('🔍 Aplicando filtros...');
    
    const propertyType = document.getElementById('property-type').value;
    const city = document.getElementById('city').value;
    const transactionType = document.getElementById('transaction-type').value;
    const maxPrice = document.getElementById('max-price').value;
    
    let filteredProperties = properties;
    
    // Aplicar filtros
    if (propertyType !== 'all') {
        filteredProperties = filteredProperties.filter(prop => prop.propertyType === propertyType);
    }
    
    if (city !== 'all') {
        filteredProperties = filteredProperties.filter(prop => prop.city === city);
    }
    
    if (transactionType !== 'all') {
        filteredProperties = filteredProperties.filter(prop => prop.type === transactionType);
    }
    
    if (maxPrice) {
        const maxPriceValue = parseFloat(maxPrice.replace(/\D/g, ''));
        filteredProperties = filteredProperties.filter(prop => {
            const propPrice = parseFloat(prop.price.replace(/\D/g, ''));
            return propPrice <= maxPriceValue;
        });
    }
    
    // Atualizar URL com os filtros
    updateURLFilters(propertyType, city, transactionType, maxPrice);
    
    // Renderizar propriedades filtradas
    renderFilteredProperties(filteredProperties);
}

function clearFilters() {
    console.log('🧹 Limpando filtros...');
    
    document.getElementById('property-type').value = 'all';
    document.getElementById('city').value = 'all';
    document.getElementById('transaction-type').value = 'all';
    document.getElementById('max-price').value = '';
    
    // Limpar URL
    window.history.replaceState({}, document.title, window.location.pathname);
    
    // Renderizar todas as propriedades
    renderAllProperties();
}

function renderFilteredProperties(filteredProperties) {
    const propertyList = document.getElementById('property-list');
    const allPropertiesList = document.getElementById('all-properties-list');
    const noResults = document.getElementById('no-results');
    
    if (filteredProperties.length === 0) {
        if (propertyList) propertyList.innerHTML = '';
        if (allPropertiesList) allPropertiesList.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        
        // Ocultar botões "Ver mais"
        const featuredLoadMore = document.getElementById('featuredLoadMore');
        const allPropertiesLoadMore = document.getElementById('allPropertiesLoadMore');
        if (featuredLoadMore) featuredLoadMore.style.display = 'none';
        if (allPropertiesLoadMore) allPropertiesLoadMore.style.display = 'none';
    } else {
        if (noResults) noResults.style.display = 'none';
        
        // Renderizar propriedades em destaque (primeiros 6)
        if (propertyList) {
            renderProperties(filteredProperties.slice(0, 6), 'property-list');
        }
        
        // Renderizar todas as propriedades
        if (allPropertiesList) {
            renderProperties(filteredProperties.slice(0, 12), 'all-properties-list');
        }
        
        // Atualizar botões "Ver mais"
        updateLoadMoreButtons();
    }
}

function updateURLFilters(propertyType, city, transactionType, maxPrice) {
    const params = new URLSearchParams();
    
    if (propertyType !== 'all') params.set('tipo', propertyType);
    if (city !== 'all') params.set('cidade', city);
    if (transactionType !== 'all') params.set('transacao', transactionType);
    if (maxPrice) params.set('preco_max', maxPrice);
    
    const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, document.title, newURL);
}

function applyURLFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.toString()) {
        const propertyType = urlParams.get('tipo') || 'all';
        const city = urlParams.get('cidade') || 'all';
        const transactionType = urlParams.get('transacao') || 'all';
        const maxPrice = urlParams.get('preco_max') || '';
        
        // Aplicar valores aos filtros
        document.getElementById('property-type').value = propertyType;
        document.getElementById('city').value = city;
        document.getElementById('transaction-type').value = transactionType;
        document.getElementById('max-price').value = maxPrice;
        
        // Aplicar filtros
        applyFilters();
    }
}

// Inicializar filtros quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initFilter, 1000);
});

// Exportar funções para uso global
window.initFilter = initFilter;
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;