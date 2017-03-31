var http = require('http');
var fs = require('fs');

const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
};
const port = 3000;
const clientPath = './public/';

http.createServer((req, res) => {
    if (req.url === '/') {
        req.url = 'index.html';
    }

    fs.readFile( clientPath + req.url, (err, data) => {
        if (!err) {
            res.setHeader('Content-type', getMimeType(req.url));
            res.end(data);
        } else {
            console.log(req.url + ' not found');
            res.writeHead(404, 'Not found');
            res.end();
        }
    });

    function getMimeType(type) {
        return map[getExtension(type)] || map['html'];
    }

    function getExtension(string) {
        return string.substring(string.lastIndexOf('.'));
    }

}).listen(port);

console.log('Server in running on the port 3000');