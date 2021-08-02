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

const server = http.createServer( async (req, res) => {
    ////| setting up preliminaries |////
    const method = req.method;
    let url = `.${decodeURI(req.url)}`;
    if ( prohibitedFiles.includes(url) ){ url = './index.html'}
    if ( url == './main.html' && !loggedIn){ url = './index.html'}
    let filename = url.split('/').reverse()[0];
    const extension = filename.split('.').reverse()[0].toLowerCase();
    const mimeType = mimeTypes[extension] || 'application/octet-stream';
    const isApiRequest = url.split('/')[1].toLowerCase() == 'api';
    const isLoginRequest = url.split('/')[1].toLowerCase() == 'login';
    const parameters = {
      req,
      res,
      url,
      method,
      mimeType,
      loggedIn,
      isApiRequest
    }

    /////| calling REST methods |/////
    console.log(url.split('/'))
    if ( isLoginRequest ){
      console.log( `username ${req.headers.username}`)
      console.log( `password ${req.headers.password}`)
      
      try{
        let newParams = await login( parameters ).then( r => r);

        newParams = JSON.parse(newParams);
        parameters.url = newParams["url"];    
        parameters.loggedIn = newParams["loggedIn"];
        loggedIn = newParams["loggedIn"];     
        parameters.mimeType = "text/html";
 
        getFile( parameters ) 
      }
      catch(error){
        console.log(error);
      }
    
    }
    else if ( method == 'GET' && !isApiRequest ) {
      getFile( parameters )
    }
    else if ( isApiRequest ) {
      executeApi( parameters )
    }
    else {
      getFamilyGraphic( parameters );
    }
});

server.listen( port, host, () => {
  console.log( `server running at http://${host}:${port}` )
});

