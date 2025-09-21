const mongoose = require('mongoose');
const Imovel = require('./models/Imovel');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/novatte';

const imoveisExemplo = [
  {
    title: "Casa Ampliada no Centro de Pádua",
    description: "Excelente casa ampliada, toda reformada, com 3 quartos, sala, cozinha, área de serviço e quintal. Localizada no centro, próximo a comércios, escolas e bancos.",
    city: "Santo Antônio de Pádua",
    neighborhood: "Centro",
    price: 280000,
    area: "180m²",
    bedrooms: 3,
    bathrooms: 2,
    images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80"],
    operation: "venda"
  },
  {
    title: "Sobrado em Condomínio Fechado em Miracema",
    description: "Sobrado moderno em condomínio fechado com piscina, salão de festas e segurança 24h. 4 quartos (sendo 2 suítes), garagem para 2 carros.",
    city: "Miracema",
    neighborhood: "Jardim Miracema",
    price: 450000,
    area: "220m²",
    bedrooms: 4,
    bathrooms: 3,
    images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"],
    operation: "venda"
  },
  {
    title: "Apartamento Novo em Itaperuna",
    description: "Apartamento novo no centro de Itaperuna, com 2 quartos, sala ampla, cozinha planejada, varanda gourmet e 1 vaga de garagem. Pronto para morar!",
    city: "Itaperuna",
    neighborhood: "Centro",
    price: 220000,
    area: "72m²",
    bedrooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"],
    operation: "venda"
  },
  {
    title: "Chácara para Lazer em Itaocara",
    description: "Chácara com casa de 2 quartos, área de lazer com piscina, churrasqueira e forno de pizza. Ideal para fins de semana e descanso. Terreno de 2.000m².",
    city: "Itaocara",
    neighborhood: "Zona Rural",
    price: 180000,
    area: "2000m²",
    bedrooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80"],
    operation: "venda"
  },
  {
    title: "Casa para Aluguel em Cambuci",
    description: "Casa bem localizada para aluguel, com 2 quartos, sala, cozinha, área de serviço e quintal. Próximo ao centro e com fácil acesso ao comércio.",
    city: "Cambuci",
    neighborhood: "Vila Isabel",
    price: 1200,
    area: "90m²",
    bedrooms: 2,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80"],
    operation: "locacao"
  },
  {
    title: "Terreno Residencial em Aperibé",
    description: "Terreno plano e regularizado em loteamento residencial. Ótima localização, próximo à escola municipal e ao centro da cidade. Documentação em ordem.",
    city: "Aperibé",
    neighborhood: "Loteamento Nova Aperibé",
    price: 45000,
    area: "360m²",
    bedrooms: 0,
    bathrooms: 0,
    images: ["https://images.unsplash.com/photo-1465433045946-ba6506ce5a59?auto=format&fit=crop&w=600&q=80"],
    operation: "venda"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB');
    
    // Limpar coleção existente
    await Imovel.deleteMany({});
    console.log('Dados antigos removidos');
    
    // Inserir novos dados
    await Imovel.insertMany(imoveisExemplo);
    console.log('Dados de exemplo inseridos com sucesso!');
    
    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular o banco:', error);
    process.exit(1);
  }
}

seedDatabase();