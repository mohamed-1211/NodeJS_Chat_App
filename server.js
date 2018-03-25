var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var messages = [
    {name:'John', message:'Hello'},
    {name:'Tom', message:'Hi'}
];

app.get('/messages', (req, res) => {
    if(messages)
        res.send(messages);
});

app.post('/messages', (req, res) => {
    //console.log(req.body);
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    
})

var server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port)
});