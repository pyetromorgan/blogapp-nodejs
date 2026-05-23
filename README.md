# 🚀 BlogApp - Node.js Production Application

[![Node.js Version](https://img.shields.io/badge/node-v24.15.0-green.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-v4.x-blue.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Mecanismo completo de blog dinâmico desenvolvido em Node.js com arquitetura MVC, focado em alta performance, segurança de rotas por níveis de acesso e persistência de dados em nuvem.

🔗 **Link do Projeto no Ar:** [CLIQUE AQUI PARA ACESSAR] -> (Substitua pelo link azul do Render)

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Runtime:** Node.js (v24+)
* **Framework Web:** Express.js
* **Banco de Dados:** MongoDB (ODM Mongoose)
* **Hospedagem do Banco:** MongoDB Atlas Cloud
* **Autenticação e Sessão:** Passport.js (Estratégia Local) & Express-Session
* **Segurança (Criptografia):** Bcrypt.js
* **Renderização Front-end:** Handlebars (Template Engine)
* **Estilização:** Bootstrap 5
* **Deploy Cloud:** Render

---

## 🏗️ Principais Desafios Técnicos Solucionados

### 1. Arquitetura MVC (Model-View-Controller)
O projeto foi estruturado separando estritamente a camada de dados (Mongoose Models), a interface do usuário (Handlebars Views) e a lógica de negócios (Controllers). Isso garante que o código seja altamente escalável, fácil de testar e mantenha um padrão profissional de mercado.

### 2. Autenticação Robusta e Controle de Acesso (RBAC)
Utilizando o **Passport.js**, implementei uma estratégia de autenticação local segura. 
* **Segurança de Senhas:** Nenhuma senha é salva em texto limpo; o sistema aplica hash criptográfico via **Bcrypt.js** com salt antes de persistir no banco.
* **Proteção de Rotas:** Criação de *Middlewares customizados* para interceptar requisições. Se o usuário comum tentar forçar a URL `/admin`, o sistema bloqueia o acesso e o redireciona de forma segura.

### 3. Gestão Contínua de Estados e Feedbacks (Mensagens Flash)
Integração do `connect-flash` acoplado às variáveis locais globais do Express. O sistema provê feedbacks dinâmicos instantâneos para o usuário (ex: "Senha incorreta", "Postagem criada com sucesso", "Deslogado com sucesso") sem quebras de fluxo de navegação.

### 4. Configuração Multi-ambiente para Deploy (Production-ready)
O código foi refatorado para operar de forma híbrida:
* **Em desenvolvimento:** Conecta-se automaticamente ao MongoDB local e roda na porta 8081.
* **Em produção:** Lê dinamicamente as variáveis de ambiente (`process.env.MONGO_URI` e `process.env.PORT`), ocultando credenciais sensíveis e injetando segurança de infraestrutura contra vazamento de dados no GitHub.

---

## 📁 Estrutura de Pastas Relevantes

```text
├── config/             # Configurações de autenticação (Passport) e Banco de dados
├── controllers/        # Lógica de controle e regras de negócio (MVC)
├── helpers/            # Middlewares de validação e controle de acesso
├── models/             # Esquemas de dados e regras do MongoDB (Mongoose)
├── routes/             # Endpoints da aplicação divididos por contextos
├── views/              # Telas da aplicação e componentes parciais (Handlebars)
└── app.js              # Ponto de entrada (Bootstrapper da aplicação)