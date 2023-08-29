"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/WebRTCHub").build();
connection.start().then(function () {
    console.log("SignalR connected.");
}).catch((err) =>
{
    return console.error(err.toString());
});