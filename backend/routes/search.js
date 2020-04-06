const router = require('express').Router();
const bodyParser = require("body-parser")

router.use(require('cookie-parser')());
router.use(bodyParser.json());

let Authentication = require('../models/authentication.model')
let SearchHistory = require('../models/searchHistory.model')

router.route('/findUser/:searchValue').get((req, res)=>{
    const searchValue = req.params.searchValue;

    Authentication.find({
        $or: [
            {username: {$regex: `.*${searchValue}.*`}},//searches the document for elements that contains the searchvalue
            {firstName: {$regex: `.*${searchValue}.*`, '$options':'i'}},
            {lastName: {$regex: `.*${searchValue}.*`, '$options':'i'}}
        ]
    })
        .then(searchResult=>{
            if(searchResult){
                const results = []
                searchResult.forEach(element => {
                    const result = {
                        username: element.username,
                        firstName: element.firstName,
                        lastName: element.lastName
                    }
                    results.push(result);
                });
                res.status(200).json({
                    searchResult: results
                })
            }else{
                res.status(404).json({
                    success: false,
                    message: "not found"
                })
            }
        })
        .catch(err=>res.status(400).json("error: "+err))
    
    const newSearch = new SearchHistory({
        searchTerm: searchValue
    });
    newSearch.save()
    .then(()=>res.status(200).json('search saved'))
    .catch(err=>res.status(400).json('error: '+err))

        
})

/*router.route('/history/searchHistory').get((req, res)=>{
    SearchHistory.aggregate(
        [
            {
                $sort: {_id:-1},
                $limit: 5 
            }
        ],

        (err, docs)=>{
            res.json({
                res: docs
            })
        }
    )
})*/


module.exports = router;