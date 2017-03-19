( function( root ) {

  <uploader>
    <input ref="uploadFile" type="file" onchange={ onChange }></input>

    this.onChange = function() {
      var data = new FormData();
      data.append( "file", this.refs.uploadFile.files[ 0 ] );

      $.ajax( {
        url: "/files",
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
      } );
    };
  </uploader>

} )( window );
