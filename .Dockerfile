FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Aguarda banco ficar pronto e inicia servidor
CMD sleep 45 && \
    echo "Environment variables:" && \
    echo "PORT=$PORT" && \
    echo "DATABASE_URL=$DATABASE_URL" && \
    echo "REDIS_URL=$REDIS_URL" && \
    echo "Starting Node.js server..." && \
    exec node server.js