var Tenants = require( "./routes/tenants.js" ).Tenants;

var tenant = new Tenants();
tenant.route( "/hoge/fuga", { method: "get" } );

// server = new http.Server();
// server.listen( 80, "0.0.0.0" );
// server.on( "request", function( request ) {
//   console.log( request.url );
//   console.log( request.method );
//   console.log( request.headers );
// } );
