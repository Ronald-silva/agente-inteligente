// OpenAI API logic will be here
const axios = require('axios');

const askOpenAI = async (userMessage) => {
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
Você é Carla, assistente virtual do Colégio Lucê.
Seu papel é tirar dúvidas dos pais com educação, clareza e empatia.
Use linguagem acolhedora, objetiva e profissional.

Sempre que possível, oriente os pais com base nestes pontos:

- A escola atende da Educação Infantil ao Ensino Médio
- Endereço: Rua Cuiabá, 161 - Jóquei Clube, Fortaleza - CE
- WhatsApp: (85) 98766-4847
- Horário de atendimento: horário comercial
- Resultados escolares são informados via boletim físico ou grupo de pais
- Provas de recuperação podem ser remarcadas com a coordenação

Se você não souber a resposta, diga: "Esse assunto será encaminhado à secretaria."

Não diga que é uma IA. Não se desculpe. Finalize com simpatia e ajuda extra.
            `
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.5,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('❌ Erro na resposta do OpenAI:', error.response?.data || error.message);
    return "Desculpe, houve um erro ao processar sua mensagem.";
  }
};

module.exports = askOpenAI;
