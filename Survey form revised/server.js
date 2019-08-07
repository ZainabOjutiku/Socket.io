var express = require ('express');
var app = express();
var server = app.listen(1337);
var io = require ('socket.io')(server);

app.use(express.static(__dirname + "/static"))

app.set("views",(__dirname + "/views"));
app.set("view engine", "ejs");

io.on("connection", function(socket) {
    console.log("Connected!");
    socket.on("postingform", function (data){
        console.log(data);
        const map = (Object.entries(data));
        console.log(map); 
        console.log("this is the server data "+ Object.entries(data))
        // socket.emit("updated",{data:`The data sent via form is:${map}`});
        socket.emit("updated",{
            info: `The data sent via form is: ${map}.`});

        console.log("updated",{data:`The data sent via form is:${map}`});
    });
});
app.get("/", function(req, res){
    console.log('~Root~');
    res.render("index");
})