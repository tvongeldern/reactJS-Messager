var express = require('express');
var app = express();
var dist = __dirname + '/dist/';
app.use(express.static(dist));

app.get('/', function(req, res){
    res.sendFile(dist + 'index.html');
});

app.listen(8080, function(){
    console.log("LISTENING ON PORT 8080");
});
