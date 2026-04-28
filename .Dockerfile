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

# Aguarda, executa migrações e inicia o servidor com logs detalhados
CMD sleep 30 && \
    echo "Running migrations..." && \
    npx drizzle-kit push && \
    echo "Migrations completed, starting server..." && \
    npm run start