
Meteor.publish('topPackages', function() {
  var options = {sort: {isoScore: -1}, limit: 20};
  return Packages.find({}, options);
});
// connecting to the logging service

function setupMongodb(cluster) {

  var mongoURL = Meteor.settings.MONGO_CLUSTER2;//todos
  if ( typeof ( mongoURL ) !== 'undefined' ) {
    Cluster.connect( mongoURL );
  } else {
    console.log('going local because Meteor.settings.MONGO_CLUSTER',process.env.MONGO_CLUSTER)
    Cluster.connect( "mongodb://localhost:27017/discovery" );
  }
  Cluster.register( cluster );
}
setupMongodb('web');

var logConn = Cluster.discoverConnection("logging"); 
// connecting to the search service
var searchConn = Cluster.discoverConnection("search");

SearchSource.defineSource('packages', function(searchText, options) {
  // we don't need to wait for completing the log method call
  // that's why we defer it's execution and run in the next event loop
  Meteor.defer(function() {
    logConn.call('log', 'main-app', "searching for: " + searchText);
  });

  var searchResult = searchConn.call("getPackages", searchText, options);
  return searchResult;
});
