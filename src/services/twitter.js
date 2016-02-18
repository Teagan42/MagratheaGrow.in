var Twitter = require('twitter');

const ERROR_CODE_DUPLICATE = 187;

var config;
var client;

var init = function (cfg) {
    config = cfg || { };

    client = new Twitter({
        consumer_key: process.env[config.consumerKey],
        consumer_secret: process.env[config.consumerSecret],
        access_token_key: process.env[config.accessTokenKey],
        access_token_secret: process.env[config.accessTokenSecret]
    });
};

var uploadMedia = function (data) {
    var promise = new Promise(function (resolve, reject) {
        client.post('media/upload', { media: data }, function (error, media) {
            if (error) {
                reject(error);
            } else {
                resolve(media);
            }
        });
    });

    return promise;
};

var tweet = function (tweetText, media) {
    var promise = new Promise(function (resolve, reject) {
        (media ? uploadMedia(media) : new Promise(function (resolve) { resolve({}); }))
            .then(function (result) {
                var tweet = { status: tweetText };

                if (result.media_id_string) {
                    tweet.media_ids = result.media_id_string;
                }

                client.post('statuses/update', tweet, function (error) {
                    if (error && error[0].code != ERROR_CODE_DUPLICATE) {
                        reject(error);
                    } else {
                        resolve();
                    }
                })
            }).catch(function (error) {
                console.log('UNEXPECTED ERROR', error);
            });
    });

    return promise;
};

exports.init = init;
exports.tweet = tweet;