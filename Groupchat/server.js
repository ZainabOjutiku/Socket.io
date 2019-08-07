var express = require("express");
var app = express();
var server = app.listen(1337);
var io = require("socket.io")(server);

app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
var Users = {};
var messages ={};
var id = 0;

//connection on
io.on("connection", function(socket){
    //socket on for the new user and saved in a dictionary with the ids as the keys
    socket.on("new",function(data){
        console.log('user submitted a name: ' + data.name + ' ' + socket.id);
        Users[socket.id]= {name:data.name}
        //emits older messages to the new user
        socket.emit("previous_msg",messages)
        // emits the new user to all the connected clients
        io.emit("new_user",{name:data.name})
        

    })
    //new messages stored with the user in a dictionary with messages id
    socket.on("new_message", function(data){
        messages[id] = {name:data.name,message:data.message};
        console.log('newmessage ' + data.name + ' ' + messages.id+" "+data.message);
        io.emit("all_messages",messages[id]);
        id++;
    })
    //io.emit to notify everyone
    // socket.on("notification",function(data){
    //     console.log("new_not "+data.name);
    //     io.emit("new_notification",{name:data.name});
       
    // })

    //broadcast for everyone except who triggered it
    socket.on("notification",function(data){
        console.log("new_not "+data.name);
        socket.broadcast.emit("new_notification",{name:data.name});
    })

    //disconnects the user
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit("user_disconnect", Users[socket.id])

     });
    
})


app.get("/", function(req,res){
    res.render("index");
})