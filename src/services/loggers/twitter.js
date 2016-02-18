var twitter = require('../twitter.js');

var config;

var init = function (cfg) {
    config = cfg || { };

    twitter.init(config.services.twitter);
};

var warn = function (message) {
    twitter.tweet(message);
};

exports.init = init;
exports.warn = warn;