// Import mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const UserSchema = new Schema({
  admin: {
    type: Number,
    required: false,
  },
  userName: {
    type: String,
    required: true,
  },
  realName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const auxiliarPasswordConverter = async()=>{
  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash("123", salt);
  //console.log(password)
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("users", UserSchema);
