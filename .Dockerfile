FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Executa migrações e inicia servidor diretamente
CMD sleep 30 && \
    echo "Running migrations..." && \
    npx drizzle-kit push && \
    echo "Starting server..." && \
    node server.js