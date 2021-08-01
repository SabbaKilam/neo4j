//https://neo4j.com/developer/javascript/
//https://neo4j.com/cloud/aura/

const http = require( 'http' );
const fs = require('fs');
require( 'dotenv' ).config();
const {
  tryNeo,
  dropAllRelationsAB,
  dropOneRelationAB,
  relateAB,
} = require('./dbController.js');

const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  txt: 'text/plain',
  ico: 'image/icon',
  png: 'image/png',
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  mp3: 'audio/mp3',
  mp4: 'video/mp4',
  json: 'application/json',   
};
const prohibitedFiles = [
  "/server.js",
  "/package.json",
  "/",    
];
let loggedIn = false;
const port = 3000;
const host = `localhost`;

http.createServer( (req, res)=>{
    ////| setting up preliminaries |////
    const method = req.method;
    let url = decodeURI(req.url);
    if ( prohibitedFiles.includes(url) ){ url = '/index.html'}
    let filename = url.split('/').reverse()[0];
    const extension = filename.split('.').reverse()[0].toLowerCase();
    const mimeType = mimeTypes[extension] || 'application/octet-stream';
    const isApiRequest = url.split('/')[1].toLowerCase() == 'api';

  if( req.url != '/favicon.ico'){
    tryNeo("Abbas");
  }
 
  console.log(`isApiRequest: ${isApiRequest}`);

  fs.readFile('./userfiles/TheFamily.jpg', (error, content) => {
    if ( !error ){
      res.writeHead( 200, {'Content-Type': 'image/jpg'});
      res.end(content);
    }
    else{
      res.writeHead( 500, {'Content-Type': 'text/html'});
      res.end(`<center><h1>Trouble getting info from server</h1></center>`);
    }
  });
})
.listen( port, host, () => {
  console.log( `server running at http://${host}:${port}` )
});

