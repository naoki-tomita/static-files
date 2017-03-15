var utils = require( "../utils/utils.js" ),
    router;

router = {
  init: function( resources ) {
    this.resources = resources;
  },
  route: function( request, response ) {
    var that = this;
    this.resource( request ).then( function( result ) {
      response.statusCode = result.status;
      response = that.setHeaders( response, result.headers );
      response.end( JSON.stringify( result.body ) );
    } )
    .catch( function( e ) {
      response.statusCode = 500;
      response.end( e );
    } );
  },
  resource: function( request ) {
    var resource = utils.trim( request.url, "/" );
    return this.resources[ resource.split( "/" )[ 0 ] ].route( request );
  },
  setHeaders: function( response, headers ) {
    var key;
    for ( key in headers ) {
      response.setHeader( key, headers[ key ] );
    }
    return response;
  }
};

module.exports = router;
