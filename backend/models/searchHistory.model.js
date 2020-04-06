const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const searchHistorySchema = new Schema({
    searchTerm: {type: String}
},{
    timestamps: true
});

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

module.exports = SearchHistory;