// make this a capped collection to rotate logs
var Logs = new Meteor.Collection('logs');

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
setupMongodb('logging');

Meteor.methods({
  "log": function(source, message) {
    this.unblock();
    Logs.insert({ source: source, message: message, time: new Date() });
    console.log("[%s] %s", source, message);
  }
});
