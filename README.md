# User Listing App

Aplicação Angular para gerenciamento de usuários com listagem, criação, edição e validação de dados.  
O projeto utiliza arquitetura baseada em **NgRx (Store + Effects)**, Angular Material e testes com Jest.

REQUISITOS: Node.js 18+, Angular CLI e npm 9+

---

## 🚀 Stack Principal

### Frontend
- Angular 21
- Angular Material (UI Components)
- RxJS (programação reativa)
- Reactive Forms (formulários reativos)

### State Management
- NgRx Store
- NgRx Effects
- NgRx Entity
- NgRx Store DevTools

### Testes
- Jest
- jest-preset-angular
- ts-jest

### Mock de API
- JSON Server (API fake local) com o arquivo db.json
  npx json-server --watch db.json --port 3000


---

## 📦 Instalação

npm install

## Funcionalidades

Exibição em cards com:
  Nome
  E-mail
  Botão de edição
Filtro por nome com debounce de 300ms
Estado de loading durante requisições
Tratamento de erro com mensagem


Formulário reativo (Reactive Forms)
Campos obrigatórios:
  Nome
  E-mail
  CPF
  Telefone
  Tipo de telefone
Validação por campo com mensagens de erro
Botão de salvar desabilitado enquanto inválido
Modo edição com preenchimento automático do formulário

## Melhorias
Layout aprimorado com Angular Material
Paginação de usuários
Sistema de toasts (sucesso e erro)
Modo escuro / claro
Validação de formato de CPF e telefone

