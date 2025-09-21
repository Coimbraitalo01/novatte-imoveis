import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Properties from './components/Properties';
import About from './components/About';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PropertyDetail from './components/PropertyDetail';

export default function App() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCidade, setFiltroCidade] = useState('');
  const [filtroOperacao, setFiltroOperacao] = useState('');

  // Dados fixos como fallback
  const imoveisFixos = [
    {
      _id: "1",
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
      _id: "2",
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
      _id: "3",
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
      _id: "4",
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
      _id: "5",
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
      _id: "6",
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

  // Buscar imóveis da API
  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/imoveis');
        if (!response.ok) {
          throw new Error('Erro ao carregar imóveis');
        }
        const data = await response.json();
        
        // Garantir que todos os IDs sejam strings
        const imoveisComIdsString = data.map(imovel => ({
          ...imovel,
          _id: imovel._id.toString()
        }));
        
        setImoveis(imoveisComIdsString);
      } catch (err) {
        console.error('Erro ao buscar imóveis:', err);
        setError(err.message);
        // Mantém os imóveis fixos como fallback
        setImoveis(imoveisFixos);
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  // Filtrar imóveis
  const imoveisFiltrados = imoveis.filter(imovel => {
    return (
      (filtroCidade === '' || imovel.city === filtroCidade) &&
      (filtroOperacao === '' || imovel.operation === filtroOperacao)
    );
  });

  // Função para aplicar filtros
  const aplicarFiltros = () => {
    const tipoSelect = document.querySelector('select:nth-child(1)');
    const operacaoSelect = document.querySelector('select:nth-child(2)');
    const cidadeSelect = document.querySelector('select:nth-child(3)');
    
    setFiltroCidade(cidadeSelect.value);
    setFiltroOperacao(operacaoSelect.value === 'Operação' ? '' : operacaoSelect.value.toLowerCase());
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Hero aplicarFiltros={aplicarFiltros} />
              <Properties 
                imoveis={imoveisFiltrados.length > 0 ? imoveisFiltrados : (imoveis.length > 0 ? imoveis : imoveisFixos)}
                loading={loading}
                error={error}
              />
              <About />
              <Partners />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/property/:id" element={
            <PropertyDetail imoveis={imoveis.length > 0 ? imoveis : imoveisFixos} />
          } />
        </Routes>

        {/* FontAwesome e Google Fonts */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </div>
    </Router>
  );
}