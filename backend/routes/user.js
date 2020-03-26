const router = require('express').Router();
const {checkToken} = require('../middleware.js');
const bodyParser = require("body-parser");

const multer = require('multer') //used for handling file systems


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
                    username: user.username,
                    joined: user.joined,
                    dateOfBirth: user.dateOfBirth,
                    sex: user.sex,
                    location: user.location,
                    website: user.website,
                    bio: user.bio
                })
            }else{
                res.status(404).json({
                    sucess: false,
                    message: "user does not exist"
                })
            }
        })
        .catch(err=>res.status(400).json("Error: "+err));
})

router.route('/user_info/:username/editProfile').patch(checkToken, (req, res)=>{
    const username = req.params.username;
    const {dateOfBirth, sex, location, website, bio} = req.body

    const query = {username: username}

    const update ={
        $set:{
            dateOfBirth: dateOfBirth,
            sex: sex,
            location: location,
            website: website,
            bio: bio,
            
        }
    }

    Authentication.findOneAndUpdate(query, update)
        .then(updatedDocument=>{
            if(updatedDocument){
                res.status(200).json({
                    success: true,
                    message: "user updated"
                })
            }else{
                res.status(404).json({
                    success: false,
                    message: "user does not exist"
                })
            }
            //return updatedDocument
        })
        .catch(err=>{res.status(400).json("err "+err)})
})

module.exports = router;

//change password,profile pic, username, etc