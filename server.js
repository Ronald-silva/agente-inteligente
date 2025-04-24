require('dotenv').config();
console.log('✅ Variáveis de ambiente carregadas');

const express = require('express');
const processMessage = require('./services/messageProcessor');

console.log('✅ Módulos carregados');

// Inicializa o Express
const app = express();
app.use(express.json());

// Configuração de charset
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.charset = 'utf-8';
  next();
});

console.log('✅ Express configurado');

// Logs de requisição
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.path} - ${Date.now() - start}ms`);
  });
  next();
});

// Rota de status para healthcheck
app.get('/status', (req, res) => {
  console.log('📝 Requisição de status recebida');
  res.status(200).json({ status: 'ok' });
});

// Rota do webhook do WhatsApp
app.post('/webhook', async (req, res) => {
  try {
    console.log('📱 Mensagem recebida:', req.body);
    res.sendStatus(200); // Responde rapidamente ao webhook
    
    // Processa a mensagem de forma assíncrona
    const message = req.body;
    if (message && message.phone && message.message) {
      await processMessage(message);
    }
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    // Não enviamos o erro para o cliente pois já respondemos
  }
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro na aplicação:', err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Verificação de variáveis de ambiente críticas
const requiredEnvVars = ['OPENAI_API_KEY', 'ZAPI_INSTANCE_ID', 'ZAPI_TOKEN'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Variáveis de ambiente ausentes:', missingEnvVars.join(', '));
  process.exit(1);
}

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
}); 