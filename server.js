//https://neo4j.com/developer/javascript/
//https://neo4j.com/cloud/aura/

const http = require( 'http' );
const fs = require('fs');
require( 'dotenv' ).config();

const {
  getFile,
  executeApi
} = require('./app_modules/restMethods');

const {
  login,
  logout,
  getFamilyGraphic,
} = require('./app_modules/helperMethods');

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

const server = http.createServer( (req, res) => {
    ////| setting up preliminaries |////
    const method = req.method;
    let url = `.${decodeURI(req.url)}`;
    if ( prohibitedFiles.includes(url) ){ url = './index.html'}
    if ( url == './main.html' && !loggedIn){ url = './index.html'}
    let filename = url.split('/').reverse()[0];
    const extension = filename.split('.').reverse()[0].toLowerCase();
    const mimeType = mimeTypes[extension] || 'application/octet-stream';
    const isApiRequest = url.split('/')[1].toLowerCase() == 'api';

    /////| calling REST functions |/////
    console.log(url.split('/'))
    if ( method == 'GET' && !isApiRequest ) {
      getFile( url, mimeType, res, loggedIn )
    }
    else if ( method == 'GET' && isApiRequest ) {
      // make apiStringArra...
      //removing '.' and 'api' from the array
      apiStringArray = url.split('/').splice(2);
      executeApi( req, res, apiStringArray )
    }
    else {
      getFamilyGraphic( req, res );
    }
});

server.listen( port, host, () => {
  console.log( `server running at http://${host}:${port}` )
});

