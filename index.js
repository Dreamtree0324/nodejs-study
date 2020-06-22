var express = require("express");

var app = express();

app.get("/",function(req, res){
    res.send("Hello, World!");
})

app.listen(9090, function(){
    console.log("서버 가동중");
})