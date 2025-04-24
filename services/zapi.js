const axios = require('axios');

const sendMessage = async (phone, message) => {
  const instanceId = process.env.ZAPI_INSTANCE_ID;
  const token = process.env.ZAPI_TOKEN;

  const url = `https://api.z-api.io/instances/${instanceId}/send-messages`;

  console.log("🔎 URL gerada:", url);
  console.log("🔐 ZAPI_INSTANCE_ID:", instanceId);
  console.log("🔐 ZAPI_TOKEN:", token);

  try {
    const response = await axios.post(
      url,
      {
        phone,
        message
      },
      {
        headers: {
          'Client-Token': token
        }
      }
    );

    console.log(`✅ Mensagem enviada para ${phone}`);
    return response.data;

  } catch (error) {
    console.error('❌ Erro ao enviar mensagem via Z-API:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = sendMessage;
