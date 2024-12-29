const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    }
},{
    timestamps: true
});


const Users = mongoose.model('Users', userSchema);


module.exports = Users;