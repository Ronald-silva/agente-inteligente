// server.js
const express = require('express');
const dotenv = require('dotenv');
const webhook = require('./controllers/webhook');

// Carrega variáveis de ambiente
dotenv.config();

// Inicializa o Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Health check
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Webhook
app.post('/webhook', webhook);

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Inicialização
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Servidor iniciado na porta:', PORT);
  console.log('📝 Variáveis de ambiente:');
  console.log('- PORT:', PORT);
  console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Recebido sinal SIGTERM');
  server.close(() => {
    console.log('✅ Servidor encerrado');
    process.exit(0);
  });
});
