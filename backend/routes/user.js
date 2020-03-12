const router = require('express').Router();
const {checkToken} = require('../middleware.js');
const bodyParser = require("body-parser");

router.use(require('cookie-parser')());
router.use(bodyParser.json());

let Authentication = require('../models/authentication.model');


router.route('/user_info/:username').get(checkToken, (req, res)=>{
    const username = req.params.username;

    Authentication.findOne({username: username})
        .then(user=>{
            if(user){
                res.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username
                })
            }else{
                res.status(404).json({
                    message: "user does not exist"
                })
            }
        })
        .catch(err=>res.status(400).json("Error: "+err));
})

module.exports = router;

//change password,profile pic, username, etc