//https://neo4j.com/developer/javascript/
//https://neo4j.com/cloud/aura/

const http = require( 'http' );
const fs = require('fs');
require( 'dotenv' ).config();
const {
  tryNeo,
  dropAllRelationsAB,
  dropOneRelationAB,
  relateAB
} = require('./dbController.js');

const port = 3000;
const host = `localhost`;



http.createServer( (req, res)=>{
  if( req.url != '/favicon.ico'){
    tryNeo("Abbas");
  }
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
