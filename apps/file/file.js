( function( root ) {
  var ko = root.ko,
      $ = root.$,
      app;

  app = root.app = {
    init: function() {
      vm = {
        path: [],
        koFiles: ko.observable(),
        koDig: function( name ) {
          vm.dig( name );
        },
        koUp: function() {
          vm.up();
        },
        dig: function( name ) {
          this.path.push( name );
          this.fetch();
        },
        up: function() {
          this.path.pop();
          this.fetch();
        },
        fetch: function() {
          $.get( "/files/" + this.path.join( "/" ) )
          .then( function( files ) {
            vm.koFiles( files );
          } );
        }
      };
      vm.fetch();
      ko.applyBindings( vm );
    }
  };
} )( window );
