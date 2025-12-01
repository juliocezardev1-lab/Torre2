# 🔧 MANUTENÇÃO - MÉTODO ÚNICO E EFICIENTE

## 🎯 Como Usar

### ✅ Para ATIVAR a Manutenção

1. Abra o arquivo `server.cjs`
2. Localize a linha:
   ```javascript
   const MAINTENANCE_MODE = false;
   ```
3. Altere para:
   ```javascript
   const MAINTENANCE_MODE = true;
   ```
4. Reinicie o servidor:
   ```bash
   node server.cjs
   ```

### ✅ Para DESATIVAR a Manutenção

1. Abra o arquivo `server.cjs`
2. Altere:
   ```javascript
   const MAINTENANCE_MODE = true;
   ```
   Para:
   ```javascript
   const MAINTENANCE_MODE = false;
   ```
3. Reinicie o servidor

---

## 📋 O Que Acontece

Quando `MAINTENANCE_MODE = true`:

- ✅ Todos os acessos ao site redirecionam para `manutencao.html`
- ✅ HTTP Status Code: **503 (Service Unavailable)**
- ✅ Header `Retry-After: 3600` é enviado
- ✅ Página mostra spinner + mensagem amigável
- ✅ Auto-reconexão a cada 5 segundos
- ✅ Recarrega automaticamente quando voltando online
- ✅ Console mostra aviso de manutenção ativa

---

## 🛠️ Personalização

Para alterar a mensagem de manutenção:

1. Abra `manutencao.html`
2. Edite o texto em:
   ```html
   <p class="text-gray-400 mb-8 max-w-md px-4">
       Sua nova mensagem aqui...
   </p>
   ```
3. Salve e reinicie o servidor

---

## ⚡ Vantagens do Método Único

| Aspecto | Vantagem |
|---------|----------|
| **Eficiência** | Uma única variável controla tudo |
| **Confiabilidade** | Intercepta no servidor (seguro) |
| **Compatibilidade** | Funciona em qualquer servidor Node.js |
| **Performance** | Sem processamento de redirect desnecessário |
| **Debug** | Logs claros no console do servidor |

---

## 📊 Resumo

```
ANTES (3 métodos)
├── server.cjs ✗
├── manutencao.html ✗
└── public/_redirects ✗

AGORA (1 método - EFICIENTE)
└── server.cjs ✓ (ÚNICO)
```

---

## ⚠️ Checklist

- [ ] Arquivo `server.cjs` atualizado
- [ ] Variável `MAINTENANCE_MODE` clara e visível
- [ ] Servidor reiniciado após mudança
- [ ] Página `manutencao.html` existe
- [ ] Teste de reconexão funcionando
- [ ] Console do servidor mostra mensagem correta

