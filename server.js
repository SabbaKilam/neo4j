const http = require('http');
const fs = require('fs');

const port = 3000;
const host = 'localhost';

const mimeTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    txt: 'text/plain',
    ico: 'image/icon',
    png: 'image/png',
    jpg: 'image/jpg',
    json: 'application/json',   
};

const prohibitedFiles = [
    "/server.js",
    "/package.json",
    "/",
    
];

const server = http.createServer( serverResponse );
server.listen( port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});

///////| functions |///////
function serverResponse( req, res ){
    ////| setting up preliminaries |////
    const method = req.method;
    let url = decodeURI(req.url);
    if ( prohibitedFiles.includes(url) ){ url = '/index.html'}
    let filename = url.split('/').reverse()[0];
    filename = decodeURI( filename );
    const extension = filename.split('.').reverse()[0].toLowerCase();
    const mimeType = mimeTypes[extension] || 'application/octet-stream';
    const loadFile = filename == 'filelist';

    /////| calling REST functions |/////
    if ( method == 'GET' && loadFile ) {
        getFilelist( req, res )
    }
    else if ( method == 'GET' && !loadFile ) {
        getFile( url, mimeType, res )
    } else {
        res.writeHead( 200, {'Content-Type': 'text/html'});
        res.write("<center><h2>Bad or Malformed Request</h2></center>");
        res.end();
    }
}

//////| helper functions |//////

function getFile( url, mimeType, res ){   
    fs.readFile( "." + url, ( error, content ) => {
        if ( !error ){
            res.writeHead( 200, {'Content-Type': mimeType });
            res.end( content , 'utf-8');             
        }
        else {
            res.writeHead( 404, {'Content-Type': 'text/plain'} );
            res.end( `Trouble finding file "${url}": 404 Error.` , 'utf-8');  
        }        
    });
}
