# 🚢 Sea Frontend - Teste de Desenvolvimento

Este projeto foi desenvolvido como parte do processo seletivo para a **Sea Tecnologia**, demonstrando habilidades em desenvolvimento frontend com tecnologias modernas.

## 📋 Sobre o Projeto

**Sea Frontend** é um portal web que implementa um sistema de formulário multi-etapas para gestão de funcionários, demonstrando:

- **Formulário Multi-etapas**: Sistema de cadastro de funcionários com validação e navegação entre etapas
- **Gestão de Estado**: Implementação robusta com Redux Toolkit
- **Validação de Formulários**: Uso do Formik com Yup para validação
- **Interface Moderna**: Design responsivo e intuitivo
- **Arquitetura Escalável**: Estrutura modular e reutilizável

## 🛠️ Tecnologias Utilizadas

### Core
- **Next.js 15.5.2** - Framework React com App Router
- **React 19.1.0** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Tipagem estática para JavaScript

### Gerenciamento de Estado
- **Redux Toolkit 2.8.2** - Gerenciamento de estado global
- **React Redux 9.2.0** - Integração React-Redux

### Formulários e Validação
- **Formik 2.4.6** - Gerenciamento de formulários
- **Yup 1.7.0** - Validação de esquemas

### UI e Componentes
- **Ant Design 5.27.1** - Biblioteca de componentes
- **CSS Modules** - Estilização modular
- **Ícones customizados** - Sistema de ícones próprio

### Desenvolvimento
- **ESLint** - Linting de código
- **JSON Server** - API mock para desenvolvimento
- **Turbopack** - Bundler rápido para desenvolvimento

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd sea-frontend

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Executando o Projeto
```bash
# Desenvolvimento (com servidor mock)
npm run dev

# Build de produção
npm run build

# Executar em produção
npm run start
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── base/           # Componentes base (Navbar, Modal)
│   └── employee/       # Componentes específicos de funcionários
│       ├── form/       # Formulário multi-etapas
│       ├── list/       # Listagem de funcionários
│       └── steps/      # Navegação entre etapas
├── redux/              # Gerenciamento de estado
│   ├── slices/         # Slices do Redux Toolkit
│   └── store.ts        # Configuração da store
├── hooks/              # Hooks customizados
├── types/              # Definições de tipos TypeScript
└── api/                # Cliente HTTP e configurações
```

## 🎯 Funcionalidades Implementadas

### ✅ Formulário Multi-etapas
- Cadastro de funcionários com validação
- Navegação entre etapas com progresso visual
- Validação em tempo real com Formik + Yup
- Upload de arquivos e seleção de opções

### ✅ Gestão de Funcionários
- Listagem com paginação
- Visualização detalhada
- Edição de informações
- Sistema de busca e filtros

### ✅ Interface Responsiva
- Design adaptável para diferentes dispositivos
- Componentes reutilizáveis
- Sistema de navegação intuitivo

## 🔧 Configurações

### ESLint
Configurado com regras específicas para Next.js e TypeScript.

### TypeScript
Configuração estrita para garantir qualidade do código.

### JSON Server
Servidor mock rodando na porta 3001 para simular API REST.

## 📝 Scripts Disponíveis

- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Build de produção
- `npm run start` - Executar em produção
- `npm run lint` - Verificar qualidade do código

## 🎨 Padrões de Desenvolvimento

- **Componentes Funcionais** com hooks React
- **CSS Modules** para estilização isolada
- **TypeScript** para tipagem estática
- **Redux Toolkit** para gerenciamento de estado
- **Formik + Yup** para formulários e validação
- **Componentes Ant Design** para UI consistente

## 🚀 Próximos Passos

O projeto está estruturado para fácil extensão com:
- Novas funcionalidades de gestão
- Integração com APIs reais
- Sistema de autenticação
- Dashboard administrativo
- Relatórios e análises

## 📞 Contato

Este projeto foi desenvolvido como teste técnico para a **Sea Tecnologia**.

---

**Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento frontend moderno.**
