var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
}, {
    writeConcern: {
        j: true,
        wtimeout: 1000
      }
});

var Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;