const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const webhook = require('./controllers/webhook');

dotenv.config();

const app = express();
app.use(express.json());

// Rota para verificar se está online
app.get('/', (req, res) => {
  res.send('🤖 Carla - LuceBot está online!');
});

// Rota do dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Rota do webhook
app.post('/webhook', webhook);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
