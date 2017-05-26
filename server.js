'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const dist = __dirname + '/dist/';

var activeUsers = [];
var conversations = {};

app.use(express.static(dist));

app.get('/', function(req, res){
    res.sendFile(dist + 'index.html');
});

io.on('connection', socket => {
    var connectedUser;

    socket.on('user-enter', userName => {
        connectedUser = userName;
        if (activeUsers.indexOf(userName) == -1){
            activeUsers.push(userName);
            socket.emit('sign-on-confirmation', userName);
            console.log(userName, "has signed on");
            io.emit('all-available-users', activeUsers);
        } else {
            socket.emit('sign-on-name-error', userName);
        }
    });

    socket.on('new-message', msg => {
        var convo = conversations[msg.convo];
        var broadcast;
        if (convo) {
            convo.push(msg);
            broadcast = {
                name: msg.convo,
                messages: convo
            };
            socket.broadcast.emit('conversation-data', broadcast);
        }
    });

    socket.on('conversation-data', convo => {
        conversations[convo] = conversations[convo] || [];
        socket.emit('conversation-data', {
            name: convo,
            messages: conversations[convo]
        });
    });


    socket.on('disconnect', () => {
        if (connectedUser){
            var len = activeUsers.length;
            for (let i = 0; i < len; i++){
                if (activeUsers[i] == connectedUser){
                    activeUsers.splice(i, 1);
                    break;
                }
            }
            console.log(connectedUser, "has signed off");
            io.emit('all-available-users', activeUsers);
        }
    });
});


http.listen(8080, function(){
    console.log("LISTENING ON PORT 8080");
});
