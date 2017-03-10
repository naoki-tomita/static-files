var http = require( "http" ),
    Server;

Server = function( port, address ) {
  this.port = port;
  this.address = address;
  this.server = new http.Server();
};
Server.prototype.open = function() {
  this.server.listen( 80, "0.0.0.0" );
};
