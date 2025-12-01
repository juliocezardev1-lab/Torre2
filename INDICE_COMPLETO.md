# 📚 Índice Centralizado — Torre2 Project

Navegação e organização de toda documentação técnica do projeto.

---

## 🏗️ Estrutura do Projeto

```
Torre2/
├── src/                          # Código-fonte (React + Vite)
├── public/                       # Arquivos estáticos (deploy root)
│   ├── maintenance.html          # ← Página de manutenção
│   ├── 404.html                  # ← Página de erro (Not Found)
│   ├── _redirects                # ← Regras Netlify (comentada)
│   └── assets/                   # Bundles finais
├── Audio/                        # Arquivos de áudio
├── Imagens/                      # Arquivos de imagem
├── package.json                  # Dependências Node.js
├── vite.config.js                # Config Vite
├── server.cjs                    # Servidor Node.js (dev/build)
└── [DOCUMENTAÇÃO]                # Guias e referências
```

---

## 📖 Documentação — Por Tópico

### 🚀 **Início Rápido**
| Arquivo | Descrição |
|---------|-----------|
| **`QUICK_START.md`** | 5 minutos para começar. Setup, install, run. |
| **`SETUP.md`** | Instruções de instalação detalhadas (dependencies, env vars). |
| **`README.md`** | Overview geral do projeto. |

---

### 🔧 **Infraestrutura & DevOps**
| Arquivo | Descrição |
|---------|-----------|
| **`MANUTENCAO_NETLIFY.md`** | ← **NOVO** Estratégia completa: manutenção forçada, Deploy Preview, workflow seguro. |
| **`GUIA_ATIVAR_MANUTENCAO.md`** | ← **NOVO** Passo-a-passo: como ativar/desativar manutenção em produção + troubleshooting. |

---

### 🔌 **Integração ESP32 & Hardware**
| Arquivo | Descrição |
|---------|-----------|
| **`INTEGRACAO_ESP32.md`** | Guia: como conectar ESP32 ao site. HTTP endpoints, REST API. |
| **`ESP32_Codigo_Completo.cpp`** | Código Arduino/PlatformIO para ESP32. LED strip control, WiFi. |
| **`ESP32_Integracao_JavaScript.js`** | Código JS para `index.html`. Botões, eventos, requisições ESP32. |
| **`GUIA_HARDWARE_ESP32.md`** | Wiring, pinagem, assembly, testes. |
| **`INSTALACAO_PASSO_A_PASSO.md`** | Step-by-step: ESP32 setup, firmware, teste end-to-end. |

---

### 📋 **Referência Rápida & Cheatsheets**
| Arquivo | Descrição |
|---------|-----------|
| **`REFERENCIA_RAPIDA.md`** | Cheatsheet: comandos Git, npm, Vite, ESP32. |
| **`TORRE_EIFFEL_INFO.md`** | Fatos sobre a Torre Eiffel (contexto projeto). |

---

### 📝 **Sumários & Resumos**
| Arquivo | Descrição |
|---------|-----------|
| **`RESUMO_EXECUTIVO.md`** | Alto nível: objetivo, escopo, arquitetura, próximos passos. |
| **`NOTA_FINAL.md`** | Conclusões, lições, recomendações finais. |
| **`MAPA_MENTAL.md`** | Visualização de conceitos e dependências (ASCII/Markdown). |
| **`VISUAL_ENTREGA.md`** | Checklist visual: o que foi entregue, status, links. |
| **`ENTREGA.md`** | Resumo da entrega final: arquivos, estrutura, validação. |

---

## 🎯 Quick Navigation

### Quero…
| Tarefa | Veja |
|--------|------|
| …começar rapidamente | **`QUICK_START.md`** |
| …ativar manutenção agora | **`GUIA_ATIVAR_MANUTENCAO.md`** → Seção "Ativar Manutenção Forçada" |
| …entender Deploy Preview | **`MANUTENCAO_NETLIFY.md`** → Seção "Netlify Deploy Preview" |
| …conectar ESP32 ao site | **`INTEGRACAO_ESP32.md`** |
| …encontrar comando de terminal | **`REFERENCIA_RAPIDA.md`** |
| …ver o que foi entregue | **`VISUAL_ENTREGA.md`** ou **`ENTREGA.md`** |

---

## 📦 Arquivos de Deploy (public/)

Quando o site é deployado no Netlify, os arquivos em `public/` se tornam a raiz do servidor:

| Arquivo | URL | Propósito |
|---------|-----|----------|
| `public/index.html` | `/` | Página inicial (se não houver Vite rewrite) |
| `public/maintenance.html` | `/maintenance.html` | Servida quando regra 503 está ativa |
| `public/404.html` | (automático) | Servida para rotas inexistentes |
| `public/_redirects` | (não acessível) | Regras de roteamento Netlify |

---

## 🔐 Git Workflow Seguro

```
main (produção)
│
├─ feature/infra-manutencao (testes de manutenção)
│  ├─ Deploy Preview automático
│  └─ Validar antes de mesclar
│
└─ test/manutenção-teste (testar desativação)
   └─ Deploy Preview + deletar após teste
```

**Ver detalhes:** `MANUTENCAO_NETLIFY.md` → "Workflow Git Seguro"

---

## 🚀 Deploy & Publicação

1. **Build local:** `npm run build` (gera `dist/`)
2. **Push para main:** `git push origin main`
3. **Netlify redeploya automaticamente** (webhook)
4. **Site ao vivo:** `https://seu-dominio.com`

---

## 🆘 Suporte & Troubleshooting

| Problema | Veja |
|----------|------|
| Deploy Preview não criada | `MANUTENCAO_NETLIFY.md` → "Deploy Preview" |
| Manutenção não ativa | `GUIA_ATIVAR_MANUTENCAO.md` → "Troubleshooting" |
| ESP32 não conecta | `INSTALACAO_PASSO_A_PASSO.md` → "Debug" |
| Comando Git não funciona | `REFERENCIA_RAPIDA.md` |

---

## 📞 Referências Externas

- **Netlify Docs:** https://docs.netlify.com/
- **Redirects:** https://docs.netlify.com/routing/redirects/
- **Deploy Preview:** https://docs.netlify.com/site-deploys/deploy-previews/
- **Vite:** https://vitejs.dev/
- **React:** https://react.dev/
- **Arduino/ESP32:** https://docs.espressif.com/projects/arduino-esp32/

---

## 📋 Checklist de Arquivos Críticos

- [x] `public/maintenance.html` — Página de manutenção
- [x] `public/404.html` — Página de erro
- [x] `public/_redirects` — Regras Netlify
- [x] `MANUTENCAO_NETLIFY.md` — Documentação estratégia
- [x] `GUIA_ATIVAR_MANUTENCAO.md` — Procedimentos operacionais
- [x] `package.json` — Dependências
- [x] `vite.config.js` — Config build
- [x] `netlify.toml` — (opcional) Config Netlify avançada

---

## 🔄 Atualizações & Versionamento

| Data | Versão | Mudanças |
|------|--------|----------|
| Dez 1, 2025 | 1.0 | Documentação completa de manutenção, Deploy Preview, workflow Git |
| — | — | (futuro) |

---

**Mantido por:** DevOps Team  
**Última atualização:** Dez 1, 2025