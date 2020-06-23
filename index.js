var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var dotenv = require("dotenv");

dotenv.config();

var app = express();

// DB setting
const MONGO_DB = process.env.MONGO_DB;

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

// Other setting
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));
app.use('/users', require('./routes/users'));


app.listen(9090, function(){
    console.log("서버 가동중");
})