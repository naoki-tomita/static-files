var express = require( "express" ),
    fs = require( "mz/fs" ),
    app, server;

app = express();

server = app.listen( 3000, function() {
  console.log( "server started. with port:" + server.address().port );
} );

app.get( "/files/:filePath", function( req, res, next ) {
  console.log( req.params.filePath );
  fs.readFile( req.params.filePath )
  .then( function( data ) {
    res.statusCode = 200;
    res.end( data );
  } );
} );
