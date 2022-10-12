// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const CollectionSchema = new Schema({
        official: {
            type: Intl,
            required:true
        },
        colName:{
            type: String,
            required:true
        },
		userId: {
            type: Intl,
            required:true
        }
    });

// create and export model
module.exports = mongoose.model("collections", CollectionSchema);

/*

module.exports = [
	{
		"id" : 3,
		"official" : 1,
		"colName" : "Coroa",
		"userId" : 1
	},
	{
		"id" : 7,
		"official" : 1,
		"colName" : "Cara",
		"userId" : 1
	},
	{
		"id" : 4,
		"official" : 0,
		"colName" : "Ganhei",
		"userId" : 1
	},
	{
		"id" : 5,
		"official" : 0,
		"colName" : "b",
		"userId" : 2
	},
	{
		"id" : 6,
		"official" : 0,
		"colName" : "c",
		"userId" : 3
	}
]
*/