var Class = {
  extends: function( obj ) {
    var parent = this, klass, key, superMethods = {};
    klass = function() {
      this.init.apply( this, arguments );
    };

    if ( !obj.init ) {
      klass.prototype.init = function() {};
    }

    parent.prototype = parent.prototype || {};

    for ( key in parent.prototype ) {
      klass.prototype[ key ] = parent.prototype[ key ];
    }

    for ( key in obj ) {
      if ( obj.hasOwnProperty( key ) ) {
        if ( typeof obj[ key ] === "function" ) {
          superMethods[ key ] = !parent.prototype[ key ] ? function() {} : typeof parent.prototype[ key ] !== "function" ? function() {} : parent.prototype[ key ];
          klass.prototype[ key ] = obj[ key ];
        } else {
          klass[ key ] = obj[ key ];
        }
      }
    }

    klass.extends = this.extends;
    klass.prototype._super = function() {
      var name = this._super.caller.name;
      superMethods[ name ].apply( this, arguments );
    };
    return klass;
  }
};

module.exports = Class;
