FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar arquivos de dependência do pnpm
COPY pnpm-lock.yaml* package.json ./
RUN pnpm install

COPY . .

# O CMD deve usar npx ou pnpm dlx para o drizzle-kit
CMD npx drizzle-kit push --force; node server.js