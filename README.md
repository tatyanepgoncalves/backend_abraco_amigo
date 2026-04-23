# Abraço Amigo - Backend

Este é o servidor de API do projeto **Abraço Amigo**, um sistema de gestão de demandas voluntárias e locais de ajuda comunitária. O sistema permite que gestores cadastrem locais e necessidades (demandas) e que voluntários se candidatem a essas causas.

## 🚀 Tecnologias Utilizadas

- **Node.js** (Ambiente de execução)
- **Express** (Framework web)
- **Drizzle ORM** (Interação com banco de dados)
- **PostgreSQL** (Banco de dados relacional)
- **pnpm** (Gerenciador de pacotes)
- **JWT** (Autenticação)

## 📦 Instalação e Configuração

1. **Clonar o repositório:**

```bash
git clone [https://github.com/tatyanepgoncalves/backend_abraco_amigo.git](https://github.com/tatyanepgoncalves/backend_abraco_amigo.git)
cd backend_abraco_amigo
```

2. **Installar dependências:**

```bash
pnpm install
```

3. **Variáveis de Ambiente:**
Crie um arquivo ``.env`` na raiz do projeto seguindo o modelo:
Ou renomeie o arquivo `.env.example` para `.env` e preencha com seus dados.

```bash
PORT=ADD_PORT

# Database
DB_NAME="ADD_YOUR_DB_NAME_HERE"
DB_USERNAME="ADD_YOUR_DB_USERNAME_HERE"
DB_PASSWORD="ADD_YOUR_DB_PASSWORD_HERE"

# Postgres
DATABASE_URL="postgresql://ADD_YOUR_DB_USERNAME_HERE:ADD_YOUR_DB_PASSWORD_HERE@localhost:5433/ADD_YOUR_DB_NAME_HERE"


# Redis
REDIS_URL="redis://localhost:6379"

JWT_SECRET="ADD_YOUR_JWT_SECRET_HERE"
```

4. **Migratiions (Banco de dados)**

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

5. **Rodar em desenvolvimento**

```bash
pnpm dev
```

---

## 🛠️ Documentação da API

### Usuários (Contas e Autenticação)

| Método | Rota        | Descrição                           | Acesso      |
| :---   | :---        | :---                                | :---        |
| POST   | `/usuarios` | Cadastra um novo usuário no sistema | Público     |
| POST   | `/login`    | Realiza login e retorna o Token JWT | Público     |
| GET    | `/me`       | Obtém os detalhes do perfil logado  | Autenticado |
| PUT    | `/usuarios` | Atualiza dados do usuário logado    | Autenticado |
| DELETE | `/usuarios` | Remove a conta do usuário logado    | Autenticado |

### Locais (Pontos de Apoio)

| Método | Rota          | Descrição                                | Acesso          |
| :---   | :---          | :---                                     |            :--- |
| GET    | `/locais`     | Lista todos os locais de ajuda           | Autenticado     |
| POST   | `/locais`     | Cadastra um novo local                   | Autenticado     |
| GET    | `/locais/:id` | Busca um local específico via Params ID  | Autenticado     |
| PUT    | `/locais`     | Atualiza informações do local            | Gestor Logado   |
| DELETE | `/locais/:id` | Remove um local                          | Gestor Logado   |

### Demandas (Vagas de Voluntariado)

| Método | Rota                        | Descrição                                 | Acesso        |
| :---   | :---                        | :---                                      | :---          |
| GET    | `/demandas`                 | Lista demandas com filtros opcionais      | Autenticado   |
| GET    | `/demandas/aplicacoes`      | Busca aplicações feitas por um e-mail     | **Público**   |
| GET    | `/demandas/:id`             | Detalhes de uma demanda específica        | Autenticado   |
| POST   | `/demandas`                 | Cria uma nova demanda                     | Gestor Logado |
| POST   | `/demandas/candidatura/:id` | Candidatura de voluntário via formulário  | **Público**   |
| PUT    |  `/demandas/:id`            | Atualiza dados da demanda                 | Gestor Logado |
| PATCH  | `/demandas/status/:id`      | Altera status (Aberta/Concluída)          | Gestor Logado |
| DELETE | `/demandas/desistencia/:id` | Remove candidatura de voluntário          | **Público**   |
| DELETE | `/demandas/:id`             | Remove uma demanda do sistema             | Gestor Logado |

---

## 🏗️ Estrutura do Projeto

- `src/controllers`: Lógica de recebimento de requisições.
- `src/services`: Regras de negócio e comunicação com banco de dados.
- `src/db/schema`: Definição das tabelas (Drizzle).
- `src/middlewares`: Filtros de autenticação e permissões.
- `src/routes`: Definição dos endpoints da aplicação.

## 🤝 Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`).
3. Comite suas mudanças (`git commit -m 'Add NovaFeature'`).
4. Faça o push para a branch (`git push origin feature/NovaFeature`).
5. Abra um Pull Request.

---
Desenvolvido por **Tatyane Gonçalves**.
