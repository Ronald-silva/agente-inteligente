const express = require('express');
const dotenv = require('dotenv');
const webhook = require('./controllers/webhook');



dotenv.config();

console.log('✅ OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
console.log('✅ ZAPI_INSTANCE_ID:', process.env.ZAPI_INSTANCE_ID);
console.log('✅ ZAPI_TOKEN:', process.env.ZAPI_TOKEN);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🤖 Carla - LuceBot está online!');
});

app.post('/webhook', webhook);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
