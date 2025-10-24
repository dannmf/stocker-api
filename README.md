Stocker API
API RESTful para controle de estoque e gerenciamento de produtos, desenvolvida com Node.js, TypeScript e tecnologias modernas.
Sobre o Projeto
Stocker API é uma solução completa para gerenciamento de estoque e produtos, oferecendo funcionalidades essenciais como cadastro de usuários, autenticação segura, controle de produtos e movimentações de estoque (entrada e saída).
A API foi desenvolvida com foco em performance, segurança e escalabilidade, utilizando as melhores práticas de desenvolvimento.
Desenvolvedor
Daniel Manoel - @dannmf
Tecnologias Utilizadas

Node.js: Ambiente de execução JavaScript
TypeScript: Superset tipado de JavaScript
Fastify: Framework web rápido e de baixo overhead
Prisma: ORM (Object-Relational Mapping) para acesso ao banco de dados
PostgreSQL: Banco de dados relacional
JWT: Autenticação baseada em tokens
bcryptjs: Biblioteca para hash de senhas
Zod: Biblioteca para validação de dados
Nodemailer: Biblioteca para envio de emails (recuperação de senha)

Funcionalidades

✅ Autenticação de usuários com JWT
✅ Cadastro e gerenciamento de usuários
✅ CRUD completo de produtos
✅ Controle de estoque (entrada e saída)
✅ Consulta de produtos com estoque baixo
✅ Filtros por categoria
✅ Recuperação de senha via email
✅ Sistema de logout seguro
✅ Validação de dados com Zod

Estrutura do Projeto
stocker-api/
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
├── docker-compose.yml       # Configuração do Docker para PostgreSQL
├── package.json             # Dependências e scripts
└── tsconfig.json            # Configuração do TypeScript
Modelos de Dados
Usuário (User)

id: Identificador único
email: Email do usuário (único)
name: Nome do usuário
password: Senha (armazenada com hash)
imageUrl: URL da imagem do perfil (opcional)
createdAt: Data de criação
updatedAt: Data de atualização

Produto (Product)

id: Identificador único
name: Nome do produto (único)
description: Descrição do produto
category: Categoria do produto
price: Preço do produto
stock: Quantidade em estoque
imageUrl: URL da imagem do produto (opcional)
createdAt: Data de criação
updatedAt: Data de atualização

Token Inválido (InvalidToken)

id: Identificador único
token: Token JWT invalidado
expiresAt: Data de expiração
createdAt: Data de criação

Endpoints da API
Autenticação

POST /login - Autenticar usuário
POST /logout - Deslogar usuário (requer autenticação)
POST /forgot-password - Solicitar recuperação de senha
POST /reset-password - Redefinir senha com token

Usuários

POST /user - Criar novo usuário
GET /user - Listar todos os usuários (requer autenticação)
GET /user/:id - Buscar usuário por ID (requer autenticação)
PUT /user/:id - Atualizar dados do usuário (requer autenticação)
PUT /user/password/:id - Atualizar senha (requer autenticação)
DELETE /user/:id - Excluir usuário (requer autenticação)

Produtos

POST /product - Criar novo produto (requer autenticação)
GET /product - Listar todos os produtos (requer autenticação)
GET /product/count - Obter quantidade total de produtos (requer autenticação)
GET /product/lowStock - Listar produtos com estoque baixo (requer autenticação)
GET /product/:id - Buscar produto por ID (requer autenticação)
GET /product/category/:category - Buscar por categoria (requer autenticação)
PUT /product/:id - Atualizar produto (requer autenticação)
DELETE /product/:id - Excluir produto (requer autenticação)

Instalação e Configuração
Pré-requisitos

Node.js (versão 18 ou superior)
Docker e Docker Compose
PostgreSQL (ou use o Docker)

Configuração Padrão (Supabase)

Clone o repositório:

bash   git clone https://github.com/dannmf/stocker-api.git
   cd stocker-api

Instale as dependências:

bash   npm install

Configure o arquivo .env.supabase com suas credenciais do Supabase
Sincronize com o banco de dados:

bash   npm run sync:supabase

Inicie o servidor:

bash   npm run dev
Configuração Local com Docker

Clone e instale as dependências (passos 1 e 2 acima)
Inicie o container PostgreSQL:

bash   npm run docker:up

Sincronize com o banco local:

bash   npm run sync:local

Inicie o servidor:

bash   npm run dev
O servidor estará disponível em http://localhost:3000
Scripts Disponíveis

npm run dev - Inicia o servidor de desenvolvimento
npm run docker:up - Inicia o container Docker do PostgreSQL
npm run docker:down - Para o container Docker
npm run docker:dev - Inicia Docker + servidor com configuração local
npm run sync:local - Sincroniza Prisma com banco local
npm run sync:supabase - Sincroniza Prisma com Supabase

Validação de Dados
Todas as rotas utilizam Zod para validação:

Usuários: Nome obrigatório, email válido, senha mínima de 6 caracteres
Produtos: Nome, descrição e categoria obrigatórios, preço positivo, estoque não-negativo
IDs: Conversão e validação automática de parâmetros numéricos

Segurança

🔒 Autenticação JWT com tempo de expiração configurável
🔒 Senhas com hash bcryptjs
🔒 Sistema de invalidação de tokens (logout seguro)
🔒 Variáveis de ambiente para credenciais
🔒 Middleware de autenticação em rotas protegidas
🔒 Recuperação de senha com tokens temporários

Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
Licença
Este projeto está sob a licença MIT.
