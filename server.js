'use strict';

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    app = express(),
    settings = {};

// command line args
process.argv.forEach(function(val, index, array) {
    if (index % 2 === 0) {
        settings[array[index]] = array[index + 1];
    }
});
function arg(key, defaultVal) {
    return settings[key] || defaultVal;
}

var port = parseInt(arg('-p', 3000));
var home = arg('-h', __dirname);

// setup express
app.set('port', port);
app.set('case sensitive routing', true);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.directory(home));
app.use(express.static(home));

http.createServer(app).listen(port, function () {
    console.log(' Simple Static Server');
    console.log('-====================-');
    console.log("\t-p (port) =\t" + port);
    console.log('\t-h (home) =\t' + home);
    console.log('* [ R U N N I N G . . .] *');
});