var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    user_name:{type:String, required:true, unique:true},
    user_id:{type:String, required:true, unique:true},
    user_performance:{type:String}
}, {
    writeConcern: {
        j: true,
        wtimeout: 1000
      }
});

var User = mongoose.model('user', userSchema);

module.exports = User;