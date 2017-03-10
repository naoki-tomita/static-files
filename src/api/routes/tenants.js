var utils = require( "../utils/utils.js" ),
    Route = require( "./route.js" ).Route,
    Tenants, Tenant;

Tenants = Route.extends( {
  init: function( tenants ) {
    this.tenants = tenants;
  },
  get: function( resource, request ) {
    console.log( resource );
    return this._id( resource );
  },
  _id: function( resource ) {
    return this._resource( resource ).split( "/" )[ 0 ];
  }
} );

module.exports = {
  Tenants: Tenants,
  Tenant: Tenant
};
