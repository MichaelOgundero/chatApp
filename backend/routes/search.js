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

        
})

router.route('/newSearch').post((req, res)=>{
    const {searchValue} = req.body;

    const newSearch = new SearchHistory({
        searchTerm: searchValue
    });
    newSearch.save()
    .then(()=>res.status(200).json('search saved'))
    .catch(err=>res.status(400).json('error: '+err))

})

router.route('/searchHistory').get((req, res)=>{
    SearchHistory.find({},
                (err, docs)=>{
                    if(err){
                        res.status(400).json({
                            err: err
                        })
                    }
                    const results = []
                    docs.forEach(element=>{
                        const result={
                            term: element.searchTerm,
                            searchHistoryId: element._id
                        }
                        results.push(result)
                    })
                    res.status(200).json({
                        searchHistory: results
                    })

                })
                 .sort({_id:-1})
                 .limit(5)         
})

router.route('/clearAll').delete((req, res)=>{
    SearchHistory.deleteMany({})
                 .then(()=>{
                     res.status(200).json({success:"true", message:"search History Cleared"})
                })
                .catch(err=>res.status(400).json("error: "+err))
})

router.route('/clearOne/:searchId').delete((req, res)=>{
    const searchId = req.params.searchId
    SearchHistory.findByIdAndDelete({_id:searchId})
                 .then(()=>{
                     res.status(200).json({success:"true", message:"deleted"})
                 })
                 .catch(err=>res.status(400).json("error: "+err))
})


module.exports = router;