"use strict;"

const localtunnel = require("localtunnel");
const format = require('string-format');

console.log(format('Stating on: "{}"', 3000));

var tunnel = localtunnel(3000, {subdomain:'openexchange'}, function (err, tunnel) {

    if (err) {
        console.warn("Failed to start localtunnel:");
        console.warn(err);
        return;
    }

    console.log(format('Localtunnel is started on: "{}"', tunnel.url));
});

tunnel.on('close', function () {
    console.warn("localtunnel is closed");
});