var http = require( "http" ),
    router = require( "./routes/router.js" ),
    Files = require( "./routes/files.js" );

var files = new Files( "./apps" );
router.init( {
  files: files
} );

server = new http.Server();
server.listen( 80, "0.0.0.0" );
server.on( "request", function( request, response ) {
  router.route( request, response );
} );
