Cluster.connect("mongodb://localhost:27017/discovery");
Cluster.register("main");
var logConn = Cluster.discoverConnection('logging');
var searchConn = Cluster.discoverConnection('search');
Meteor.publish('topPackages', function() {
  var options = {sort: {isoScore: -1}, limit: 20};
  return Packages.find({}, options);
});

SearchSource.defineSource('packages', function(searchText, options) {
  // we don't need to wait for completing the log method call
  // that's why we defer it's execution and run in the next event loop
  Meteor.defer(function() {
    logConn.call('log', 'main-app', "searching for: " + searchText);
  });

  var searchResult = searchConn.call("getPackages", searchText, options);
  return searchResult;
});
