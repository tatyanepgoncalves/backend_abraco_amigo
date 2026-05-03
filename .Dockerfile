FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar arquivos de dependência do pnpm
COPY pnpm-lock.yaml* package.json ./
RUN pnpm install

COPY . .

CMD npx drizzle-kit generate && npx drizzle-kit migrate && node server.js