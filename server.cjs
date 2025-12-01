const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const PUBLIC_DIR = '/workspaces/codespaces-react/public';

// ============================================================================
// --- MODO MANUTENÇÃO (MÉTODO ÚNICO E EFICIENTE) ---
// ============================================================================
// Para ATIVAR a manutenção: altere false para true
// Para DESATIVAR a manutenção: altere true para false
// ============================================================================
const MAINTENANCE_MODE = false;

const server = http.createServer((req, res) => {
    try {
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
    } catch(error) {
        console.error('Erro no servidor:', error);
        res.writeHead(500, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end('<h1>500 - Erro Interno do Servidor</h1>');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Servidor rodando em http://localhost:${PORT}`);
    console.log(`✓ Para acessar na rede: use a porta forwarding do VS Code`);
    if (MAINTENANCE_MODE) {
        console.log(`⚠️  MODO MANUTENÇÃO ATIVO - Todas as requisições redirecionadas para manutencao.html com status 503`);
        console.log(`   Para desativar: altere MAINTENANCE_MODE para false e reinicie o servidor`);
    }
});

