var prismic = require('./prismic-helpers');
var Configuration = require('./prismic-configuration').Configuration;

var accessToken = Configuration.accessToken;
prismic.getApiHome( accessToken, function( err, Api ) {
  
  if ( err ) {
    throw err;
  }

  var ref = Api.master();
  var ctx = {
    api: Api,
    ref: ref,
    maybeRef: ref == Api.master() ? undefined : ref,

    oauth: function() {
      var token = accessToken;
      return {
        accessToken: token,
        hasPrivilegedAccess: !!token
      }
    },

    linkResolver: function(ctx, doc) {
      return Configuration.linkResolver(ctx, doc);
    }
  };

  var id = "VDR5xSsAACkAhHLy";
  var slug = "madison-kitchen";
  prismic.getDocument( ctx, id, slug, 
    function( err, doc ) {
      if ( err ) {
        throw err;
      }
      console.log( JSON.stringify( doc, null, 2 ));
    },
    function( doc ) {
      console.log( "response: new slug" );
    },
    function( NOT_FOUND ) {
      console.log( "response: not found" );
    }
  );
});
