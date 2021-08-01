const fs = require('fs');
const {
    tryNeo,
    dropAllRelationsAB,
    dropOneRelationAB,
    relateAB,
    getAllMembers
  } = require('./dbMethods.js');

module.exports = {
    /**
     * 
     * @param {object} url 
     * @param {string} mimeType 
     * @param {object} res 
     * @param {boolean} loggedIn 
     */
    getFile( url, mimeType, res, loggedIn ){
        if ( url == './index.html' && ! loggedIn ){
            url = './screens/login/index.html';
        }
        if ( url == './index.html' && loggedIn ){
            url = './screens/main/main.html';
        }        
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
    /** */    
    executeApi( req, res, apiStringArray ){
        console.log(apiStringArray)
        res.writeHead( 200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(apiStringArray));
    },
};