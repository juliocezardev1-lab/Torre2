# 🚀 COMO ATUALIZAR NODE.JS

## ✅ Verificar Versão Atual

Abra PowerShell e execute:

```powershell
node --version
npm --version
```

Você verá algo como:
```
v18.15.0
9.5.0
```

---

## 📥 MÉTODO 1: Atualizar via NVM (Recomendado)

### Windows - Usar NVM for Windows

1. **Baixar NVM for Windows**
   ```
   https://github.com/coreybutler/nvm-windows/releases
   ```
   Download: `nvm-setup.exe`

2. **Instalar NVM**
   - Execute o arquivo `.exe`
   - Siga os passos
   - Reinicie o PowerShell/CMD

3. **Listar versões disponíveis**
   ```powershell
   nvm list available
   ```

4. **Instalar a versão mais recente**
   ```powershell
   nvm install latest
   ```
   Ou versão específica:
   ```powershell
   nvm install 20.10.0
   ```

5. **Ativar versão**
   ```powershell
   nvm use 20.10.0
   ```

6. **Verificar**
   ```powershell
   node --version
   npm --version
   ```

---

## 📥 MÉTODO 2: Atualizar via nodejs.org (Direto)

### Windows

1. **Acesse**: https://nodejs.org/
2. **Download** a versão LTS (Recomendada)
3. **Execute** o instalador `.msi`
4. **Instale** normalmente (não mude pasta padrão)
5. **Reinicie** PowerShell/CMD
6. **Verificar**:
   ```powershell
   node --version
   ```

---

## 📥 MÉTODO 3: Atualizar via Chocolatey

Se já tem Chocolatey instalado:

```powershell
choco upgrade nodejs
```

Ou instalar:
```powershell
choco install nodejs
```

---

## 🔧 Atualizar NPM Separadamente

Se quer versão mais nova de npm que o Node.js instala:

```powershell
npm install -g npm@latest
```

Ou versão específica:
```powershell
npm install -g npm@10.2.0
```

---

## ✅ Validar Instalação

Depois de atualizar, execute:

```powershell
node --version
npm --version
npm list -g --depth=0
```

Deve mostrar:
- ✅ Node.js versão >= 18.0
- ✅ npm versão >= 9.0

---

## 🆘 Se Houver Problemas

### Limpar cache NPM
```powershell
npm cache clean --force
```

### Reinstalar dependências do projeto
```powershell
cd c:\Users\Julio\OneDrive\Área de Trabalho\Projetos\Torre2
npm install
```

### Verificar problemas
```powershell
npm audit
npm audit fix
```

### Reset completo (se necessário)
```powershell
# Remover pasta node_modules
Remove-Item -Recurse -Force node_modules

# Remover package-lock.json
Remove-Item package-lock.json

# Reinstalar
npm install
```

---

## 📊 Comparação de Versões

| Versão | Data | Status | Recomendação |
|--------|------|--------|--------------|
| 18.x | 2022 | LTS até 2025 | ✅ OK |
| 20.x | 2023 | **LTS até 2026** | ✅ **RECOMENDADO** |
| 22.x | 2024 | LTS até 2027 | ✅ **MELHOR** |
| 23.x | 2024 | Atual | ⚠️ Instável |

**Recomendação**: Versão **20.x** ou **22.x** (ambas são LTS estáveis)

---

## 🎯 Para Este Projeto

Sua aplicação funciona com:
- ✅ Node.js 18+
- ✅ npm 9+

**Versão ideal**: **Node.js 20.x** (LTS estável)

---

## 📝 Pós-Atualização

Depois de atualizar:

1. **Reinicie VS Code**
2. **Abra terminal novo** no VS Code
3. **Execute seu servidor**:
   ```powershell
   node server.cjs
   ```

Pronto! 🎉

