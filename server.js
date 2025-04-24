const express = require('express');
const dotenv = require('dotenv');
const webhook = require('./controllers/webhook');

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🤖 Carla - LuceBot está online!');
});

app.post('/webhook', webhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
