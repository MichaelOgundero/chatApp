const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authTokensSchema = new Schema({
    authToken:{
        type: String,
        required: true,
        unique: true
    },
    user:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const AuthTokens = mongoose.model('AuthTokens', authTokensSchema);

module.exports = AuthTokens;