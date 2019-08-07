var express = require('express');
var app = express();

var server = app.listen(1337);
var io = require('socket.io')(server);

app.use(express.static(__dirname + "/static"))

app.set("views", __dirname + '/views')
app.set('view engine', 'ejs');
var counter = 0;

io.on("connection", function(socket){
    socket.on("broad", function(){
        counter +=1
        io.emit("updated",{new:counter})
        console.log(counter)
        
})
    socket.on("resett", function(){
        counter = 0;
        io.emit("reseted",{re:counter})
        console.log("reseted counter" + counter)
    })
    
})

app.get("/", function(req, res){
    console.log('~Root~');
    res.render("index");
})