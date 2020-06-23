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

var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
});

var Contact = mongoose.model('contact', contactSchema);

app.get("/",function(req, res){
    res.redirect("/contacts");
})

app.get("/contacts", function(req, res){
    Contact.find({}, function(err, contacts){
        if(err) return res.json(err);
        res.render("contacts/index", {contacts:contacts});
    });
});

app.get("/contacts/new", function(req, res){
    res.render("contacts/new");
})

app.post("/contacts", function(req, res){
    Contact.create(req.body, function(err, contact){
        if(err) return res.json(err);
        res.redirect('/contacts');
    })
})

app.get("/contacts/:id", function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, contact){
        if(err) return res.json(err);
        res.render('contacts/show', {contact:contact});
    })
})

app.get('/contacts/:id/edit', function(req, res){
    Contact.findOne({_id:req.params.id}, req.body, function(err, contact){
        if(err) return res.json(err);
        res.render('contacts/edit', {contact:contact});
    })
})

app.put('/contacts/:id', function(req, res){
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
        if(err) return res.json(err);
        res.redirect('/contacts/' + req.params.id);
    })
})

app.delete('/contacts/:id', function(req, res){
    Contact.deleteOne({_id:req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect('/contacts');
    })
})

app.listen(9090, function(){
    console.log("서버 가동중");
})