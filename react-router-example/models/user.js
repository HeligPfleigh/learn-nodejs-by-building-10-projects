var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/react-router-example');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    username:{
        type: String,
        index: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String
    }
});

var User = module.exports = mongoose.model('Users', UserSchema);

module.exports.createUser = function(newUser, callback){
    newUser.save(callback);
}

module.exports.deleteUser = function(username, callback){
    User.remove({username: username}, callback);
}

module.exports.editUser = function(username, email, password, callback){
    User.findOneAndUpdate({username: username}, 
        {email: email, password: password}, 
        function(err, data){
            callback(err, data);
    });
}

module.exports.getAllUser = function(callback){
    User.find({}, function(err, data){
        callback(err, data);
    })
}

module.exports.checkAuthentication = (username, password) => {
    //trả về 1 promise
    return User.findOne({username: username, password: password});
}