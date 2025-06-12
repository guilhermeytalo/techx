✅ 1. Tarefas Separadas (To-Do List do Projeto)
Infraestrutura e Configuração
 - [x] Inicializar repositório Git com .gitignore adequado.

 - [x] Criar pasta frontend com Angular (ng new frontend).

 - [x] Criar pasta backend com Node.js + TypeScript.

 - [x] Configurar Docker para backend e banco MySQL.

 - [x] Configurar o banco de dados MySQL (tabela de tarefas).

 - [x] Configurar ORM (Ex: Prisma ou TypeORM) no backend.

 - [x] Criar .env para configs sensíveis.

Backend - API RESTful com Node.js + TypeScript
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
 - [ ] Implementar autenticação com JWT.

 - [ ] Criar User model.

 - [ ] Criar rotas de login, register, auth middleware.

 - [ ] Associar tarefas a usuários.

📦 Extra:
 - [ ] Integrar MongoDB para armazenar observações, anexos ou logs de histórico das tarefas.

Frontend - Angular
 - [ ] Criar componente de listagem de tarefas (task-list).

 - [ ] Criar componente de formulário para adicionar/editar tarefas (task-form).

 - [ ] Criar serviço Angular para consumir API do backend.

 - [ ] Exibir todas as tarefas na home.

 - [ ] Permitir criar, editar, remover, marcar como concluída.

 - [ ] Estilizar a interface com CSS ou biblioteca como Angular Material.

🔐 Extra:
 - [ ] Criar tela de login e registro.

 - [ ] Armazenar JWT no localStorage ou sessionStorage.

- [ ]  Proteger rotas com AuthGuard.

# Comamndos para rodar 
docker compose up --build
## enquanto o docker estiver iniciado rodar
docker compose exec backend npx prisma db push