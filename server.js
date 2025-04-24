// server.js
const express  = require('express');
const dotenv   = require('dotenv');
const path     = require('path');
const webhook  = require('./controllers/webhook');

dotenv.config();

const app = express();

// para servir arquivos estáticos (dashboard.html, css, js, etc)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// rota raiz: serve o dashboard
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
