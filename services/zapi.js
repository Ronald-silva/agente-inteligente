// services/zapi.js
require('dotenv').config();
const axios = require('axios');

module.exports = async function sendMessage(phone, message) {
  const instanceId = process.env.ZAPI_INSTANCE_ID;
  const token      = process.env.ZAPI_TOKEN;
  const url        = `https://api.z-api.io/instances/${instanceId}/send-messages`;

  const resp = await axios.post(
    url,
    { phone, message },
    { headers: { 'Client-Token': token } }
  );
  return resp.data;
};
