// server.js
const express  = require('express');
const dotenv   = require('dotenv');
const path     = require('path');
const webhook  = require('./controllers/webhook');

dotenv.config();

const app = express();

// Middleware para arquivos estáticos
app.use(express.static('public'));
app.use(express.json());

// Health check para o Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rota raiz: serve o dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// rota de webhook do Z-API
app.post('/webhook', webhook);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando em http://${HOST}:${PORT}`);
});
