// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import webhook from './controllers/webhook.js';

dotenv.config();

const app = express();
app.use(express.json());

// Serve o dashboard estático em /
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'dashboard.html'));
});

// Rota do webhook
app.post('/webhook', webhook);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando em http://${HOST}:${PORT}`);
});
