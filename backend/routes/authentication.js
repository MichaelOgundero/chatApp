const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const {secret,refreshTokenSecret,refreshTokens} = require('../config');

router.use(require('cookie-parser')());
router.use(bodyParser.json());

let Authentication = require('../models/authentication.model');

const bcrypt = require("bcrypt");
const saltRounds = 17;


router.route('/register').post((req, res)=>{
    const {firstName, lastName, email, username, password, confirmPassword} = req.body;
    
    Authentication.find({
        $or: [
            {email: email},
            {username: username}
        ]
    }, (err, docs)=>{
        if(docs.length!==0){
            if(docs[0].username===username){
                res.status(400).json({
                    success: "false",
                    message: "username taken"
                })
            }else if(docs[0].email===email){
                res.status(400).json({
                    success: "false",
                    message: "email taken"
                })
            }
        }else{
            if(password === confirmPassword){
                bcrypt
                    .genSalt(saltRounds)
                    .then(salt=>{
                        //console.log(`Salt: ${salt}`)
                        return bcrypt.hash(password, salt)
                    })
                    .then(hash => {
                        const newAuthentication = new Authentication({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            username: username,
                            password: hash
                        });
                        newAuthentication.save()
                        .then(()=>res.status(200).json('user created'))
                        .catch(err=>res.status(400).json('error: ' + err));
                    })
        
            }else{
                res.status(400).send('passwords dont match')
            }
        
        }

    })
    
})



router.route('/logout').post((req, res)=>{
        refreshTokens.pop();
        res.status(200).json("Logout successful")

})

router.route('/login').post((req, res)=>{

    const {usernameEmail, password} = req.body;
    Authentication.findOne(
        {
            $or: [
                {email: usernameEmail},
                {username: usernameEmail}
            ]
        }
    ).then(user=>{
            if(user){
                bcrypt
                    .compare(password, user.password)
                    .then(result=>{
                        if(result==true){
                            const accessToken = jwt.sign({
                                username: user.username,
                            }, secret, {expiresIn: '1d'} )
            
                            const refreshToken = jwt.sign({
                                username: user.username,
                            }, refreshTokenSecret);
            
                            refreshTokens.push(refreshToken);
            
                            res.status(200).json({
                                success: true,
                                message: "Authentication Sucessful",
                                token: accessToken,
                                refreshToken: refreshToken,
                                username: user.username
                            })
                        }else{
                            res.status(400).json({
                                success: 'false',
                                message: "invalid username or password"
                            })
                        }

                    })
                    .catch(err=>res.status(400).json(`Error: ${err}`))
            }else{
                res.status(400).json({
                    success: false,
                    message: "Authentication failed"
                })
            }
        })
        .catch(err=>res.status(400).json("Error: "+err));
})



router.route('/token', (req, res)=>{
    const { token } = req.body;

    if(!token){
        return res.sendStatus(400)
    }

    if(!refreshTokens.includes(token)){
        return res.status(403).json({
            message: 'invalid access'
        })
    }

    jwt.verify(token, refreshTokenSecret, (err, user)=>{
        if(err){
            return res.status(403).json({
                message: "invalid"
            })
        }

        const accessToken = jwt.sign({
            username: usernameEmail,
        }, secret, {expiresIn: '20m'})

        res.status(200).json({
            success: true,
            message: "Refresh Token Sucessful",
            refreshToken: accessToken
        })
    })
})



module.exports = router;