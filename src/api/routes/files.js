var utils = require( "../utils/utils.js" ),
    Route = require( "./route.js" ),
    fs = require( "mz/fs" ),
    Files, Directory, File;

Files = Route.extends( {
  init: function( path ) {
    this.path = utils.trim( path, "/" );
  },
  get: function( resource, request ) {
    if ( this.resource( resource, 1 ) ) {
      dir = new Directory( this.path + "/" + this.resource( resource, 1 ) );
    } else {
      dir = new Directory( this.path );
    }

    return dir.get( this.nextResource( resource ), request );
  }
} );

Directory = Route.extends( {
  init: function( path ) {
    this.path = path;
  },
  get: function( resource, request ) {
    if ( this.resource( resource, 1 ) ) {
      return this._readdir();
    } else {
      return this._readdir();
    }
  },
  _getFile: function( request ) {

  },
  _readdir: function() {
    return fs.readdir( this.path )
    .then( function( dir ) {
      return new Promise( function( resolve ) {
        resolve( {
          status: 200,
          body: dir
        } );
      } );
    } );
  }
} );

File = Route.extends( {
  init: function( path ) {
    this.path = path;
  },
  get: function( request ) {

  }
} );

module.exports = Files;
