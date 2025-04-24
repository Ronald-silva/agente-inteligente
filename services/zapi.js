// Z-API integration logic will be here
const axios = require('axios');

const sendMessage = async (phone, message) => {
  const instanceId = process.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN;

  try {
    const url = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-messages`;

    const response = await axios.post(url, {
      phone: phone,
      message: message
    });

    console.log(`✅ Mensagem enviada para ${phone}`);
    return response.data;

  } catch (error) {
    console.error('❌ Erro ao enviar mensagem via Z-API:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = sendMessage;
