const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authenticationSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password:{type: String, required: true, minlength: 4},
    confirmPassword: {type: String, minlength: 4}
}, {
    timestamps: true
});

const Authentication = mongoose.model("Authentication", authenticationSchema);

module.exports = Authentication;