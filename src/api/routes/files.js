var utils = require( "../utils/utils.js" ),
    Route = require( "./route.js" ),
    fs = require( "mz/fs" ),
    Files, Directory

Files = Route.extends( {
  init: function( path ) {
    this.path = utils.trim( path, "/" );
  },
  get: function( resource, request ) {
    dir = new Directory( this.path );
    return dir.get( this.nextResource( resource ), request );
  }
} );

Directory = Route.extends( {
  init: function( path ) {
    this.path = path;
  },
  get: function( resource, request ) {
    var that = this;
    return this._getPathInfo( resource )
    .then( function( stat ) {
      if ( stat.isFile() ) {
        return that._getFile( resource );
      } else if ( stat.isDirectory() ) {
        return that._readdir( resource );
      }
      return that._404();
    } )
    .catch( function ( err ) {
      return that._404( err );
    } );
  },
  _getPathInfo: function( path ) {
    return fs.stat( this.path + "/" + path );
  },
  _getFile: function( path ) {
    return fs.readFile( this.path + "/" + path )
    .then( function( file ) {
      return Promise.resolve( {
        status: 200,
        headers: {
          "content-type": "text/html; charset=UTF-8"
        },
        body: file.toString()
      } );
    } );
  },
  _readdir: function( dir ) {
    return fs.readdir( this.path + "/" + dir )
    .then( function( dirInfo ) {
      console.log( dirInfo )
      return Promise.resolve( {
        status: 200,
        headers: {
          "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify( dirInfo )
      } );
    } );
  }
} );

module.exports = Files;
