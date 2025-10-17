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
                const priceNum = parseInt(prop.price.replace(/\D/g, ''));
                const maxPriceNum = parseInt(maxPrice.replace(/\D/g, ''));
                if (priceNum > maxPriceNum) return false;
            }
            return true;
        });

        this.displayedCount = 6;
        return this.filteredProperties;
    }

    clearFilters() {
        document.getElementById('property-type').value = 'all';
        document.getElementById('city').value = 'all';
        document.getElementById('transaction-type').value = 'all';
        document.getElementById('max-price').value = '';
        
        this.filteredProperties = [...this.properties];
        this.displayedCount = 6;
        return this.filteredProperties;
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
    propertyFilter = new PropertyFilter(properties);
}

// Formatação de preços
function formatPriceInput(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = parseInt(value).toLocaleString('pt-BR');
            e.target.value = value;
        }
    });
}

// Exporta para uso global
window.PropertyFilter = PropertyFilter;
window.propertyFilter = propertyFilter;
window.initFilter = initFilter;
window.formatPriceInput = formatPriceInput;