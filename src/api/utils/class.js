var Class = {
  extends: function( obj ) {
    var parent = this, klass, key, superMethods = {};
    klass = function() {
      this.init.apply( this, arguments );
    };

    klass.prototype.init = function() {};

    for ( key in parent.prototype ) {
      klass.prototype[ key ] = parent.prototype[ key ];
    }
    for ( key in obj ) {
      if ( obj.hasOwnProperty( key ) ) {
        if ( typeof obj[ key ] === "function" ) {
          superMethods[ key ] = !parent[ key ] ? function() {} : typeof parent[ key ] !== "function" ? function() {} : parent[ key ];
          klass.prototype[ key ] = obj[ key ];
        } else {
          klass[ key ] = obj[ key ];
        }
      }
    }

    klass.extends = this.extends;
    klass.prototype._super = function() {
      console.trace();
      var name = this._super.caller.name;
      superMethods[ name ].apply( this, arguments );
    };
    return klass;
  }
};

module.exports = Class;
