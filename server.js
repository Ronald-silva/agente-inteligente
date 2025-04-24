require('dotenv').config();
console.log('✅ Variáveis de ambiente carregadas');

const express = require('express');
const processMessage = require('./services/messageProcessor');

console.log('✅ Módulos carregados');

// Processo para manter o servidor rodando
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não tratado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', reason);
});

// Inicializa o Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('✅ Express configurado');

// Logs de requisição
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📝 Requisição recebida: ${req.method} ${req.path}`);
  res.on('finish', () => {
    console.log(`✅ Requisição finalizada: ${req.method} ${req.path} - ${Date.now() - start}ms`);
  });
  next();
});

// Rota de status para healthcheck
app.get('/status', (req, res) => {
  try {
    console.log('📝 Requisição de status recebida');
    res.status(200).json({ 
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Erro na rota de status:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota do webhook do WhatsApp
app.post('/webhook', async (req, res) => {
  try {
    console.log('📱 Mensagem recebida:', JSON.stringify(req.body));
    res.sendStatus(200); // Responde rapidamente ao webhook
    
    // Processa a mensagem de forma assíncrona
    const message = req.body;
    if (message && message.phone && message.message) {
      await processMessage(message).catch(error => {
        console.error('❌ Erro ao processar mensagem:', error);
      });
    }
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
  }
});

// Rota de fallback para 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
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
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
}); 