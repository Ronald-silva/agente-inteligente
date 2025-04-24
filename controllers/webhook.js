const askOpenAI = require('../services/openai');
const sendMessage = require('../services/zapi');

module.exports = async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    console.log(`📩 Mensagem recebida de ${phone}: ${message}`);

    // Gera resposta com a Carla (OpenAI)
    const resposta = await askOpenAI(message);

    // Envia a resposta pro usuário via Z-API
    await sendMessage(phone, resposta);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
