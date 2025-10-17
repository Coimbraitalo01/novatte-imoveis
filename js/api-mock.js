// js/api-mock.js

// Simula API calls
class PropertyAPI {
    static async getProperties(filters = {}) {
        // Simula delay de rede
        return new Promise((resolve) => {
            setTimeout(() => {
                let results = window.properties || [];
                
                // Aplica filtros básicos
                if (filters.propertyType && filters.propertyType !== 'all') {
                    results = results.filter(p => p.propertyType === filters.propertyType);
                }
                if (filters.city && filters.city !== 'all') {
                    results = results.filter(p => p.city === filters.city);
                }
                if (filters.transaction && filters.transaction !== 'all') {
                    results = results.filter(p => p.type === filters.transaction);
                }
                
                resolve({
                    data: results,
                    total: results.length,
                    page: 1,
                    totalPages: 1
                });
            }, 300);
        });
    }

    static async getProperty(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const property = (window.properties || []).find(p => p.id === id);
                resolve(property);
            }, 200);
        });
    }

    static async submitLead(formData) {
        // Simula envio para backend
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Lead enviado:', formData);
                resolve({ success: true, message: 'Lead cadastrado com sucesso!' });
            }, 500);
        });
    }
}

// Exporta para uso global
window.PropertyAPI = PropertyAPI;