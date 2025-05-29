# Mundo SENAI API

Backend API para o projeto de Dashboard apresentado no evento Mundo SENAI em 5 de junho de 2025.

## Sobre o Projeto

Este projeto é o backend de uma aplicação desenvolvida pelos alunos do segundo ano do curso técnico de Desenvolvimento de Sistemas do SENAI. A aplicação consiste em uma dashboard que permite o cadastro de produtos e usuários com sistema de autenticação.

O backend foi desenvolvido utilizando tecnologias modernas como Node.js, TypeScript, Fastify e Prisma ORM, fornecendo uma API RESTful para o frontend da aplicação.

## Equipe

**Instrutores:**
- Celso Giusti
- Daniel Manoel
- Marlon Fanger

**Alunos:**
- Augusto Senna
- Jimmy
- Lívia Clemente
- Miguel Zacharias
- Marcela

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **TypeScript**: Superset tipado de JavaScript
- **Fastify**: Framework web rápido e de baixo overhead
- **Prisma**: ORM (Object-Relational Mapping) para acesso ao banco de dados
- **PostgreSQL**: Banco de dados relacional para produção e desenvolvimento local
- **JWT**: Autenticação baseada em tokens
- **bcryptjs**: Biblioteca para hash de senhas
- **Zod**: Biblioteca para validação de dados
- **Nodemailer**: Biblioteca para envio de emails (recuperação de senha)

## Estrutura do Projeto

```
mundo-senai-api/
├── prisma/                  # Configurações do Prisma ORM
│   ├── migrations/          # Migrações do banco de dados
│   └── schema.prisma        # Schema do banco de dados
├── src/                     # Código fonte
│   ├── domains/             # Módulos da aplicação
│   │   ├── auth/            # Autenticação
│   │   ├── product/         # Produtos
│   │   └── user/            # Usuários
│   ├── shared/              # Recursos compartilhados
│   │   ├── interfaces/      # Interfaces TypeScript
│   │   ├── lib/             # Bibliotecas e utilitários
│   │   ├── middlewares/     # Middlewares da aplicação
│   │   ├── types/           # Definições de tipos
│   │   └── utils/           # Funções utilitárias
│   └── server.ts            # Ponto de entrada da aplicação
├── .env                     # Variáveis de ambiente (produção)
├── .env.local               # Variáveis para ambiente local
├── .env.supabase            # Variáveis para ambiente Supabase
├── docker-compose.yml       # Configuração do Docker para PostgreSQL local
├── package.json             # Dependências e scripts
└── tsconfig.json            # Configuração do TypeScript
```

## Modelos de Dados

### Usuário (User)
- id: Identificador único
- email: Email do usuário (único)
- name: Nome do usuário
- password: Senha do usuário (armazenada com hash)
- imageUrl: URL da imagem do usuário (opcional)
- createdAt: Data de criação
- updatedAt: Data de atualização

### Produto (Product)
- id: Identificador único
- name: Nome do produto (único)
- description: Descrição do produto
- category: Categoria do produto
- price: Preço do produto
- stock: Quantidade em estoque
- imageUrl: URL da imagem do produto (opcional)
- createdAt: Data de criação
- updatedAt: Data de atualização

### Token Inválido (InvalidToken)
- id: Identificador único
- token: Token JWT invalidado (para logout)
- expiresAt: Data de expiração do token
- cratedAt: Data de criação

## Endpoints da API

### Autenticação
- `POST /login`: Autenticar usuário
- `POST /logout`: Deslogar usuário (requer autenticação)
- `POST /forgot-password`: Solicitar recuperação de senha
- `POST /reset-password`: Redefinir senha com token

### Usuários
- `POST /user`: Criar um novo usuário
- `GET /user`: Listar todos os usuários (requer autenticação)
- `GET /user/:id`: Buscar usuário por ID (requer autenticação)
- `PUT /user/:id`: Atualizar dados do usuário (requer autenticação)
- `PUT /user/password/:id`: Atualizar senha do usuário (requer autenticação)
- `DELETE /user/:id`: Excluir usuário (requer autenticação)

### Produtos
- `POST /product`: Criar um novo produto (requer autenticação)
- `GET /product`: Listar todos os produtos (requer autenticação)
- `GET /product/count`: Obter quantidade total de produtos (requer autenticação)
- `GET /product/lowStock`: Listar produtos com estoque baixo (requer autenticação)
- `GET /product/:id`: Buscar produto por ID (requer autenticação)
- `GET /product/category/:category`: Buscar produtos por categoria (requer autenticação)
- `PUT /product/:id`: Atualizar produto (requer autenticação)
- `DELETE /product/:id`: Excluir produto (requer autenticação)

## Validação de Dados

O projeto utiliza a biblioteca Zod para validação de dados em todas as rotas:

- Validação de criação de usuários: nome obrigatório, email válido, senha com mínimo de 6 caracteres
- Validação de atualização de usuários: campos opcionais com as mesmas regras
- Validação de produtos: nome, descrição, categoria obrigatórios, preço positivo, estoque não-negativo
- Validação de IDs: conversão e validação de IDs numéricos

## Configuração de Ambientes

O projeto suporta múltiplos ambientes de desenvolvimento:

### Configuração Padrão (Supabase)

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure o arquivo `.env.supabase` com as credenciais do Supabase
4. Sincronize com o ambiente Supabase:
   ```
   npm run sync:supabase
   ```
5. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

### Configuração Local com Docker 

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o container Docker do PostgreSQL:
   ```
   npm run docker:up
   ```
4. Sincronize com o ambiente local:
   ```
   npm run sync:local
   ```
5. Inicie o servidor com as configurações locais:
   ```
   npm run dev
   ```

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run docker:up`: Inicia o container Docker do PostgreSQL
- `npm run docker:down`: Para o container Docker
- `npm run docker:dev`: Inicia o Docker e o servidor com configuração local
- `npm run sync:local`: Sincroniza o Prisma com o banco local
- `npm run sync:supabase`: Sincroniza o Prisma com o Supabase

O servidor estará disponível em `http://localhost:3000`

## Segurança

- Autenticação via JWT com tempo de expiração
- Senhas armazenadas com hash usando bcryptjs
- Sistema de invalidação de tokens para logout seguro
- Variáveis de ambiente para armazenamento seguro de credenciais
- Middleware de autenticação para proteção de rotas
- Recuperação de senha via email com tokens temporários

Desenvolvido para o evento Mundo SENAI - Junho 2025
