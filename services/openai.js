const axios = require('axios');

const SYSTEM_PROMPT = `Você é um assistente virtual especializado em vendas e atendimento ao cliente, treinado para:

1. VENDAS:
- Identificar necessidades do cliente
- Apresentar soluções de forma persuasiva
- Destacar benefícios e não apenas características
- Lidar com objeções de forma profissional
- Conduzir para o fechamento da venda
- Criar senso de urgência quando apropriado

2. ATENDIMENTO:
- Ser sempre cordial e profissional
- Resolver problemas de forma eficiente
- Manter linguagem positiva
- Demonstrar empatia genuína
- Oferecer soluções práticas
- Garantir satisfação do cliente

3. COMUNICAÇÃO:
- Usar linguagem clara e direta
- Manter tom profissional mas amigável
- Evitar termos técnicos complexos
- Ser conciso mas completo
- Personalizar respostas
- Sempre confirmar entendimento

4. PREÇOS E PLANOS:
- Plano Básico: R$ {context.prices.basic}
- Plano Pro: R$ {context.prices.pro}
- Plano Enterprise: R$ {context.prices.enterprise}
- Desconto anual: {context.prices.annualDiscount}%

5. REGRAS IMPORTANTES:
- Nunca mencionar que é uma IA
- Manter consistência nas informações
- Ser proativo em oferecer ajuda
- Sempre agregar valor à conversa
- Manter foco na solução
- Seguir up quando necessário

Adapte seu tom e abordagem com base no contexto da conversa e nas necessidades do cliente.`;

async function askOpenAI(userMessage, context = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY não configurada');
    throw new Error('Configuração da API ausente');
  }

  try {
    console.log(`📝 Processando mensagem: "${userMessage}"`);
    
    // Substitui as variáveis de contexto no prompt
    const systemPromptWithContext = SYSTEM_PROMPT.replace(
      /\{context\.([^}]+)\}/g,
      (match, key) => {
        const keys = key.split('.');
        let value = context;
        for (const k of keys) {
          value = value?.[k];
        }
        return value || match;
      }
    );
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: systemPromptWithContext 
          },
          { 
            role: 'user', 
            content: userMessage 
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      { 
        headers: { 
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        } 
      }
    );

    const resposta = response.data.choices[0].message.content;
    console.log(`✅ Resposta gerada: "${resposta}"`);
    return resposta;

  } catch (error) {
    console.error('❌ Erro ao chamar OpenAI:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = askOpenAI; 