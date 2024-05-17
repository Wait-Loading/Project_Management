const mongoose = require("mongoose");

const UserStorySchema = new mongoose.Schema({
    description: String,
    priority: String,
    AssignedTo: [String]
});

const ProjectSchema = new mongoose.Schema({
    proj_name: String,
    proj_desc: String,
    prod_owner_id: String,
    mgr_id: String,
    userStories: [UserStorySchema], // Array to store user stories
    team_id: String,
    team_name: String
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
