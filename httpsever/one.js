var http = require('http');
http.createServer(function(req,res) {
    res.writeHead(200,{'Content-type':'text/plain'});
    res.write('hello world hhh');
    res.end();
}).listen(8888)
console.log('start victory');
