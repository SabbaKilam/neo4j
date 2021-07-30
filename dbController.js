const http = require( 'http' );
const fs = require('fs');
require( 'dotenv' ).config();

const uri = process.env.DB_URI;
const user = process.env.DB_USER;
const password = process.env.DB_PSWD;

const neo4j = require( 'neo4j-driver' )
const auth = neo4j.auth.basic( user, password )
const conn = neo4j.driver( uri, auth )

module.exports = {
    /** */
    async tryNeo(name){
        const session = conn.session()
        const personName = name
        
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
        await conn.close();
    },
    /** */
    dropRelations(source, target){}
    
}//END of module