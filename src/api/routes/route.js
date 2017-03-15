var utils = require( "../utils/utils.js" ),
    Class = require( "../utils/class.js" ),
    Route;

Route = Class.extends( {
  init: function() {},
  route: function( request ) {
    return this[ request.method.toLowerCase() ]( request.url, request );
  },
  get: function( resource, request ) { return this._404(); },
  post: function( resource, request ) { return this._404(); },
  put: function( resource, request ) { return this._404(); },
  delete: function( resource, request ) { return this._404(); },
  _404: function() {
    return Promise.resolve( { status: 404 } );
  },
  resource: function( resource, i ) {
    i = i || 0;
    return utils.trim( resource, "/" ).split( "/" )[ i ];
  },
  nextResource: function( resource ) {
    return utils.trim( resource, "/" ).split( "/" ).splice( 0, 1 ).join( "/" );
  }
} );

module.exports = Route;
