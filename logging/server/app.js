// make this a capped collection to rotate logs
var Logs = new Meteor.Collection('logs');

function setupMongodb(cluster) {
  try {
    Cluster.connect( Meteor.settings.MONGO_CLUSTER );
  } catch (e) {
    console.log(e)
    console.log('going local because Meteor.settings.MONGO_CLUSTER',process.env.MONGO_CLUSTER)
    Cluster.connect( "mongodb://localhost:27017/discovery" );
  } finally {
    Cluster.register( cluster );
  }
};
setupMongodb('logging');

Meteor.methods({
  "log": function(source, message) {
    this.unblock();
    Logs.insert({ source: source, message: message, time: new Date() });
    console.log("[%s] %s", source, message);
  }
});
