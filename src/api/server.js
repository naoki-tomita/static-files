var http = require( "http" ),
    PubSub = require( "./utils/pubsub.js" ),
    Server;

Server = PubSub.extends( {
  init: function( port, address ) {
    this._super();
    this.port = port;
    this.address = address;
    this.server = new http.Server();
    this.initializeEvents();
  },
  open: function() {
    this.server.listen( this.port, this.address );
    return this;
  },
  initializeEvents: function() {
    var that = this;
    this.server.on( "request", function() {
      that.trigger( "request", arguments );
    } );
  }
} );

module.exports = Server;
