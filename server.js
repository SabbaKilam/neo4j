//https://neo4j.com/developer/javascript/
//https://neo4j.com/cloud/aura/

const http = require( 'http' );
const fs = require('fs');
require( 'dotenv' ).config();

const port = 3000;
const host = `localhost`;

const uri = process.env.DB_URI;
const user = process.env.DB_USER;
const password = process.env.DB_PSWD;

const neo4j = require( 'neo4j-driver' )
const auth = neo4j.auth.basic( user, password )
const conn = neo4j.driver( uri, auth )

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
    console.log( `server running at http://${host}:${port}` )
});

tryNeo();

async function tryNeo(){
    const session = conn.session()
    const personName = 'Nancy'
    
    try {
      const result = await session.run(
        'MERGE (a:Person {name: $name}) RETURN a',
        { name: personName }
      )
    
      const singleRecord = result.records[0]
      const node = singleRecord.get(0)
    
      console.log(node.properties.name)
    } finally {
      await session.close()
    }
    
    // on application exit:
    await conn.close()
}

<<<<<<< HEAD

=======
// adding test string
>>>>>>> c0c967ed406e04c96fc92404df434f9bbdd9af75
