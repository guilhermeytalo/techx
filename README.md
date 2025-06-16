# Task Management App

Aplicação simples de gerenciamento de tarefas com backend em Node.js + Express + Prisma e frontend em Angular + PrimeNG com drag and drop.

## 🐳 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Angular CLi] (https://angular.dev/)
- [NodeJs] (https://nodejs.org/en)

---

## 🚀 Como rodar o projeto

### 1. Subir os containers com Docker

```bash
docker compose up --build
```

Esse comando irá:

- Criar os containers do banco de dados e backend
- Instalar dependências do backend
- Rodar o servidor Express

---

### 2. Executar as migrações do Prisma

Com o backend rodando, execute:

```bash
docker compose exec backend npx prisma migrate dev --name init
```

Esse comando aplica as migrações no banco de dados dentro do container e cria a estrutura inicial.

---

### 3. Executar o frontend
```bash
  # a versão do angular cli foi a 19 para compatibilidade com a biblioteca de UI
  ng serve
```

## 🧪 Tecnologias utilizadas

- **Backend**: Node.js, Express, Prisma, MySQL
- **Frontend**: Angular, PrimeNG e Tailwind
- **Containerização**: Docker + Docker Compose

---

## 📂 Estrutura

```
.
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── ...
├── frontend/
│   ├── src/
│   ├── angular.json
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## 📌 Observações

- Certifique-se de que a porta usada pelo banco (por exemplo, 3306 para MySQL) não esteja ocupada localmente.
- Para resetar o banco de dados, use:  
  ```bash
  docker compose exec backend npx prisma migrate reset
  ```

- Cerfique de ter gerado a JWT_SECRET na sua máquina
```bash
  openssl rand -base64 32
```
---

## Especificações
### Infraestrutura e Configuração
 - [x] Inicializar repositório Git com .gitignore adequado.

 - [x] Criar pasta frontend com Angular (ng new frontend).

 - [x] Criar pasta backend com Node.js + TypeScript.

 - [x] Configurar Docker para backend e banco MySQL.

 - [x] Configurar o banco de dados MySQL (tabela de tarefas).

 - [x] Configurar ORM (Ex: Prisma ou TypeORM) no backend.

 - [x] Criar .env para configs sensíveis.

### Backend - API RESTful com Node.js + TypeScript
 - [x] Configurar estrutura do projeto (src/controllers, routes, services, etc.).

 - [x] Criar entidade Task com campos: id, title, description, done, createdAt, updatedAt.

 Criar endpoints:

 - [x] GET /tasks – listar todas as tarefas.

 - [x] POST /tasks – criar nova tarefa.

 - [x] PUT /tasks/:id – atualizar tarefa existente.

 - [x] DELETE /tasks/:id – deletar tarefa.

 - [x]  PATCH /tasks/:id/done – marcar como concluída/não concluída.

 - [x] Conectar à base de dados MySQL.(sendo feito via docker)

🔐 Extra:
 - [x] Implementar autenticação com JWT.

 - [x] Criar User model.

 - [x] Criar rotas de login, register, auth middleware.

 - [x] Associar tarefas a usuários.

📦 Extra:
 - [ ] Integrar MongoDB para armazenar observações, anexos ou logs de histórico das tarefas.

### Frontend - Angular
 - [x] Criar componente de listagem de tarefas (task-list).

 - [x] Criar componente de formulário para adicionar/editar tarefas (task-form).

 - [x] Criar serviço Angular para consumir API do backend.

 - [x] Exibir todas as tarefas na home.

 - [x] Permitir criar, editar, remover, marcar como concluída.

 - [x] Estilizar a interface com CSS ou biblioteca como Angular Material.

🔐 Extra:
 - [x] Criar tela de login e registro.

 - [x] Armazenar JWT no localStorage ou sessionStorage.

- [x]  Proteger rotas com AuthGuard.

# Melhorias Futuras
- [ ] Integrar MongoDB para armazenar observações, anexos ou logs de histórico das tarefas.
- [ ] Integrar Swagger para Documentar o Backend
- [ ] Deploy da aplicação no Render + Vercel