var ds18b20 = require('../services/ds18b20.js');
var logger = require('../services/logger.js');
var _ = require('lodash');

var config;

var init = function (cfg) {
    config = cfg || {};

    logger.init(config);
};

var run = function () {
    if (!config) {
        console.log('MONITOR', 'No configuration present');
        return;
    }

    config.sensors.forEach(function (sensor) {
        if (sensor.type == 'temperature') {
            ds18b20.read(sensor)
                .then(function (result) {
                    logger.log('MONITOR\tREADING\t' + result.sensor.displayName + '\t' + result.reading.F + '°F');

                    if (result.sensor.allowedRange) {
                        if (result.reading.F < result.sensor.allowedRange.low || result.reading.F > result.sensor.allowedRange.high) {
                            logger.warn(result.sensor.displayName + ' is out of allowed range: ' + result.reading.F + '°F');
                        }
                    }
                })
                .catch(function (error) {
                    logger.error('MONITOR\tERROR\t' + error);
                });
        }
    });
};

exports.init = init;
exports.run = run;