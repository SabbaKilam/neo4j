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

http.createServer((req, res)=>{

  fs.readFile('./userfiles/TheFamily.pdf', (error, content) => {
    if ( !error ){

      res.writeHead( 200, {'Content-Type': 'application/pdf'});
      res.end(content);
    }
    else{
      res.writeHead( 500, {'Content-Type': 'text/html'});
      res.end(`<center><h1>Trouble getting info from server</h1></center>`);
    }
  });
})
.listen(port, host, () => {
  tryNeo("Abbas");
  console.log( `server running at http://${host}:${port}` )
});
