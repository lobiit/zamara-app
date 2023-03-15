const http = require('http');
const https = require('https');

const proxy = http.createServer((req, res) => {
    const options = {
        hostname: 'mail.smtpbucket.com',
        path: req.url,
        method: req.method,
        headers: {
            ...req.headers,
            host: 'mail.smtpbucket.com',
            origin: 'https://api.smtpbucket.com',
        },
    };

    const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });

    req.pipe(proxyReq);
});

proxy.listen(3000);
