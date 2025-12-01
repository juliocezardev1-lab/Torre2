# 🔧 Estratégia de Manutenção e Prevenção de Erros — Netlify

**Objetivo:** Implementar uma estratégia completa e segura para manutenção de site estático no Netlify, com páginas responsivas, redirecionamento controlado e workflow Git seguro.

---

## 📋 Sumário Executivo

Este documento centraliza a estratégia de **manutenção forçada** e **tratamento de erros** para o site Torre2 hospedado no Netlify. Inclui:

- **Páginas de manutenção e 404** — HTML5 moderno, responsivo, identidade visual compartilhada
- **Arquivo `_redirects` comentado** — ativa manutenção apenas quando descomentado (segurança)
- **Workflow Git seguro** — branch `feature/infra-manutencao` para testes sem quebrar `main`
- **Deploy Preview** — validação em URL temporária antes de produção

---

## 🗂️ Arquivos Envolvidos

### 1. **`public/maintenance.html`** ← Página de manutenção
- **Localização:** `public/maintenance.html`
- **Propósito:** Exibida quando manutenção está ativa
- **Recursos:**
  - HTML5 semântico e responsivo
  - Design moderno com gradientes e glassmorphism
  - Auto-reload a cada 30 segundos
  - Botão "Recarregar Agora"
  - Link de contato com suporte
  - Acessível (ARIA labels, focus management)

### 2. **`public/404.html`** ← Página de erro (Not Found)
- **Localização:** `public/404.html`
- **Propósito:** Servida quando página não existe
- **Recursos:**
  - Design idêntico ao `maintenance.html` (identidade visual)
  - Mensagem "404 — Página não encontrada"
  - Botão "Voltar ao Início" → `/`
  - Link para `sitemap.xml` (navegação alternativa)
  - Responsivo e acessível

