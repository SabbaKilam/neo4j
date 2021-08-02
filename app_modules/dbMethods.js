require( 'dotenv' ).config();

const uri = process.env.DB_URI;
const user = process.env.DB_USER;
const password = process.env.DB_PSWD;

const neo4j = require( 'neo4j-driver' )
const auth = neo4j.auth.basic( user, password )

module.exports = {
    /** */
    async tryNeo(name){
        const conn = neo4j.driver( uri, auth )
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
        }
        catch( dbError){
          console.error( dbError )
        }
        finally {
          await session.close()
          await conn.close()          
        }
    },
    /**
     * @param {object} source 
     * @param {object} target 
     */
    async dropAllRelationsAB(source, target){
      const conn = neo4j.driver( uri, auth )
      const session = conn.session();
      const returnValue = null;
      try{
        const result = await session.run(
          `MATCH (s:Person {email: ${source}})
          -(r)- (t:Person {email: ${target}})
          RETURN s, t`
        )
        returnValue = JSON.stringify( results.records );
        console.log( returnValue );
      }
      catch(dbError){
        console.error( dbError )
        returnValue = dbError
      }
      finally{
        await session.close()
        await conn.close()
        return returnValue       
      }
    },

    /**
     * @param {object} source 
     * @param {object} target 
     * @param {string} relationship 
     */
    dropOneRelationAB( source, target, relationship ){},   
    /**
     * @param {object} source 
     * @param {object} target 
     * @param {string} relation 
     */
    relateAB( source, target, relationship ){

    },
    getMember(){},    
    getAllMembers(){},

    
}//END of module