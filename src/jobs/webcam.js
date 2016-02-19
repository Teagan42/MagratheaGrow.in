var twitter = require('../services/twitter.js');
var request = require('request');
var fs = require('fs');
var logger = require('../services/logger.js');

var config;

var buildUrl = function (ip, uri, session) {
    return 'http://' + ip + uri.replace('{SESSION}', session);
};

var download = function (uri, filename, callback) {
    request.get(uri)
        .on('error', function (error) {
            console.log(error);
            fs.unlinkSync(filename);
        })
        .pipe(fs.createWriteStream(filename)).on('close', callback);
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

        console.log('WEBCAM', 'CAMERA', cameraId);

        download(buildUrl(camera.ip, camera.uri, login(camera)), getImageStore(camera), function () {
            var imageStore = getImageStore(camera);

            if (fs.access(imageStore, fs.F_OK, function (error) {
                console.log(error);
                if (error) {
                    logger.error(error);
                } else {
                    var data = fs.readFileSync(imageStore);
                    twitter.tweet(camera.displayName, data);
                    fs.unlinkSync(imageStore);
                }
            }));
        });
    }
};

exports.init = init;
exports.run = run;