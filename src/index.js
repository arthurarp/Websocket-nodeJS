"use strict";
exports.__esModule = true;
var express_1 = require("express");
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var app = (0, express_1["default"])();
var httpServer = http_1["default"].createServer(app);
var mysocket = new socket_io_1["default"].Server(httpServer);
app.use(express_1["default"].static('public'));
mysocket.on('connection', function (socket) {
    console.log('New Connection: ' + socket.id);
    socket.on('message', function (message) {
        console.log('Message: ' + message);
    });
});
httpServer.listen(3333);
