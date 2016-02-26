var twitter = require('../services/twitter.js');
var request = require('request');
var fs = require('fs');
var logger = require('../services/logger.js');

var config;

var buildUrl = function (ip, uri, session) {
    return 'http://' + ip + uri.replace('{SESSION}', session);
};

var download = function (camera) {
    var promise = new Promise(function (resolve, reject) {
        var c = camera;
        request.get(buildUrl(c.ip, c.uri, login(c)))
            .on('error', function (error) {
                console.log('WEBCAM', 'download', 'error', error);
                fs.unlinkSync(getImageStore(c));
            })
            .pipe(fs.createWriteStream(getImageStore(c))).on('close', function () {
                resolve(c)
            });
    });

    return promise;
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

        download(camera)
            .then(function (cam) {
                var imageStore = getImageStore(cam);

                if (fs.access(imageStore, fs.F_OK, function (error) {
                    if (error) {
                        logger.error(error);
                    } else {
                        try {
                            var data = fs.readFileSync(imageStore);
                            twitter.tweet(cam.displayName, data);
                        } catch (er) {
                            console.log('WEBCAM', 'ERROR', er);
                        } finally {
                            fs.unlinkSync(imageStore);
                        }
                    }
                }));
            });
    }
};

exports.init = init;
exports.run = run;