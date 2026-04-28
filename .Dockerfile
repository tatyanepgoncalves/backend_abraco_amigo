FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Executa migrações e inicia servidor com logs detalhados
CMD set -x && \
    sleep 30 && \
    echo "Running migrations..." && \
    npx drizzle-kit push && \
    echo "✓ Migrations completed" && \
    echo "Starting Node.js server..." && \
    ls -la server.js && \
    node --version && \
    npm --version && \
    echo "Executing: node server.js" && \
    node server.js