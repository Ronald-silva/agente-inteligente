# Use a imagem oficial do Node.js
FROM node:20-slim

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --production

# Copia o resto dos arquivos
COPY . .

# Expõe a porta que o app usa
EXPOSE 3000

# Comando para iniciar o app
CMD ["node", "server.js"] 