var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");

dotenv.config();

var app = express();

const MONGO_DB = process.env.MONGO_DB;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(MONGO_DB);

let db = mongoose.connection;

db.once('open', function(){
    console.log('DB Connected');
})

db.on('error', function(err){
    console.log('DB ERROR : ', err);
})

app.set("view engine", "ejs");

app.get("/",function(req, res){
    res.render("index");
})

app.listen(9090, function(){
    console.log("서버 가동중");
})