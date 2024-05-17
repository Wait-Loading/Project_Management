import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './manage (2).png';

function HomePage() {
  const [teams, setTeams] = useState([]);
  const loggedInUser = localStorage.getItem('loggedInUser');
  const loggedobj = localStorage.getItem('loggedobj');
  const [Projects, setProjects] = useState([]);
  const [UserStories, setUserStories] = useState([]); // New state for user stories
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'cover',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden' // Prevent scrolling
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      axios.get('http://localhost:9000/getTeamsUID', { params: { Uid: loggedInUser } })
        .then((res) => {
          setTeams(res.data);
          const teamNames = res.data.map(team => team.team_name);
          axios.get('http://localhost:9000/getProjects')
            .then(response => {
              const userProjs = response.data.filter(project => teamNames.includes(project.team_name));
              setProjects(userProjs);
  
              // Fetch user stories for each project
              userProjs.forEach(project => {
                axios.get(`http://localhost:9000/getUserStories/${project._id}`)
                  .then(res => {
                    const modifiedUserStories = res.data.map(userStory => ({
                      ...userStory,
                      AssignedTo: userStory.AssignedTo.includes(loggedInUser) ? userStory.AssignedTo : [...userStory.AssignedTo, loggedInUser]
                    }));
  
                    // Update the UserStories state with the modified data
                    setUserStories(prevState => [...prevState, { projectId: project._id, userStories: modifiedUserStories }]);
                  })
                  .catch(error => {
                    console.error('Error fetching user stories:', error);
                  });
              });
            })
            .catch(error => {
              console.error('Error fetching projects:', error);
            });
        })
        .catch((error) => console.error('Error fetching teams:', error));
    }
  }, [loggedInUser, loggedobj]);
  

  const handleCreateProject = () => {
    navigate('/CreateProject');
  };

  const handleViewProjects = () => {
    navigate('/ViewProjects');
  };

  const handleSignOut = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <div>
      {loggedInUser != null &&
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ padding: '0 15px' }}>
          <a className="navbar-brand" href="#">Project Management Site</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link btn btn-primary m-1" href="#" onClick={handleCreateProject}>Create New Project</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-success m-1" href="#" onClick={handleViewProjects}>View Existing Projects</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-info m-1" to="/CreateTeamRoster">Create Team Roster</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-warning m-1" to="/UserStories">Create User Stories for Projects</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-danger m-1" href="#" onClick={handleSignOut}>Signout</a>
              </li>
            </ul>
          </div>
        </nav>
      }
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", paddingTop: "70px", }}>
        <div className="text-center">
          {loggedInUser != null &&
            <p className="lead"> {"Welcome! " + loggedInUser}</p>
          }
          {loggedInUser == null &&
            <p className="text-center">
              <button className="btn btn-secondary mt-3" onClick={() => navigate('/signup')}>Go to Signup</button>
              Already have an account? <Link to="/login" className="btn btn-link">Login</Link>
            </p>
          }
          <h2 className="display-4">Welcome to Project Management Site</h2>
          <div>
            <h3>Your Teams:</h3>
            <ul>
              {teams.map((team) => (
                <li key={team._id}>
                  <button className="btn btn-secondary mt-3" onClick={() => { window.location.href = `/team/${team._id}`; }}>
                    {team.team_name}
                  </button>
                </li>
              ))}
            </ul>
            <h3>Your Projects with your user stories:</h3>
            <ul>
              {Projects.map((project) => (
                <li key={project._id}>
                  <button className="btn btn-secondary mt-3" onClick={() => { window.location.href = `/project/${project._id}`; }}>
                    {project.proj_name}
                  </button>
                  <ul>
                    {UserStories.map((story) => (
                      (story.projectId === project._id) && (
                        story.userStories.map((userStory, index) => (
                          <li key={index}>{userStory.description}</li>
                        ))
                      )
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
