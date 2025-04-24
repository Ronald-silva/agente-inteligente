const axios = require('axios');

async function sendMessage(phone, message) {
  const instanceId = process.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN;

  if (!instanceId || !token) {
    console.error('❌ Configurações do Z-API ausentes');
    throw new Error('Configurações do WhatsApp ausentes');
  }

  try {
    console.log(`📱 Enviando mensagem para ${phone}`);
    
    const response = await axios.post(
      `https://api.z-api.io/instances/${instanceId}/send-messages`,
      { phone, message },
      { headers: { 'Client-Token': token } }
    );

    console.log(`✅ Mensagem enviada com sucesso para ${phone}`);
    return response.data;

  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendMessage }; 