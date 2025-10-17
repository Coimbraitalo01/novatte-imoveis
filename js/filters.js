// js/filters.js

class PropertyFilter {
    constructor(properties) {
        this.properties = properties;
        this.filters = {
            propertyType: 'all',
            city: 'all',
            transaction: 'all',
            maxPrice: null
        };
        this.filteredProperties = [...properties];
        this.displayedCount = 6;
    }

    applyFilters() {
        const type = document.getElementById('property-type').value;
        const city = document.getElementById('city').value;
        const transaction = document.getElementById('transaction-type').value;
        const maxPrice = document.getElementById('max-price').value;

        this.filteredProperties = this.properties.filter(prop => {
            if (type !== 'all' && prop.propertyType !== type) return false;
            if (city !== 'all' && prop.city !== city) return false;
            if (transaction !== 'all' && prop.type !== transaction) return false;
            if (maxPrice) {
                const priceNum = this.extractPriceNumber(prop.price);
                const maxPriceNum = parseInt(maxPrice.replace(/\D/g, ''));
                if (priceNum > maxPriceNum) return false;
            }
            return true;
        });

        this.displayedCount = 6;
        return this.filteredProperties.slice(0, this.displayedCount);
    }

    extractPriceNumber(priceString) {
        return parseInt(priceString.replace(/\D/g, ''));
    }

    clearFilters() {
        document.getElementById('property-type').value = 'all';
        document.getElementById('city').value = 'all';
        document.getElementById('transaction-type').value = 'all';
        document.getElementById('max-price').value = '';
        
        this.filteredProperties = [...this.properties];
        this.displayedCount = 6;
        return this.filteredProperties.slice(0, this.displayedCount);
    }

    loadMore() {
        this.displayedCount += 3;
        return this.filteredProperties.slice(0, this.displayedCount);
    }

    hasMoreProperties() {
        return this.displayedCount < this.filteredProperties.length;
    }

    getDisplayedCount() {
        return this.displayedCount;
    }

    getTotalFiltered() {
        return this.filteredProperties.length;
    }
}

// Instância global do filtro
let propertyFilter;

// Inicializa o filtro
function initFilter() {
    if (typeof properties !== 'undefined') {
        propertyFilter = new PropertyFilter(properties);
    }
}

// Exporta para uso global
window.PropertyFilter = PropertyFilter;
window.propertyFilter = propertyFilter;
window.initFilter = initFilter;