// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
    const UserSchema = new Schema({
        admin: {
            type: Intl,
            required:true
        },
        userName:{
            type: String,
            required:true
        },
		realName:{
            type: String,
            required:true
        },
		password:{
            type: String,
            required:true
        }
    });

// create and export model
module.exports = mongoose.model("users", UserSchema);

/*module.exports = 
[
	{
		"id" : 1,
		"userName" : "teste",
		"realName" : "Ana",
		"password" : "123",
		"admin" : 1,
	},
	{
		"id" : 2,
		"userName" : "pipoca",
		"realName" : "Rui",
		"password" : "456",
		"admin" : 0,
	},
	{
		"id" : 3,
		"userName" : "marmota",
		"realName" : "Mário",
		"password" : "323",
		"admin" : 0,
	}
]
*/