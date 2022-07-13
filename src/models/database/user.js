const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        default: '',
        index: { unique: true},
        required: true
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

const user = mongoose.model("accounts", userSchema);
module.exports = user;