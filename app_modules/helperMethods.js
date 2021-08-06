const fs = require('fs');
module.exports = {
    /** */
    login( username, password, callback ){
      let response = (username != '' && password != '') ? true : false;
      callback( JSON.stringify( response ) );
    },
    /** */
    logout(){},
    /** */
    getFamilyGraphic( {req, res} ){
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
  },


}// END of helpler module