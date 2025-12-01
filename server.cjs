const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const PUBLIC_DIR = '/workspaces/codespaces-react/public';

// --- MODO MANUTENÇÃO ---
// Descomente a linha abaixo para ativar a manutenção
// (Redireciona tudo /* para manutencao.html com código 503)

// MAINTENANCE_MODE = false; // #MANUTENÇÃO_DESCOMENTE: altere para true para ativar

// Para ativar: altere false para true
// Para desativar: altere true para false

const MAINTENANCE_MODE = true; // REMOVA O '#' acima desta linha para desabilitar esta variável e ativar a manutenção

const server = http.createServer((req, res) => {
    // VERIFICAR MODO MANUTENÇÃO
    if (MAINTENANCE_MODE && req.url !== '/manutencao.html') {
        // Redirecionar para página de manutenção com código 503
        fs.readFile(path.join(process.cwd(), 'manutencao.html'), (err, data) => {
            res.writeHead(503, {
                'Content-Type': 'text/html; charset=utf-8',
                'Retry-After': '3600',
                'Access-Control-Allow-Origin': '*'
            });
            if (!err) {
                res.end(data);
            } else {
                res.end('<h1>503 - Serviço Indisponível</h1><p>O sistema está em manutenção.</p>');
            }
        });
        return;
    }

    // Se for raiz, preferir a página `torre.html` (workspace root ou public),
    // caso contrário, servir o caminho solicitado dentro de PUBLIC_DIR.
    let filePath;
    if (req.url === '/' || req.url === '') {
        const rootTorre = path.join(process.cwd(), 'torre.html');
        const publicTorre = path.join(PUBLIC_DIR, 'torre.html');
        const defaultControl = path.join(PUBLIC_DIR, 'control.html');

        if (fs.existsSync(rootTorre)) {
            filePath = rootTorre;
        } else if (fs.existsSync(publicTorre)) {
            filePath = publicTorre;
        } else {
            filePath = defaultControl;
        }
    } else {
        // normalizar e servir do public
        filePath = path.join(PUBLIC_DIR, decodeURIComponent(req.url.replace(/^\//, '')));
    }

    // Segurança: prevenir path traversal — garantir que arquivos fora de PUBLIC_DIR
    // só sejam servidos se for explicitamente o arquivo `torre.html` no root.
    const allowedRoot = path.join(process.cwd(), 'torre.html');
    if (!filePath.startsWith(PUBLIC_DIR) && filePath !== allowedRoot) {
        filePath = path.join(PUBLIC_DIR, 'control.html');
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end('<h1>404 - Arquivo não encontrado</h1>');
            return;
        }

        const ext = path.extname(filePath);
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon'
        };

        res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'max-age=3600'
        });
        res.end(data);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Servidor rodando em http://localhost:${PORT}`);
    console.log(`✓ Para acessar na rede: use a porta forwarding do VS Code`);
    if (MAINTENANCE_MODE) {
        console.log(`⚠ MODO MANUTENÇÃO ATIVO - Todas as requisições redirecionadas para manutencao.html`);
    }
});
