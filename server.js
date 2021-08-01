//https://neo4j.com/developer/javascript/
//https://neo4j.com/cloud/aura/

const http = require( 'http' );
const fs = require('fs');
require( 'dotenv' ).config();

const {
  getFile,
  executeApi
} = require('./app_modules/restMethods');

const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  ico: 'image/icon',
  png: 'image/png',
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  json: 'application/json',   
};
const prohibitedFiles = [
  "./server.js",
  "./package.json",
  "./",    
];
let loggedIn = false;
let apiStringArray = [];

const port = 3000;
const host = `localhost`;

http.createServer( (req, res)=>{
    ////| setting up preliminaries |////
    const method = req.method;
    let url = `.${decodeURI(req.url)}`;
    if ( prohibitedFiles.includes(url) ){ url = './index.html'}
    if ( url == './main.html' && !loggedIn){ url = './index.html'}
    let filename = url.split('/').reverse()[0];
    const extension = filename.split('.').reverse()[0].toLowerCase();
    const mimeType = mimeTypes[extension] || 'application/octet-stream';
    const isApiRequest = url.split('/')[1].toLowerCase() == 'api';

    /*
    if( req.url != '/favicon.ico'){
      tryNeo("Abbas");
    }
    */
    console.log(`isApiRequest: ${isApiRequest}`);
    /////| calling REST functions |/////
    console.log(url.split('/'))
    if ( method == 'GET' && !isApiRequest ) {
      getFile( url, mimeType, res )
    }
    else if ( method == 'GET' && isApiRequest ) {
      apiStringArray = url.split('/').splice(2);
      executeApi( req, res, apiStringArray )
    }
    else {
      getFamilyGraphic( req, res );
    }
})
.listen( port, host, () => {
  console.log( `server running at http://${host}:${port}` )
});

////////| helper functions |//////
function getFamilyGraphic( req, res ){
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
}