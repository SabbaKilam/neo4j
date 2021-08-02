const fs = require('fs');
const {
    tryNeo,
    dropAllRelationsAB,
    dropOneRelationAB,
    relateAB,
    getMember,
    getAllMembers
  } = require('./dbMethods.js');

module.exports = {
    /**
     * @param {object} url 
     * @param {string} mimeType 
     * @param {object} res 
     * @param {boolean} loggedIn 
     */
    getFile( {req, res, url, method, mimeType,loggedIn, isApiRequest} ){
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
    executeApi({req, res, url, method, mimeType,loggedIn, isApiRequest}){
        const apiStringArray = url.split('/').splice(2);
        console.log(apiStringArray)
        const dbMethodsArray = [         
            'dropAllRelationsAB',
            'dropOneRelationAB',
            'relateAB',
            'getMember',
            'getAllMembers'
        ];
        if (false){}
        else if (false) {}
        else if (false) {}
        else if (false) {}
        else if (false) {}
        else{
            res.writeHead( 200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(apiStringArray));
        } 
    },
};