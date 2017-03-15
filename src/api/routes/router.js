var utils = require( "../utils/utils.js" ),
    router;

router = {
  init: function( resources ) {
    this.resources = resources;
  },
  route: function( request, response ) {
    this.resource( request ).then( function( result ) {
      response.statusCode = result.status;
      response = this.setHeaders( response, result.headers );
      response.end( result.body );
    } )
    .catch( function( e ) {
      response.statusCode = 500;
      response.end( "" );
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
