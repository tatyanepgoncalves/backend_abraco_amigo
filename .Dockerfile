# Imagem base
FROM node:20-slim

# Instalação do cliente PostgreSQL (necessário para alguns comandos do Drizzle)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Diretório de trabalho
WORKDIR /app

# Instalar dependências primeiro (aproveita o cache do Docker)
COPY package*.json ./
RUN npm install

# Copiar o código do projeto
COPY . .

#  Aguarda 10 segundos para o banco estar pronto, depois executa migrações
CMD sleep 10 && npx drizzle-kit push && npm run start