### 3. **`public/_redirects`** ← Regras Netlify (comentada)
- **Localização:** `public/_redirects`
- **Status:** **COMENTADA por segurança** — não afeta produção até descomento manual
- **Regra (comentada):** `/*  /maintenance.html  503  */`
- **Efeito ao descomentar:** Todas as rotas (/*) respondem com status 503 e servem `/maintenance.html`
- **Quando ativar:** Apenas durante janela de manutenção planejada

---

## 🚀 Quick Start — Ativar Manutenção Forçada

### Cenário 1: Ativar Manutenção em Produção (main)

```bash
# 1. Abra public/_redirects
# 2. Descomente a linha:
#    /*  /maintenance.html  503  */

# 3. Commit e push
git add public/_redirects
git commit -m "ops(manutenção): ativar manutenção forçada"
git push origin main

# 4. Netlify redeploya automaticamente (alguns segundos)
# 5. Site agora responde 503 para todas as rotas → /maintenance.html

# Para DESATIVAR:
# 1. Re-comente a linha em public/_redirects
# 2. git add public/_redirects
# 3. git commit -m "ops(manutenção): desativar manutenção"
# 4. git push origin main
# 5. Netlify redeploya
```

### Cenário 2: Testar Manutenção em Deploy Preview (sem quebrar main)

```bash
# 1. Criar branch de teste
git checkout -b test/manutenção-forçada

# 2. Descomente a linha em public/_redirects

# 3. Commit e push
git add public/_redirects
git commit -m "test: simular manutenção forçada"
git push -u origin test/manutenção-forçada

# 4. Netlify cria Deploy Preview (URL temporária)
# 5. Acesse a URL e valide que:
#    - Todas as rotas respondem 503
#    - /maintenance.html aparece corretamente
#    - Auto-reload funciona

# 6. Se validado, você pode depois:
#    - Mesclar para main se precisar de verdade, OU
#    - Deletar a branch (descarta teste)
```

---

## 📊 Workflow Git Seguro

### Criar Branch de Feature (recomendado para iniciar)

```powershell
# 1. Atualizar main
git checkout main
git pull origin main

# 2. Criar branch de feature
git checkout -b feature/infra-manutencao

# 3. Adicionar arquivos (já existem em public/)
git add public/maintenance.html public/404.html public/_redirects

# 4. Commit
git commit -m "feat(infra): adicionar páginas de manutenção e arquivo _redirects (comentado)"

# 5. Push (cria branch remota + Deploy Preview)
git push -u origin feature/infra-manutencao

# 6. Acesse o Deploy Preview (link fornecido pelo Netlify no PR ou dashboard)
# 7. Valide o visual e comportamento
# 8. Se tudo OK, crie um PR ou faça merge em main
```

---

## 🌐 Netlify Deploy Preview — Como Funciona

### O que é?
Deploy Preview é uma **versão temporária do seu site** construída a partir de uma branch específica. Netlify cria automaticamente quando você faz push de uma nova branch.

### Como é criado?
1. Você faz push de `feature/infra-manutencao` para `origin`
2. Netlify detecta a nova branch (via webhook configurado no repositório)
3. Netlify inicia um build (usa `package.json`, `vite.config.js`, etc.)
4. Após build bem-sucedido, publica em URL temporária: `https://deploy--<branch-hash>--your-site.netlify.app`
5. Você recebe notificação (comentário automático no PR, dashboard Netlify, ou email)

### Vantagens
- ✅ **Testa sem afetar `main`** — produção permanece intocada
- ✅ **Validação antes de merge** — vê exatamente como ficará em produção
- ✅ **Rollback instantâneo** — deletar branch remove o Deploy Preview
- ✅ **Compartilhar com equipe** — cole o link temporário para revisão

### Ciclo de Vida
- **Criada:** quando branch é pushada
- **Ativa:** enquanto branch existir e link for acessado
- **Deletada:** quando branch é removida

---

## 🔒 Boas Práticas de Segurança

### 1. **Mantenha `_redirects` comentado por padrão**
   - Evita ativação acidental de manutenção
   - Exige ação explícita (descomentário) do desenvolvedor

### 2. **Use branch para testar manutenção forçada**
   - Crie `test/manutenção-forçada` com `_redirects` descomentado
   - Valide no Deploy Preview antes de tocar em `main`

### 3. **Coordene janelas de manutenção**
   - Comunique horário aos usuários (se aplicável)
   - Use página de manutenção para informar ETA

### 4. **Implemente alertas ou monitoring**
   - Configure notificações no Netlify para builds falhados
   - Monitore uptime durante manutenção

### 5. **Teste rollback**
   - Antes de ativar, confirme que pode desativar rapidamente
   - Tenha um procedimento claro: re-comente `_redirects` + git push

---

## 🧪 Teste Rápido (Validação)

### Validar `maintenance.html` localmente
```powershell
# Abra no navegador (arrastando o arquivo ou via http-server)
open public/maintenance.html

# Ou com servidor local
npx http-server public/ -p 8080
# Acesse http://localhost:8080/maintenance.html
```

### Validar `404.html`
```powershell
# Acessar via Deploy Preview ou servidor local
http://localhost:8080/pagina-que-nao-existe
# (Netlify servirá 404.html automaticamente)
```

### Validar Deploy Preview
```powershell
# Após git push de feature branch
# Netlify fornece URL no dashboard ou PR comment
# Acesse: https://deploy--<hash>--seu-site.netlify.app
# Confirme que tudo carrega corretamente
```

---

## 📞 Contato e Suporte

- **Email de suporte:** `suporte@exemplo.com` (configure em `maintenance.html`)
- **Documentação Netlify:** https://docs.netlify.com/routing/redirects/
- **Deploy Preview docs:** https://docs.netlify.com/site-deploys/deploy-previews/

---

## 📂 Referências Relacionadas

- `QUICK_START.md` — Início rápido geral do projeto
- `INDICE.md` — Índice centralizado de documentação
- `public/_redirects` — Arquivo de regras (comentado)
- `public/maintenance.html` — Código HTML (manutenção)
- `public/404.html` — Código HTML (erro)

---

**Versão:** 1.0  
**Última atualização:** Dez 1, 2025  
**Autor:** DevOps Team