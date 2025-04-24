// controllers/webhook.js
const askOpenAI   = require('../services/openai');
const sendMessage = require('../services/zapi');

const formatPhone = (number) => {
  const ddd  = number.slice(2,4);
  const base = number.slice(4);
  return `(${ddd}) ${base.slice(0,5)}-${base.slice(5)}`;
};

module.exports = async (req, res) => {
  try {
    console.log('📥 Webhook recebeu:', req.body);
    const { phone, message } = req.body;
    if (!phone || !message) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }
    const resposta = await askOpenAI(message);
    await sendMessage(phone, resposta);
    console.log(`📤 Resposta enviada para ${formatPhone(phone)}:`, resposta);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Erro no webhook:', err.response?.data || err.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
