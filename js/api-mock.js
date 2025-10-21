// js/api-mock.js

// Mock API para simular chamadas de API
class ApiMock {
    static async getProperties(filters = {}) {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredProperties = [...properties];
        
        // Aplicar filtros
        if (filters.propertyType && filters.propertyType !== 'all') {
            filteredProperties = filteredProperties.filter(prop => prop.propertyType === filters.propertyType);
        }
        
        if (filters.city && filters.city !== 'all') {
            filteredProperties = filteredProperties.filter(prop => prop.city === filters.city);
        }
        
        if (filters.transactionType && filters.transactionType !== 'all') {
            filteredProperties = filteredProperties.filter(prop => prop.type === filters.transactionType);
        }
        
        if (filters.maxPrice) {
            const maxPriceValue = parseFloat(filters.maxPrice.replace(/\D/g, ''));
            filteredProperties = filteredProperties.filter(prop => {
                const propPrice = parseFloat(prop.price.replace(/\D/g, ''));
                return propPrice <= maxPriceValue;
            });
        }
        
        return {
            success: true,
            data: filteredProperties,
            total: filteredProperties.length,
            message: 'Properties retrieved successfully'
        };
    }
    
    static async getPropertyById(id) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const property = properties.find(prop => prop.id === id);
        
        if (property) {
            return {
                success: true,
                data: property,
                message: 'Property found'
            };
        } else {
            return {
                success: false,
                data: null,
                message: 'Property not found'
            };
        }
    }
    
    static async submitPropertyInterest(formData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular envio de email/notificação
        console.log('📧 Dados do formulário enviados:', formData);
        
        return {
            success: true,
            message: 'Seu interesse foi registrado com sucesso! Entraremos em contato em breve.'
        };
    }
    
    static async contactCorretor(corretorId, propertyId, message) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const corretor = corretores[corretorId];
        const property = properties.find(p => p.id === propertyId);
        
        console.log('📞 Contato com corretor:', {
            corretor,
            property,
            message
        });
        
        return {
            success: true,
            message: 'Mensagem enviada com sucesso!'
        };
    }
}

// Exportar para uso global
window.ApiMock = ApiMock;