var config = require('./config.json');
var crontab = require('node-crontab');


function init(config) {
    config.jobs.forEach(function (jobConfig) {
        var job = require('./jobs/' + jobConfig.name + '.js');

        if (job.init) job.init(config);

        var jobId = crontab.scheduleJob(jobConfig.schedule, job.run);
        console.log('CronJob Scheduled', jobConfig.name, jobId);
    });
}

module.exports.init = init;