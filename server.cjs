const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const PUBLIC_DIR = '/workspaces/codespaces-react/public';

const server = http.createServer((req, res) => {
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
            res.writeHead(404);
            res.end('404 - Arquivo não encontrado');
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
});
