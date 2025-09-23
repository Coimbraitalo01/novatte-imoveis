# Novatte - Projeto Fullstack (skeleton)

Este repositório contém um esqueleto funcional para a aplicação **Novatte**:
- backend/ (Node.js + Express + MongoDB via Mongoose)
- frontend/ (React + Vite)
- admin/ (React + Vite) - painel simples para cadastrar imóveis
https://coimbraitalo01.github.io/novatte-imoveis/
## Requisitos
- Node.js 18+ instalado
- npm
- MongoDB (local) ou uma instância MongoDB Atlas

## Como rodar (tutorial rápido)

### 1) Backend
```bash
cd novatte-imoveis/backend
npm install
# configure .env com MONGO_URI se for usar Atlas
cp .env.example .env
# iniciar
npm run dev
# ou
npm start
```
API estará disponível em http://localhost:5000
Rotas:
- GET /api/imoveis
- POST /api/imoveis
- GET /api/imoveis/:id
- PUT /api/imoveis/:id
- DELETE /api/imoveis/:id

### 2) Frontend (site público)
```bash
cd ../frontend
npm install
npm run dev
```
Abre em http://localhost:5173 (padrão do Vite)

### 3) Admin (painel)
```bash
cd ../admin
npm install
npm run dev
```
Abre em http://localhost:5174

Observação: o frontend e o admin fazem requisições para a API em http://localhost:5000 (padrão). Ajuste se necessário.

