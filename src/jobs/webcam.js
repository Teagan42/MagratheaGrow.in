var twitter = require('../services/twitter.js');
var request = require('request');
var fs = require('fs');
var logger = require('../services/logger.js');

var config;

var buildUrl = function (ip, uri, session) {
    return 'http://' + ip + uri.replace('{SESSION}', session);
};

var download = function (uri, filename, callback) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};

var getImageStore = function (camera) {
    return 'tmp/camera' + camera.ip + '.png';
};

var login = function (camera) {
    var session = camera.session;

    if (!session) {
        // TODO Login
    }

    return session;
};

var init = function (cfg) {
    config = cfg || {};

    twitter.init(config.services.twitter);
    logger.init(config);
};

var run = function () {
    if (!config) {
        console.log('WEBCAM', 'No configuration present');
        return;
    }

    for (var cameraId in config.cameras) {
        var camera = config.cameras[cameraId];

        console.log('WEBCAM', 'camera', camera);
        download(buildUrl(camera.ip, camera.uri, login(camera)), getImageStore(camera), function () {
            var data = fs.readFileSync(getImageStore(camera));
            twitter.tweet(camera.displayName, data);
        });
    }
};

exports.init = init;
exports.run = run;