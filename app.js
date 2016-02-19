var config = require('./src/config.json');

var growMonitoring = require('./src/index.js');
var growDashboard = require('./src/dashboard.js');

console.log('Initializing Magrathea');

growMonitoring.init(config);
growDashboard.init(config);