# Stocker API

API de gerenciamento de estoque desenvolvida com Node.js, Fastify e PostgreSQL.

## Sobre o Projeto

Stocker API é uma aplicação back-end para controle de estoque que permite gerenciar produtos, usuários e movimentações de entrada e saída de mercadorias. O sistema inclui autenticação JWT e validação de dados com Zod.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Fastify** - Framework web de alta performance
- **Prisma** - ORM para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização do banco de dados
- **Zod** - Validação de schemas
- **JWT** - Autenticação via JSON Web Tokens
- **Bcrypt** - Hash de senhas

## Funcionalidades

- Autenticação e autorização de usuários
- Cadastro e gerenciamento de usuários
- Cadastro e gerenciamento de produtos
- Controle de movimentações de estoque (entrada/saída)
- Validação de dados com schemas Zod
- Hash seguro de senhas

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd stocker-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

O arquivo `.env` já foi criado com as configurações padrão:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stocker-api?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/stocker-api?schema=public"
JWT_SECRET="S3cr3T0k3en6615"
```

## Configuração do Banco de Dados

1. Suba o container do PostgreSQL:
```bash
npm run docker:up
```

2. Gere o Prisma Client:
```bash
npx prisma generate
```

3. Crie as tabelas no banco de dados:
```bash
npx prisma db push
```

## Como Executar

### Modo Desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
stocker-api/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── domains/
│   │   ├── auth/             # Módulo de autenticação
│   │   ├── product/          # Módulo de produtos
│   │   └── user/             # Módulo de usuários
│   ├── shared/
│   │   ├── lib/              # Bibliotecas compartilhadas (JWT, Prisma, Mailer)
│   │   ├── middlewares/      # Middlewares (autenticação)
│   │   ├── types/            # Definições de tipos
│   │   └── utils/            # Utilitários
│   └── server.ts             # Arquivo principal da aplicação
├── docker-compose.yml         # Configuração do Docker
├── package.json
└── .env                       # Variáveis de ambiente
```

## Modelos do Banco de Dados

### User
- id (autoincrement)
- email (único)
- name
- password (hash)
- imageUrl (opcional)
- createdAt
- updatedAt

### Product
- id (autoincrement)
- name (único)
- description
- category
- price
- stock
- imageUrl (opcional)
- createdAt
- updatedAt

### StockMovement
- id (autoincrement)
- productId
- quantity
- type (IN/OUT)
- user (opcional)
- createdAt

### InvalidToken
- id (autoincrement)
- token (único)
- expiresAt
- createdAt

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia o servidor em modo desenvolvimento

# Docker
npm run docker:up              # Sobe o container do PostgreSQL
npm run docker:down            # Para o container do PostgreSQL
npm run docker:dev             # Sobe o Docker e inicia em modo dev

# Prisma
npx prisma generate            # Gera o Prisma Client
npx prisma db push             # Sincroniza o schema com o banco
npx prisma studio              # Abre interface gráfica do banco
```

## Comandos Úteis do Docker

```bash
# Ver containers rodando
docker ps

# Ver logs do PostgreSQL
docker logs stocker-api-db

# Acessar o PostgreSQL via CLI
docker exec -it stocker-api-db psql -U postgres -d stocker-api

# Parar todos os containers
docker-compose down

# Remover volumes (apaga os dados)
docker-compose down -v
```

## Endpoints da API

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de novo usuário
- `POST /auth/logout` - Logout de usuário

### Usuários
- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Busca usuário por ID
- `PUT /users/:id` - Atualiza usuário
- `DELETE /users/:id` - Remove usuário

### Produtos
- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Busca produto por ID
- `POST /products` - Cria novo produto
- `PUT /products/:id` - Atualiza produto
- `DELETE /products/:id` - Remove produto

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| DATABASE_URL | URL de conexão do PostgreSQL | postgresql://postgres:postgres@localhost:5432/stocker-api |
| DIRECT_URL | URL direta de conexão | postgresql://postgres:postgres@localhost:5432/stocker-api |
| JWT_SECRET | Chave secreta para JWT | S3cr3T0k3en6615 |
| PORT | Porta do servidor | 3000 |

## Licença

ISC

## Autor

Desenvolvido por Daniel Manoel
