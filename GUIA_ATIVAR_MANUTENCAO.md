# 🎯 Guia Prático — Ativar/Desativar Manutenção Forçada

Um guia rápido, passo-a-passo, para ativar e desativar manutenção forçada no seu site Netlify.

---

## ✅ Ativar Manutenção Forçada (Produção)

### Passo 1: Comunicar (se aplicável)
Avise usuários sobre a janela de manutenção via:
- Email
- Redes sociais
- Banner no site (opcional)

### Passo 2: Abrir arquivo `_redirects`
```
Caminho: c:\Users\Julio\OneDrive\Área de Trabalho\Projetos\Torre2\public\_redirects
```

### Passo 3: Encontrar a linha comentada
Procure por:
```
# /*  /maintenance.html  503  */
```

### Passo 4: Descomente (remova o `#` e espaço)
De:
```
# /*  /maintenance.html  503  */
```

Para:
```
/*  /maintenance.html  503  */
```

### Passo 5: Commit e Push
```powershell
cd "c:\Users\Julio\OneDrive\Área de Trabalho\Projetos\Torre2"

git add public/_redirects

git commit -m "ops(manutenção): ativar manutenção forçada"

git push origin main
```

### Passo 6: Confirmar Deploy
- Acesse o **Netlify Dashboard** → seu site
- Aguarde o build terminar (alguns segundos)
- Quando "Published" aparecer, manutenção está ativa ✅

### Passo 7: Testar
Abra seu site em incógnito/nova aba:
```
https://seu-dominio.com
```
Você deve ver:
- Status 503 (Service Unavailable)
- Página de manutenção com mensagem "Estamos em Manutenção. Voltamos em breve."
- Botão "Recarregar Agora"
- Auto-reload a cada 30 segundos

---

## ❌ Desativar Manutenção Forçada

### Passo 1: Após conclusão da manutenção
Quando as alterações/atualizações estiverem prontas.

### Passo 2: Abrir arquivo `_redirects`
```
Caminho: c:\Users\Julio\OneDrive\Área de Trabalho\Projetos\Torre2\public\_redirects
```

### Passo 3: Encontrar a linha descomentada
```
/*  /maintenance.html  503  */
```

### Passo 4: Recomente (adicione `# ` no início)
De:
```
/*  /maintenance.html  503  */
```

Para:
```
# /*  /maintenance.html  503  */
```

### Passo 5: Commit e Push
```powershell
cd "c:\Users\Julio\OneDrive\Área de Trabalho\Projetos\Torre2"

git add public/_redirects

git commit -m "ops(manutenção): desativar manutenção"

git push origin main
```

### Passo 6: Confirmar Deploy
- Acesse o **Netlify Dashboard**
- Aguarde "Published"
- Manutenção está desativada ✅

### Passo 7: Testar Acesso Normal
Abra seu site:
```
https://seu-dominio.com
```
Você deve ver:
- Status 200 (OK)
- Site funcionando normalmente
- Nenhum redirecionamento para `/maintenance.html`

---

## 🧪 Testar em Deploy Preview (Recomendado Antes de Produção)

Permite validar manutenção sem afetar produção.

### Passo 1: Criar branch de teste
```powershell
cd "c:\Users\Julio\OneDrive\Área de Trabalho\Projetos\Torre2"

git checkout -b test/manutenção-teste
```

### Passo 2: Descomente `_redirects` (mesma forma acima)
```
/*  /maintenance.html  503  */
```

### Passo 3: Commit e Push
```powershell
git add public/_redirects

git commit -m "test: simular manutenção forçada para validação"

git push -u origin test/manutenção-teste
```

### Passo 4: Acessar Deploy Preview
- Vá para **Netlify Dashboard** → site
- Procure pela branch `test/manutenção-teste` em "Deploys"
- Clique em "Preview" ou copie a URL: `https://deploy--<hash>--seu-site.netlify.app`

### Passo 5: Validar
- Veja que manutenção funciona
- Confirme visual, auto-reload, botões
- Verifique status 503 (abrir DevTools → Network)

### Passo 6: Limpar (deletar branch de teste)
```powershell
# Se OK, delete a branch de teste (não mesclar)
git checkout main

git branch -D test/manutenção-teste

git push origin --delete test/manutenção-teste
```

---

## ⚡ Atalhos e Dicas

### Comando rápido (uma linha) para ativar
```powershell
# (se você conhece sed ou similar para Windows PowerShell)
# Ou use um script de automação — veja abaixo
```

### Script PowerShell Automático (opcional)
Crie um arquivo `ATIVAR_MANUTENCAO.ps1`:

```powershell
# ATIVAR_MANUTENCAO.ps1

param(
    [ValidateSet("ativar", "desativar")]
    [string]$acao = "ativar"
)

$arquivo = "public\_redirects"
$linhaComentada = "# /*  /maintenance.html  503  */"
$linhaDescomentada = "/*  /maintenance.html  503  */"

if ($acao -eq "ativar") {
    (Get-Content $arquivo) -replace [regex]::Escape($linhaComentada), $linhaDescomentada | Set-Content $arquivo
    Write-Host "✅ Manutenção ATIVADA em $arquivo"
    git add $arquivo
    git commit -m "ops(manutenção): ativar"
    git push origin main
    Write-Host "✅ Pushed to main. Netlify está redeploya…"
} elseif ($acao -eq "desativar") {
    (Get-Content $arquivo) -replace [regex]::Escape($linhaDescomentada), $linhaComentada | Set-Content $arquivo
    Write-Host "✅ Manutenção DESATIVADA em $arquivo"
    git add $arquivo
    git commit -m "ops(manutenção): desativar"
    git push origin main
    Write-Host "✅ Pushed to main. Netlify está redeploya…"
}
```

**Usar:**
```powershell
# Ativar
.\ATIVAR_MANUTENCAO.ps1 -acao ativar

# Desativar
.\ATIVAR_MANUTENCAO.ps1 -acao desativar
```

---

## 🚨 Troubleshooting

| Problema | Solução |
|----------|---------|
| Manutenção ativa, mas `maintenance.html` não aparece | Verifique que arquivo existe em `public/maintenance.html`. Veja Netlify build logs. |
| Desativar manutenção, mas site ainda mostra 503 | Cache do navegador. Abra incógnito ou limpe cache. Se persistir, verifique build status no Netlify. |
| Deploy Preview não criada após push | Verifique conexão Netlify ↔ repositório. Vá a Netlify → Site settings → Build & deploy → GitHub (reconecte se necessário). |
| Erro no Netlify build | Verifique sintaxe de `_redirects`. Use ferramenta de validação Netlify: https://docs.netlify.com/routing/redirects/ |

---

## 📋 Checklist Pré-Manutenção

- [ ] Comunicar janela de manutenção aos usuários
- [ ] Testar em Deploy Preview (branch `test/manutenção-*`)
- [ ] Validar que `maintenance.html` exibe corretamente
- [ ] Confirmar auto-reload funciona (30s)
- [ ] Testar status 503 em DevTools
- [ ] Backup/snapshot do site em produção (se aplicável)
- [ ] Desativar alertas automáticos de uptime (opcional, evita falsos positivos)

---

## 📋 Checklist Pós-Manutenção

- [ ] Desativar manutenção (recomente `_redirects`)
- [ ] Confirmar site retornou ao status 200 (OK)
- [ ] Testar funcionalidade crítica do site
- [ ] Reativar alertas de uptime
- [ ] Comunicar conclusão aos usuários
- [ ] Documentar o que foi feito (notas internas)

---

**Última atualização:** Dez 1, 2025