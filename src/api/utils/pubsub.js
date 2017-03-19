var Class = require( "./class.js" ),
    PubSub;

PubSub = Class.extends( {
  init: function() {
    this.events = {};
  },
  on: function( type, func ) {
    this.events[ type ] = this.events[ type ] || [];
    this.events[ type ].push( func );
    return this;
  },
  trigger: function( type, args ) {
    var i;
    if ( !this.events[ type ] ) {
      return;
    }
    for( i in this.events[ type ] ) {
      this.events[ type ][ i ].apply( this, args );
    }
  }
} );

module.exports = PubSub;
