var express = require('express');

function init(config) {
    var app = express();

    app.use(express.static('public'));
    var port = config.port || 3000;


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.listen(port, function () {
        console.log('Magrathea Dashboard is now listening on port ' + port);
    });
}

module.exports.init = init;