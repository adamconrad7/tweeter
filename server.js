/*
 * Write your server code in this file.
 *
 * name: Adam Conrad
 * email: conraada@oregonstate.edu
 */

// Initializing node modules:
var http = require('http');
var fs = require('fs');
var path = require('path');

// Initializing port to be either set variable or 3001:
const PORT = process.env.PORT || 3001;

// Initializing cache:
var cache = {};

// Request handeler:
http.createServer( function(req,res){
    console.log('Got a request');

    // Specyfing paths to publis folder:
    var filePath =  'public/' + req.url;
    if( req.url == '/'){
      // If root is requested, serve index.html
      filePath += 'index.html';
    }

    // Mapping content type ti file extension:
    var extension = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html':  'text/html',
        '.js':    'application/javascript',
        '.css':   'text/css',
    }
    var contentType = mimeTypes[extension];

    // Check if file is cached and read from cache:
    if( cache[filePath] !== undefined){
      res.statusCode = 200;
      res.write(cache[filePath]);
      console.log("==== Retriving from cache:", filePath);
      return res.end();
    }

    fs.readFile(filePath, function(error, content){
    console.log('== reading file:', filePath);
      //Handle errors:
      if(error){
         if(error.code == 'ENOENT') {
                    filePath = 'public/404.html';
                    fs.readFile(filePath, function(error, content) {
                    res.writeHead(404);
                    res.end(content, 'utf-8');
                });
            }
            else {
                res.writeHead(500);
                res.end('Sorry, an error occorred: '+error.code+' ..\n');
                res.end();
            }
      // Serve and cache file:
      }else{
        console.log("=== Caching new file: ", filePath);
        cache[filePath] = content;
        res.statusCode = 200;
        res.writeHead(200,  'Content-Type: contentType');
        res.end(content, 'utf-8');
      }
    })

}).listen(PORT, function () {
  console.log("== Server is listening on port:", PORT);
});
