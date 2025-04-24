const askOpenAI = require('./openai');
const { sendMessage } = require('./whatsapp');
const prices = require('../config/prices');

async function processMessage({ phone, message }) {
  try {
    // Adiciona informações de preço ao contexto
    const context = {
      prices: {
        basic: prices.monthly.basic.toFixed(2),
        pro: prices.monthly.pro.toFixed(2),
        enterprise: prices.monthly.enterprise.toFixed(2),
        annualDiscount: prices.annualDiscount
      }
    };

    // Gera resposta usando OpenAI com contexto
    const resposta = await askOpenAI(message, context);
    
    // Envia resposta via WhatsApp
    await sendMessage(phone, resposta);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao processar mensagem:', error);
    
    // Em caso de erro, tenta enviar mensagem de fallback
    try {
      await sendMessage(
        phone, 
        "Desculpe, estou com dificuldades técnicas no momento. Por favor, tente novamente em alguns instantes."
      );
    } catch (sendError) {
      console.error('❌ Erro ao enviar mensagem de fallback:', sendError);
    }
    
    throw error;
  }
}

module.exports = processMessage; 