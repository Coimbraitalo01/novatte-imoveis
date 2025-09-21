const mongoose = require('mongoose');

const ImovelSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [100, 'Título não pode ter mais de 100 caracteres']
  },
  description: {
    type: String,
    maxlength: [1000, 'Descrição não pode ter mais de 1000 caracteres']
  },
  city: {
    type: String,
    required: [true, 'Cidade é obrigatória'],
    trim: true
  },
  neighborhood: {
    type: String,
    required: [true, 'Bairro é obrigatório'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },
  area: {
    type: String,
    required: [true, 'Área é obrigatória']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Número de quartos é obrigatório'],
    min: [0, 'Número de quartos não pode ser negativo']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Número de banheiros é obrigatório'],
    min: [0, 'Número de banheiros não pode ser negativo']
  },
  images: [{
    type: String,
    validate: {
      validator: function(url) {
        // Validação simples de URL
        return url && url.length > 0;
      },
      message: 'URL da imagem inválida'
    }
  }],
  operation: { 
    type: String, 
    enum: {
      values: ['venda', 'locacao'],
      message: 'Operação deve ser "venda" ou "locacao"'
    }, 
    default: 'venda' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Índices para melhor performance nas buscas
ImovelSchema.index({ city: 1, neighborhood: 1 });
ImovelSchema.index({ price: 1 });
ImovelSchema.index({ operation: 1 });

module.exports = mongoose.model('Imovel', ImovelSchema);