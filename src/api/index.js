var Server = require( "./server.js" ),
    router = require( "./routes/router.js" ),
    Files = require( "./routes/files.js" ),
    server;

var files = new Files( "./apps" );
router.init( {
  files: files
} );

server = new Server( 80 );
server.open()
.on( "request", function( request, response ) {
  router.route( request, response );
} );
