const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema({
    team_name: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    members_name:[String]
});
const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
