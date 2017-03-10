var utils = require( "../utils/utils.js" ),
    Class = require( "../utils/class.js" ).Class,
    Route;

Route = Class.extends( {
  init: function() {},
  get: function( resource, request ) {},
  post: function( resource, request ) {},
  put: function( resource, request ) {},
  delete: function( resource, request ) {},
  route: function( resource, request ) {
    return this[ request.method.toLowerCase() ]( this._resource( resource ) );
  },
  _resource: function( resource ) {
    return utils.trim( resource, "/" ).split( "/" ).slice( 1 ).join( "/" );
  }
} );

module.exports.Route = Route;
