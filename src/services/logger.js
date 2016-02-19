var fs = require('fs');

var loggers = [];
var config;

var init = function (cfg) {
    if (config) { return; }

    config = cfg || { };

    fs.readdirSync('./src/services/loggers')
        .forEach(function (loggerFile) {
            var logger = require('./loggers/' + loggerFile);

            if (logger.init) { logger.init(config) };

            loggers.push(logger);
        });
};

var log = function (message) {
    loggers.forEach(function (logger) {
        if (logger.log) { logger.log(message); }
    });
};

var warn = function (message) {
    loggers.forEach(function (logger) {
        if (logger.warn) { logger.warn(message); }
    });
};

var error = function (message) {
    loggers.forEach(function (logger) {
        if (logger.error) { logger.error(message); }
    });
}

exports.init = init;
exports.log  = log;
exports.warn = warn;
exports.error = error;