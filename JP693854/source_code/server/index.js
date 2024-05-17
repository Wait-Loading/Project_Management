// Import necessary modules and models
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./UserSchema');
const Project = require('./Projects.js');
const Team = require('./teams'); // Import Team model

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoString = "mongodb+srv://jayp13161:password180@cluster0.jzssdvj.mongodb.net/";
mongoose.connect(mongoString);
const database = mongoose.connection;

// Event listeners for MongoDB connection
database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Database Connected'));
app.get('/getTeams', async (req, res) => {
    try {
        // Fetch all teams from the database
        const teams = await Team.find({}, { }); // Exclude _id and __v fields
        res.send(teams); // Send teams as JSON response
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// API endpoint to fetch unassigned user stories
app.get('/unassignedUserStories', async (req, res) => {
    try {
        // Fetch unassigned user stories from all projects assigned to the team
        const unassignedUserStories = await Project.aggregate([
            { $unwind: "$userStories" },
            { $match: { "userStories.assignedTo": { $exists: false } } },
            { $project: { _id: 0, project_id: "$_id", description: "$userStories.description", priority: "$userStories.priority" } }
        ]);

        res.json(unassignedUserStories);
    } catch (error) {
        console.error('Error fetching unassigned user stories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/getTeamsUID', async (req, res) => {
    const { Uid } = req.query;
    console.log(Uid);
    try {
      // Fetch teams where the members array contains the provided user ID
      const teams = await Team.find({ members_name: Uid });

      res.send(teams); // Send teams as JSON response
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});



  


app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, { });
        //console.log(userList);
        // Print each user's details separately
        console.log(userList);
        res.send(userList);
    } catch (error) {
        res.status(500).send(error);
    }
});

// API endpoint to create a new user
app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        console.log(user);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// API endpoint to get a user by User_id and password
app.get('/getUser', async (req, res) => {
    const { User_id, password } = req.query;
    try {
        const user = await User.findOne({ User_id, password });
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
// API endpoint to get team details by ID
app.get('/getTeam/:teamId', async (req, res) => {
    const { teamId } = req.params;
    try {
        // Find the team by ID
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        console.error('Error fetching team details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a POST endpoint for creating projects
app.post('/createProject', async (req, res) => {
    try {
        // Extract project details from request body
        const { proj_name, proj_desc, prod_owner_id, mgr_id, team_id, team_name} = req.body;

        // Create a new project instance
        const newProject = new Project({
            proj_name,
            proj_desc,
            prod_owner_id,
            mgr_id,
            team_id,
            team_name
        });

        // Save the new project to the database
        const savedProject = await newProject.save();
        console.log(savedProject);
        // Send the saved project as JSON response
        res.json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// API endpoint to get project details by ID
app.get('/getProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        // Find the project by ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getProjects', async (req, res) => {
    try {
        // Fetch all projects from the database
        const projects = await Project.find({}); 
        res.json(projects); // Send projects as JSON response
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// API endpoint to create a new user story
app.post('/createUserStory', async (req, res) => {
    try {
        // Extract user story details from request body
        const { project_id, description, priority } = req.body;

        // Find the project by ID
        const project = await Project.findById(project_id);
        console.log(project);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Add the new user story to the project's user stories array
         // Create a new user story object
         const newUserStory = {
            description: description,
            priority: priority
        };
        console.log(newUserStory);

        // Add the new user story to the project's user stories array
        project.userStories.push(newUserStory);


        // Save the updated project
        await project.save();

        // Send the updated project as JSON response
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating user story:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to create a new team
app.post('/createTeam', async (req, res) => {
    try {
        const team = new Team(req.body);
       // console.log(team);
        team.save();
        res.send(team);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.post('/createTeamRoster', async (req, res) => {
    const { team_id, members,members_name } = req.body;
   // console.log(team_id);
    console.log(members_name);
    try {
      const team = await Team.findById(team_id);
     // console.log(team.members);
      if (!team) {
        return res.status(404).send({ message: 'Team not found' });
      }
      team.members = members;
      team.members_name = members_name;
     // console.log(team.members_name);
      await team.save();
      res.send(team);
    } catch (error) {
      res.status(500).send(error);
    }
});
// API endpoint to get a specific user story by ID
app.get('/getUserStory/:projectId/:userStoryId', async (req, res) => {
    const { projectId, userStoryId } = req.params;
    try {
        // Find the project by ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Find the user story within the project
        const userStory = project.userStories.id(userStoryId);
        if (!userStory) {
            return res.status(404).json({ error: 'User story not found' });
        }

        res.json(userStory);
    } catch (error) {
        console.error('Error fetching user story:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// API endpoint to fetch user stories associated with a project
app.get('/getUserStories/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        // Find the project by ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Extract user stories from the project
        const userStories = project.userStories;

        res.json(userStories);
    } catch (error) {
        console.error('Error fetching user stories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to update a specific user story by ID
app.post('/updateUserStory/:projectId/:userStoryId', async (req, res) => {
    const { projectId, userStoryId } = req.params;
    const { description, priority, AssignedTo} = req.body;

    try {
        // Find the project by ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Find the user story within the project
        const userStory = project.userStories.id(userStoryId);
        if (!userStory) {
            return res.status(404).json({ error: 'User story not found' });
        }

        // Update the user story with new data
        userStory.description = description;
        userStory.priority = priority;
        userStory.AssignedTo = AssignedTo;

        // Save the updated project
        await project.save();

        res.status(200).json({ message: 'User story updated successfully' });
    } catch (error) {
        console.error('Error updating user story:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});