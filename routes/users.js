var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");
var User = require('../models/User');

router.get("/", function (req, res) {
    res.render("users/home");
})

router.post("/new", function (req, res) {
    User.findOne({user_name : req.body.user_name}, function(err, userinfo){
        
    })
    fetch("https://osu.ppy.sh/api/get_user?u=" + req.body.user_name + "&m=3&k=224149061918fc3b8d628b27c2982820ec43c06c")
        .then(response => response.json())
        .then(json => {
            let info = {
                user_name: json[0].username,
                user_id: json[0].user_id,
                user_performance: json[0].pp_raw
            }

            User.create(info, function (err, user) {
                if (err) return res.json(err);
                res.redirect('/');
            })
        })
})

module.exports = router;