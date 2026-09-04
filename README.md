# SmartStock Frontend

Interface web do SmartStock, um sistema de gerenciamento de estoque desenvolvido com React, TypeScript e Tailwind CSS.

A aplicação consome uma API REST desenvolvida em Java com Spring Boot e permite gerenciar produtos, acompanhar movimentações de estoque, visualizar produtos com estoque baixo e controlar funcionalidades de acordo com o perfil do usuário.

## 🌐 Aplicação em produção

**Frontend:**
https://smart-stock-front-end-six.vercel.app

**Backend:**
https://smartstock-api-4jx3.onrender.com

**Swagger:**
https://smartstock-api-4jx3.onrender.com/swagger-ui.html

## 🚀 Tecnologias

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Context API
* JWT Decode
* Lucide React
* Vercel

## ✨ Funcionalidades

### Autenticação

* Login com e-mail e senha
* Armazenamento do JWT
* Identificação do perfil através do token
* Proteção de rotas
* Logout
* Tratamento de token inválido ou expirado
* Diferenciação entre usuários `USER` e `ADMIN`

### Dashboard

O dashboard apresenta uma visão geral do estoque:

* Total de produtos
* Quantidade de produtos com estoque baixo
* Total de movimentações
* Movimentações recentes
* Informações resumidas do estoque

### Produtos

* Listagem paginada
* Cadastro
* Edição
* Exclusão
* Exibição de código
* Categoria
* Preço
* Quantidade atual
* Estoque mínimo

As ações administrativas são exibidas apenas para usuários com perfil `ADMIN`.

A quantidade de estoque não é alterada diretamente pela edição de um produto.

Após o cadastro inicial, toda alteração de quantidade deve ocorrer através de movimentações.

### Movimentações

* Registro de entrada de estoque
* Registro de saída de estoque
* Histórico de movimentações
* Paginação
* Data e horário
* Produto relacionado
* Quantidade
* Observação

Tipos suportados:

```text
ENTRY → Entrada
EXIT  → Saída
```

### Estoque baixo

A aplicação possui uma página específica para produtos que atingiram ou ficaram abaixo do estoque mínimo.

Regra:

```text
Quantidade atual <= Estoque mínimo
```

## 🔐 Controle de acesso

### USER

Pode:

* Visualizar produtos
* Visualizar movimentações
* Registrar movimentações
* Visualizar estoque baixo
* Acessar dashboard

### ADMIN

Possui todas as permissões de `USER` e também pode:

* Cadastrar produtos
* Editar produtos
* Excluir produtos

## 📱 Responsividade

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela.

Inclui:

* Sidebar para desktop
* Menu lateral mobile
* Tabelas com scroll horizontal
* Cards responsivos
* Botões adaptados para dispositivos menores
* Paginação responsiva

## 📂 Estrutura do projeto

```text
src/
├── components/
│   ├── MovementFormModal.tsx
│   ├── ProductFormModal.tsx
│   └── StatCard.tsx
│
├── contexts/
│   └── AuthContext.tsx
│
├── layouts/
│   └── MainLayout.tsx
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── LowStock.tsx
│   ├── Movements.tsx
│   └── Products.tsx
│
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
│
├── services/
│   ├── api.ts
│   ├── authService.ts
│   ├── movementService.ts
│   └── productService.ts
│
├── types/
│   ├── auth.ts
│   ├── jwt.ts
│   ├── movement.ts
│   ├── page.ts
│   └── product.ts
│
├── utils/
│   └── token.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

## 🏗️ Arquitetura do frontend

A aplicação é organizada separando responsabilidades entre páginas, serviços, componentes, contexto de autenticação e tipos.

```text
Página / Componente
       ↓
Service
       ↓
Axios
       ↓
SmartStock API
       ↓
PostgreSQL
```

A autenticação segue:

```text
Login
  ↓
POST /api/auth/login
  ↓
JWT
  ↓
AuthContext
  ↓
ProtectedRoute
  ↓
Aplicação
```

## 🌐 Comunicação com a API

A configuração do Axios utiliza uma variável de ambiente:

```ts
export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    'http://localhost:8080/api',
});
```

Em desenvolvimento:

```env
VITE_API_URL=http://localhost:8080/api
```

Em produção:

```env
VITE_API_URL=https://smartstock-api-4jx3.onrender.com/api
```

## 🔑 Autenticação JWT

Após o login, o backend retorna um token JWT.

O frontend utiliza as informações do token para identificar:

```text
E-mail
Perfil
Expiração
```

Exemplo de payload:

```json
{
  "sub": "usuario@email.com",
  "role": "ADMIN",
  "iat": 0,
  "exp": 0
}
```

Rotas privadas utilizam `ProtectedRoute` para impedir acesso de usuários não autenticados.

## ⚠️ Interceptor HTTP

O Axios possui interceptor para lidar com problemas de autenticação.

Quando o token deixa de ser válido, a sessão é removida e o usuário retorna ao login.

Isso evita manter uma sessão inválida ativa no frontend.

## 📑 Paginação

Produtos e movimentações utilizam paginação fornecida pelo backend.

Exemplo:

```ts
getProducts(0, 10);
```

```ts
getMovements(0, 10);
```

A resposta possui:

```ts
interface PageResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
```

## ▶️ Executando localmente

### Pré-requisitos

* Node.js
* npm
* Git
* Backend SmartStock em execução

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO_FRONTEND
```

Entre na pasta:

```bash
cd SmartStockFrontEnd
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo:

```text
.env
```

Adicione:

```env
VITE_API_URL=http://localhost:8080/api
```

Execute:

```bash
npm run dev
```

A aplicação ficará disponível normalmente em:

```text
http://localhost:5173
```

## 📦 Build

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos serão gerados em:

```text
dist/
```

## ☁️ Deploy

O frontend está hospedado na Vercel.

A arquitetura de produção é:

```text
Usuário
   ↓
Vercel
   ↓
React
   ↓
Axios
   ↓
Render
   ↓
Spring Boot
   ↓
PostgreSQL
```

A variável utilizada na Vercel é:

```env
VITE_API_URL=https://smartstock-api-4jx3.onrender.com/api
```

## 🧭 React Router na Vercel

Como a aplicação utiliza `BrowserRouter`, o projeto possui configuração para que URLs como:

```text
/login
/products
/movements
/low-stock
```

sejam redirecionadas para o `index.html`, permitindo que o React Router processe as rotas corretamente.

Exemplo de `vercel.json`:

```json
{
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ]
}
```

## 🎨 Interface

O design utiliza Tailwind CSS e segue uma interface administrativa simples, responsiva e focada em produtividade.

Principais elementos:

* Sidebar
* Dashboard
* Cards
* Tabelas
* Modais
* Paginação
* Estados de carregamento
* Mensagens de erro
* Ícones com Lucide React

## 🎯 Objetivo do projeto

O SmartStock foi criado como projeto full stack de portfólio para aplicar conceitos utilizados no desenvolvimento de sistemas reais:

* React
* TypeScript
* Consumo de APIs REST
* Autenticação JWT
* Controle de acesso
* Gerenciamento de estado
* Axios
* Rotas privadas
* Responsividade
* Integração frontend/backend
* Deploy em produção

## 🔗 Projeto completo

### Frontend


https://github.com/kleberson154/SmartStockFrontEnd


### Backend

https://github.com/kleberson154/SmartStockBackEnd

### API em produção

https://smartstock-api-4jx3.onrender.com

## 👨‍💻 Autor

**Kleberson Andrade**

GitHub:
https://github.com/kleberson154

## 📜 Licença

Projeto desenvolvido para fins de estudo e portfólio.
