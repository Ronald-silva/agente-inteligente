// server.js
const express = require('express');
const dotenv = require('dotenv');
const webhook = require('./controllers/webhook');

dotenv.config();
const app = express();

// Configurações básicas
app.use(express.json());
app.use(express.static('public'));

// Rotas
app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.post('/webhook', webhook);

// Inicialização
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('✅ Servidor rodando na porta:', port);
});
