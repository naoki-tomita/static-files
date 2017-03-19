var utils = require( "../utils/utils.js" ),
    Route = require( "./route.js" ),
    fs = require( "mz/fs" ),
    Files, Directory

Files = Route.extends( {
  init: function( path ) {
    this._super();
    this.path = utils.trim( path, "/" );
    this.dir = new Directory( this.path );
  },
  get: function( resource, request ) {
    return this.dir.get( this.nextResource( resource ), request );
  },
  post: function( resource, request ) {
    return this.dir.post( this.nextResource( resource ), request );
  }
} );

Directory = Route.extends( {
  init: function( path ) {
    this._super();
    this.path = path;
  },
  post: function( resource, request ) {
    // ファイルアップロードの仕様 http://www.javadrive.jp/servlet/fileupload_tutorial/index2.html
    var that = this;
    return new Promise( function( resolve ) {
      request.on( "data", function( data ) {
        fs.writeFile( that.nextResource( resource ), data );
      } );
      request.on( "end", function() {
        resolve( { status: 200 } );
      } );
    } );
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
