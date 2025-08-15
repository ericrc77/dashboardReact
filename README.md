# Dashboard de Dados Públicos - React

Dashboard moderno desenvolvido em React (TypeScript + Vite + Tailwind) para visualização exploratória de indicadores públicos brasileiros.

![Status](https://img.shields.io/badge/status-active-success) ![Build](https://img.shields.io/badge/build-vite-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Tecnologias

- **React 18.2.0** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool rápida e moderna
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Roteamento para SPA
- **Chart.js** - Biblioteca para gráficos interativos
- **Lucide React** - Ícones modernos

## 📦 Instalação

1. Certifique-se de ter o Node.js instalado (versão 16 ou superior)
2. Clone o repositório
3. Instale as dependências:

```bash
npm install
```

## 🛠️ Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 🏗️ Build

Para criar uma build de produção:

```bash
npm run build
```

## 📱 Recursos

- **Design Responsivo**: Interface adaptada para desktop, tablet e mobile
- **Menu Mobile**: Menu hambúrguer com layout em duas colunas
- **Ticker de Dados**: Scroll infinito com dados de moedas atualizados
- **Gráficos Interativos**: Visualizações com Chart.js
- **Tema Dark**: Interface moderna com paleta de cores escuras
- **Toggle de Tema**: Alternância Dark / Light persistida em localStorage
- **Navegação SPA**: Roteamento sem recarregamento da página
 - **Fallback 404**: Suporte a refresh direto em rotas no GitHub Pages

## 📊 Páginas

- **Dashboard**: Visão geral com gráficos principais
- **População**: Dados demográficos
- **Economia**: Indicadores econômicos
- **Educação**: Estatísticas educacionais
- **Saúde**: Dados de saúde pública
- **Segurança**: Informações de segurança
- **Infraestrutura**: Dados de infraestrutura urbana
- **Energia**: Informações energéticas
- **Mobilidade**: Dados de transporte
- **Meio Ambiente**: Indicadores ambientais

## 🎨 Design System

O projeto utiliza uma paleta de cores personalizada baseada em tons escuros:

- **Primary**: Azul (#3B82F6)
- **Dark**: Escala de cinzas escuros
- **Background**: Gradientes suaves
- **Cards**: Efeito glassmorphism

## ✅ Roadmap / Melhorias Futuras

- [ ] Integração com APIs reais (IBGE, BACEN, DATASUS)
- [ ] Internacionalização (i18n)
- [ ] Testes automatizados (unit + e2e)
- [ ] Exportação CSV/PDF
- [ ] Modo acessibilidade (alto contraste / fonte maior)
- [ ] Lazy loading de gráficos pesados

## 👨‍💻 Autor

Eric Campos

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.
