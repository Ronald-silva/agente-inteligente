const askOpenAI = require('./openai');
const { sendMessage } = require('./whatsapp');

async function processMessage({ phone, message }) {
  try {
    // Gera resposta usando OpenAI
    const resposta = await askOpenAI(message);
    
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