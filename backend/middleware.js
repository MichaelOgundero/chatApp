const jwt = require('jsonwebtoken');
const { secret } = require('./config.js')

const checkToken = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err, user)=>{
            if(err){
                return res.sendStatus(403).json({
                    success: false,
                    message: 'Token is invalid'
                });
            }else{
                req.user = user;
                next();
            }
        });
    }else{
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
};

module.exports = {
    checkToken: checkToken
}