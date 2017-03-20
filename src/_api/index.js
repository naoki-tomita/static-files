var Server = require( "./server.js" ),
    router = require( "./routes/router.js" ),
    Files = require( "./routes/files.js" ),
    server, files, app;

files = new Files( "./apps" );
app = new Files( "./src/app" );
router.init( {
  files: files,
  app: app
} );

server = new Server( 80 );
debugger;
server.open()
.on( "request", function( request, response ) {
  router.route( request, response );
} );
