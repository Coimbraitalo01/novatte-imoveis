// data/properties.js

// Dados dos corretores
const corretores = {
    "italo": {
        nome: "Ítalo Coimbra",
        tipo: "Particular",
        telefone: "22 98166-8036",
        whatsapp: "5522981668036",
        avatar: "IC"
    },
    "bruna": {
        nome: "Bruna Magazzi", 
        tipo: "Corretora",
        creci: "CRECI: 12345-6",
        telefone: "32991480246",
        whatsapp: "5532991480246",
        avatar: "BM"
    }
};

// Dados de exemplo dos imóveis
const properties = [
    {
        id: 1,
        title: "Casa Moderna com Piscina",
        type: "Venda",
        price: "R$ 550.000",
        location: "Itaperuna, RJ",
        city: "Itaperuna",
        propertyType: "Casa",
        size: "120m²",
        bedrooms: 3,
        bathrooms: 3,
        parking: 2,
        address: "Rua das Flores, 123, Centro, Itaperuna - RJ",
        lat: -21.2059, 
        lng: -41.8879,
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
        description: "Excelente casa moderna com piscina, acabamento de primeira qualidade, localizada em condomínio fechado com segurança 24h. Possui área gourmet, 3 suítes, garagem para 2 carros e amplo jardim. Ideal para famílias que buscam conforto e segurança.",
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400"
        ],
        corretor: "italo"
    },
    {
        id: 2,
        title: "Apartamento Central",
        type: "Aluguel",
        price: "R$ 1.200/mês",
        location: "Santo Antônio de Pádua, RJ",
        city: "Santo Antônio de Pádua",
        propertyType: "Apartamento",
        size: "70m²",
        bedrooms: 2,
        bathrooms: 2,
        parking: 1,
        address: "Avenida Central, 456, Centro, Santo Antônio de Pádua - RJ",
        lat: -21.5394, 
        lng: -42.1803,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
        description: "Apartamento bem localizado no centro de Santo Antônio de Pádua, próximo a comércio, escolas e transporte público. Recentemente reformado, possui varanda gourmet, piso porcelanato e armários embutidos. Condomínio com portaria 24h e área de lazer.",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
        ],
        corretor: "bruna"
    },
    {
        id: 3,
        title: "Casa com Jardim",
        type: "Venda",
        price: "R$ 380.000",
        location: "Miracema, RJ",
        city: "Miracema",
        propertyType: "Casa",
        size: "150m²",
        bedrooms: 4,
        bathrooms: 3,
        parking: 2,
        address: "Travessa da Paz, 789, Bairro Novo, Miracema - RJ",
        lat: -21.4122, 
        lng: -42.1968,
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400",
        description: "Casa espaçosa ideal para família, com jardim amplo, área de lazer completa e garagem para dois carros. Localizada em bairro tranquilo de Miracema, próxima a escolas e comércio. Acabamento em alto padrão com piso frio e janelas em alumínio.",
        images: [
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
            "https://images.unsplash.com/photo-1600585154340-9633f73c5b53?w=400"
        ],
        corretor: "italo"
    },
    {
        id: 4,
        title: "Terreno Residencial",
        type: "Venda",
        price: "R$ 120.000",
        location: "Itaocara, RJ",
        city: "Itaocara",
        propertyType: "Terreno",
        size: "300m²",
        bedrooms: 0,
        bathrooms: 0,
        parking: 0,
        address: "Estrada Rural, S/N, Zona Rural, Itaocara - RJ",
        lat: -21.6692, 
        lng: -42.0761,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
        description: "Excelente terreno plano para construção, localizado em área residencial em desenvolvimento em Itaocara. Totalmente regularizado com documentação em dia, infraestrutura completa (água, luz, esgoto) e topografia plana. Ideal para construção de casa própria ou investimento.",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400"
        ],
        corretor: "bruna"
    },
    {
        id: 5,
        title: "Sítio com Casa",
        type: "Venda",
        price: "R$ 850.000",
        location: "Cambuci, RJ",
        city: "Cambuci",
        propertyType: "Sítio",
        size: "500m²",
        bedrooms: 3,
        bathrooms: 2,
        parking: 3,
        address: "Estrada Rural, S/N, Zona Rural, Cambuci - RJ",
        lat: -21.5753, 
        lng: -41.9111,
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
        description: "Sítio com casa aconchegante, área verde, pomar diversificado e nascente de água. Ideal para lazer ou produção rural. Possui casa principal com 3 quartos, varanda ampla, área de churrasco, galinheiro e horta. Terreno com 5 hectares total, documentação regularizada.",
        images: [
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400"
        ],
        corretor: "italo"
    },
    {
        id: 6,
        title: "Loja Comercial",
        type: "Aluguel",
        price: "R$ 2.500/mês",
        location: "Aperibé, RJ",
        city: "Aperibé",
        propertyType: "Comercial",
        size: "80m²",
        bedrooms: 0,
        bathrooms: 1,
        parking: 2,
        address: "Rua Comercial, 321, Centro, Aperibé - RJ",
        lat: -21.6253, 
        lng: -42.1039,
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
        description: "Loja comercial em ponto estratégico no centro de Aperibé, com grande fluxo de pessoas. Movimentada, ideal para diversos tipos de negócio. Possui vitrine ampla, banheiro, área administrativa e estoque. Reformada recentemente com instalações elétricas e hidráulicas novas.",
        images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400"
        ],
        corretor: "bruna"
    }
];

// Exporta para uso global
window.corretores = corretores;
window.properties = properties;