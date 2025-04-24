const askOpenAI = require('../services/openai');
const sendMessage = require('../services/zapi');

// Função para formatar o número de telefone (ex: 5585999999999 -> (85) 99999-9999)
const formatPhone = (number) => {
  const ddd = number.slice(2, 4);
  const base = number.slice(4);
  return `(${ddd}) ${base.slice(0, 5)}-${base.slice(5)}`;
};

// Webhook principal
const webhook = async (req, res) => {
  try {
    console.log('📥 Webhook recebeu:', req.body);

    const { phone, message } = req.body;

    if (!phone || !message) {
      console.warn('⚠️ Dados incompletos recebidos:', req.body);
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' });
    const formattedPhone = formatPhone(phone);

    console.log(`🕒 [${now}] Mensagem recebida de ${formattedPhone}: "${message}"`);

    // Consulta a IA
    const resposta = await askOpenAI(message);

    // Envia a resposta via WhatsApp usando Z-API
    await sendMessage(phone, resposta);

    console.log(`📤 Resposta enviada para ${formattedPhone}: "${resposta}"`);
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('❌ Erro no webhook:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = webhook;
