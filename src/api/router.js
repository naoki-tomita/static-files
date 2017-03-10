var utils = require( "./utils/utils.js" ),
    Router;

Router = function( routes ) {
  this.routes = routes;
};

Router.prototype.addRoute = function( key, routes ) {
  this.routes[ key ] = routes;
};

Router.prototype.route = function( request ) {
  var resource = this._resource( request.url );
  return this.routes[ resource.split( "/" )[ 0 ] ]( resource, request );
};

Router.prototype._resource = function(  ) {
  return utils.trim( resource, "/" ).split( "/" ).slice( 1 ).join( "/" );
};

module.exports.Router = Router;
