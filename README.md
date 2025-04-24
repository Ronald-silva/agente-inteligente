# API Express Básica

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
PORT=3000
NODE_ENV=development

# OpenAI API
OPENAI_API_KEY=sua_chave_da_openai

# Z-API (WhatsApp)
ZAPI_INSTANCE_ID=seu_instance_id
ZAPI_TOKEN=seu_token
```

4. Inicie o servidor:
```bash
npm start
```

## Rotas Disponíveis

- `GET /status` - Verificação de saúde do servidor
  - Resposta: `{"status": "ok"}`
- `POST /webhook` - Endpoint para receber mensagens
  - Corpo da requisição: `{ "phone": "5511999999999", "message": "sua mensagem" }`

## Tecnologias Utilizadas

- Node.js
- Express
- OpenAI API
- Z-API (WhatsApp)
- dotenv 