const fs = require('fs');
const {
    tryNeo,
    dropAllRelationsAB,
    dropOneRelationAB,
    relateAB,
  } = require('./dbController.js');

module.exports = {
    getFile( url, mimeType, res ){   
        fs.readFile( url, ( error, content ) => {
            if ( !error ){
                res.writeHead( 200, {'Content-Type': mimeType });
                res.end( content , 'utf-8');             
            }
            else {
                res.writeHead( 404, {'Content-Type': 'text/plain'} );
                res.end( `Trouble finding file "${url}": 404 Error.` , 'utf-8');  
            }        
        });
    },
    executeApi( req, res, apiStringArray ){
        console.log(apiStringArray)
        res.writeHead( 200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(apiStringArray));
    },
};