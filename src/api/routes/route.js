var utils = require( "../utils/utils.js" ),
    Class = require( "../utils/class.js" ),
    Route;

Route = Class.extends( {
  init: function() {},
  route: function( request ) {
    this[ request.method.toLowerCase() ]( this.nextResource( request.url ), request );
  },
  get: function( resource, request ) { return this._404(); },
  post: function( resource, request ) { return this._404(); },
  put: function( resource, request ) { return this._404(); },
  delete: function( resource, request ) { return this._404(); },
  _404: function() {
    return new Promise( function( resolve ) { resolve( { status: 404 } ) } );
  },
  resource: function( resource, i ) {
    i = i || 0;
    return utils.trim( resource, "/" ).split( "/" )[ 0 ];
  },
  nextResource: function( resource ) {
    return utils.trim( resource, "/" ).split( "/" ).splice( 0, 1 ).join( "/" );
  }
} );
