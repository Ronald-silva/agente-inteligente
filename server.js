// server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const webhook = require('./controllers/webhook');

dotenv.config();

const app = express();
app.use(express.json());

// Health check para o Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Servir dashboard.html na raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Rota do webhook
app.post('/webhook', webhook);

// Configuração da porta - Railway fornece a variável PORT
const PORT = process.env.PORT || 3000;

// Removendo o HOST fixo para permitir que o Railway gerencie
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
