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
      response.end( result.body );
    } )
    .catch( function( e ) {
      response.statusCode = 500;
      response.end( JSON.stringify( e ) );
    } );
  },
  resource: function( request ) {
    var resource = utils.trim( request.url, "/" ), path;
    path = this.resources[ resource.split( "/" )[ 0 ] ];
    if ( !path ) {
      console.log( request.url );
      return Promise.resolve( {
        status: 404
      } );
    }
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
