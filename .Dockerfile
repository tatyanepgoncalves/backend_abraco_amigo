# Imagem base
FROM node:20-slim

# Instalação do cliente PostgreSQL (necessário para alguns comandos do Drizzle)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Diretório de trabalho
WORKDIR /src

# Instalar dependências primeiro (aproveita o cache do Docker)
COPY package*.json ./
RUN npm install

# Expor a porta (Railway usa a variável PORT)
EXPOSE 3333


# Garante que as migrações existam
COPY ./src/db/migrations ./src/db/migrations 


# O comando mágico: sincroniza o banco e inicia o app
CMD ["npm", "run", "deploy"]
