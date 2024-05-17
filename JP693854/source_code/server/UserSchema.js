const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    User_id: String,
    UserStories: [String],
    password: String

});
const User = mongoose.model("User", UserSchema);
module.exports = User;