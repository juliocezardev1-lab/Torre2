# 🔧 GUIA DE MANUTENÇÃO - TORRE EIFFEL

## Como Ativar o Modo de Manutenção

### **Opção 1: No Servidor Local (server.cjs)**

1. Abra o arquivo `server.cjs`
2. Localize a linha:
   ```javascript
   const MAINTENANCE_MODE = false;
   ```
3. Para **ATIVAR** a manutenção:
   ```javascript
   const MAINTENANCE_MODE = true;
   ```
4. Para **DESATIVAR** a manutenção:
   ```javascript
   const MAINTENANCE_MODE = false;
   ```
5. Reinicie o servidor

### **Opção 2: No Netlify (_redirects)**

1. Abra o arquivo `public/_redirects`
2. Localize a linha comentada:
   ```
   # /manutencao.html 503!
   ```
3. Para **ATIVAR** a manutenção (remova o `#`):
   ```
   /manutencao.html 503!
   ```
4. Para **DESATIVAR** a manutenção (adicione o `#` de volta):
   ```
   # /manutencao.html 503!
   ```
5. Commite e faça push para o repositório

### **Opção 3: Na Página de Manutenção (manutencao.html)**

1. Abra o arquivo `manutencao.html`
2. Localize a linha:
   ```javascript
   const MAINTENANCE_MODE = false;
   ```
3. Siga as mesmas instruções acima

---

## 📋 O que Acontece Quando Manutenção está Ativa

- ✅ Código HTTP **503 (Service Unavailable)** é retornado
- ✅ Todos os acessos são redirecionados para a página de manutenção
- ✅ A página de manutenção tenta reconectar a cada 5 segundos
- ✅ Quando o sistema voltar online, a página recarrega automaticamente
- ✅ Cabeçalho `Retry-After: 3600` é enviado (espera 1 hora)

---

## 🛠️ Personalizar Mensagem de Manutenção

Para alterar a mensagem exibida durante a manutenção:

1. Abra `manutencao.html`
2. Edite o texto dentro da tag `<p class="text-gray-400">`
3. Salve o arquivo

---

## ✨ Funcionalidades

- **Auto-reconexão**: A página tenta conectar a cada 5 segundos
- **Feedback Visual**: Spinner animado + mensagem de status
- **Código HTTP Correto**: Retorna 503 para buscadores e clientes
- **Compatível**: Funciona com servidor local e Netlify

---

## 📝 Resumo Rápido

| Ação | Arquivo | Mudança |
|------|---------|---------|
| Ativar no servidor | `server.cjs` | Mude `false` para `true` |
| Ativar no Netlify | `public/_redirects` | Remova `#` |
| Ativar na página | `manutencao.html` | Mude `false` para `true` |

**Lembre-se**: Sempre reinicie o servidor após fazer alterações!
