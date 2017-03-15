var utils = require( "../utils/utils.js" ),
    Route = require( "./route.js" ),
    fs = require( "mz/fs" ),
    Files, Directory, File;

Files = Route.extends( {
  init: function( path ) {
    this.path = path;
  },
  get: function( resource, request ) {
    var that = this;
    if ( that.resource( resource, 1 ) ) {
      dir = new Directory( that.path + "/" + that.resource( request, 1 ) );
    } else {
      dir = new Directory( that.path );
    }

    return dir.get( that.nextResource( request ), request );
  },
  post: function( resource, request ) {

  }
} );

Directory = Route.extends( {
  init: function( path ) {
    this.path = path;
  },
  get: function( request ) {

  },
  _getFile: function( request ) {

  },
  _readdir: function() {
    return fs.readdir( this.path )
    .then( function() {
      return new Promise( function( resolve ) {} );
    } );
  }
} );

Files = Route.extends( {
  init: function( path ) {
    this.path = path;
  },
  get: function( request ) {

  }
} );
