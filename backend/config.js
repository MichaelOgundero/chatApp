const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    atlasURI: process.env.ATLAS_URI,
    port: process.env.PORT,
    secret: process.env.SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokens: []
}