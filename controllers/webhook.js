const askOpenAI = require('../services/openai');
const sendMessage = require('../services/zapi');

const formatPhone = (number) => {
  const ddd = number.slice(2, 4);
  const base = number.slice(4);
  return `(${ddd}) ${base.slice(0, 5)}-${base.slice(5)}`;
};

const webhook = async (req, res) => {
  try {
    console.log('📥 Webhook recebeu:', req.body);

    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' });
    const formattedPhone = formatPhone(phone);

    console.log(`📥 [${now}] Mensagem recebida de ${formattedPhone}: "${message}"`);

    const resposta = await askOpenAI(message);
    await sendMessage(phone, resposta);

    console.log(`📤 Resposta enviada: "${resposta}"`);
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('❌ Erro no webhook:', error.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = webhook;
