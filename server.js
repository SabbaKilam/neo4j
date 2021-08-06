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
let loggedInMembers = new Array();
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
    const isLoginRequest = url.split('/')[1].toLowerCase() == 'login';
    const parameters = {
      req,
      res,
      url,
      method,
      mimeType,
      loggedInMembers,
      isApiRequest
    }

    /////| calling REST methods |/////
    if ( isLoginRequest ){
      let username = req.headers.username;
      let password = req.headers.password;
      console.log( `username: ${username}, password:${password}` );      
      try{        
        login( username, password, ( response ) => {
          if ( JSON.parse(response) === true ){
            url = './screens/main/main.html';
          }
          else {
            url = './screens/login/login.html';
          }       
          fs.readFile( url, ( error, content ) => {
              if ( !error ){
                  console.log(`Finished reading file: ${url}`)
                  res.writeHead( 200, {'Content-Type': mimeType });
                  res.end( content , 'utf-8');             
              }
              else {
                  res.writeHead( 404, {'Content-Type': 'text/plain'} );
                  res.end( `Trouble finding file "${url}": 404 Error.` , 'utf-8');  
              }        
          });

        });
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

