var ds18b20 = require('ds18b20');

var getSensorIds = function () {
    var promise = new Promise(function (resolve, reject) {
        ds18b20.sensors(function(error, ids) {
            if (error) {
                reject(error);
            } else {
                resolve(ids);
            }
        });
    });

    return promise;
};

var read = function (sensor) {
    var promise = new Promise(function (resolve, reject) {
        var sensorData = sensor;

        ds18b20.temperature(sensor.id, function(error, reading) {
            if (error) {
                reject(error);
            } else {
                resolve({
                    "sensor": sensorData,
                    "reading": reading
                });
            }
        });
    });

    return promise;
};

exports.getSensorIds = getSensorIds;
exports.read = read;