// server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const webhook = require('./controllers/webhook');

dotenv.config();

const app = express();
app.use(express.json());

// Servir dashboard.html na raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Rota do webhook
app.post('/webhook', webhook);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () =>
  console.log(`✅ Servidor rodando em http://${HOST}:${PORT}`)
);
