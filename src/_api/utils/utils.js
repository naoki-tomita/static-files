var utils = {
  trim: function( str, trimmer ) {
    if ( str.indexOf( trimmer ) === 0 ) {
      str = str.substr( trimmer.length );
    }
    if ( str.lastIndexOf( trimmer ) === str.length - trimmer.length ) {
      str = str.substr( 0, str.length - trimmer.length );
    }
    return str;
  },
  push: function( array1, array2 ) {
    var dst = array1.concat(), i, max;
    for ( i = 0, max = array2.length; i < max; i++ ) {
      dst.push( array2[ i ] );
    }
    return dst;
  },
  extend: function( src1, src2 ) {
    var dst = utils.src1, key;
    for ( key in src2 ) {
      if ( typeof obj === "object" ) {
        dst[ key ] = utils.extend( src2[ key ] );
      } else {
        dst[ key ] = src2[ key ];
      }
    }
  },
  deepCopy: function( obj ) {
    var key, dst = {};
    for ( key in obj ) {
      if ( typeof obj === "object" ) {
        dst[ key ] = utils.deepCopy( obj[ key ] );
      } else {
        dst[ key ] = obj[ key ];
      }
    }
    return dst;
  }
}

module.exports = utils;
