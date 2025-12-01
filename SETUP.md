# SETUP E INSTALAÇÃO - Torre Eiffel 3D

## Pré-requisitos

- Node.js v16+ instalado
- npm ou yarn
- Git

## Instalação Local

### 1. Clone o repositório

```bash
git clone https://github.com/juliocezardev1-lab/Torre_Eifel_Updates.git
cd Torre_Eifel_Updates
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm start
```

O servidor será executado em `http://localhost:3000`

## Estrutura de Arquivos

- `index.html` — Página principal com Torre 3D interativa
- `tower.html` — Versão alternativa simples
- `torre.html` — Versão em português (sem efeitos expandidos)
- `control.html` — Painel de controle (compatível com ESP32)
- `Audio/Audio.mp3` — Música ambiente em loop
- `Imagens/favcon.png` — Favicon do projeto
- `public/` — Arquivos estáticos (React build)
- `src/` — Código React (opcional)

## Efeitos Disponíveis

### Básicos
- **Fixa** — Cor sólida
- **Rainbow** — Transição de cores
- **Fogo** — Efeito de fogo com flickering

### Rítmicos
- **Heartbeat** — Pulso do coração
- **Pisca** — Estroboscópio
- **Disco** — Cores aleatórias rápidas

### Ambiente
- **Fade** — Respiração suave
- **Trovão** — Flash de relâmpago
- **SOS** — Sinal Morse

### Temáticos
- **França** — Cores da bandeira francesa
- **Brasil** — Cores da bandeira brasileira
- **Aurora** — Aurora boreal verde/roxa
- **Natal** — Verde/Vermelho
- **Halloween** — Laranja/Roxo
- **Sunset** — Pôr do sol quente
- **Gelo** — Azul gelo/Branco
- **Polícia** — Vermelho/Azul piscante
- **Candy** — Cores doces pastel

## Controles

- **Picker de Cores** — Selecione cores personalizadas no center
- **Grid de Efeitos** — Clique para ativar efeitos
- **Botão de Áudio** (🔊) — No canto inferior direito
- **Arrow Toggle** — Recolha/expanda a UI com as setas

## Build para Produção

```bash
npm run build
```

Isso criará uma versão otimizada em `dist/`

## Deploy

### Via Vercel

```bash
npm install -g vercel
vercel
```

### Via GitHub Pages

Configure no `vite.config.js`:
```js
export default {
  base: '/Torre_Eifel_Updates/',
  // ...
}
```

## Troubleshooting

### Áudio não toca
- Verifique se `Audio/Audio.mp3` existe
- Alguns navegadores bloqueiam autoplay — clique na página ou no botão 🔊

### Favicon não aparece
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique se `Imagens/favcon.png` existe

### Torre não renderiza
- Verifique se Three.js está carregado (F12 > Console)
- Tente em outro navegador

## Suporte

Para bugs ou dúvidas, abra uma issue em:
https://github.com/juliocezardev1-lab/Torre_Eifel_Updates/issues

---

Desenvolvido com ❤️ e 🚀
