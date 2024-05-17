import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
  const [proj_name, setProjName] = useState('');
  const [proj_desc, setProjDesc] = useState('');
  const [prod_owner_id, setProdOwnerId] = useState('');
  const [mgr_id, setMgrId] = useState('');
  const [team_id, setTeamId] = useState('');
  const [team_name, setTeam_Name] = useState('');

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/getUsers')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));

    axios.get('http://localhost:9000/getTeams')
      .then(response => setTeams(response.data))
      .catch(error => console.log(error));

    

  }, []);

  const handleCreateProject = (event) => {
    event.preventDefault();
    setTeam_Name(team_id.team_name);
    axios.post('http://localhost:9000/createProject', { proj_name, proj_desc, prod_owner_id, mgr_id, team_id, team_name})
      .then(response => {
        console.log(response.data); // Assuming the server responds with the created project
        // You can add further handling like redirecting to a success page or showing a success message
      })
      .catch(err => {
        console.error('Error creating project:', err);
        alert('Error in Creating project');
      });
  };

  return (
    <div className="container mt-4">
       <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand" href="#">Project Management Site</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link btn btn-primary m-1" href="#" onClick={()=>navigate('/Home')}>Home</a>
            </li>
            </ul>
        </div>
      </nav>
      <h2 className="text-center mb-4">Create New Project</h2>
      <form onSubmit={handleCreateProject}>
        <div className="form-group">
          <label htmlFor="proj_name">Project Name:</label>
          <input
            type="text"
            className="form-control"
            id="proj_name"
            value={proj_name}
            onChange={(e) => setProjName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="proj_desc">Project Description:</label>
          <textarea
            className="form-control"
            id="proj_desc"
            value={proj_desc}
            onChange={(e) => setProjDesc(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prod_owner_id">Product Owner:</label>
          <select
            className="form-control"
            id="prod_owner_id"
            value={prod_owner_id}
            onChange={(e) => setProdOwnerId(e.target.value)}
            required
          >
            <option value="">Select Product Owner</option>
            {users.map(user => (
              <option key={user._id} value={user.firstName}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mgr_id">Manager:</label>
          <input
            type="text"
            className="form-control"
            id="mgr_id"
            value={mgr_id}
            onChange={(e) => setMgrId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="team_id">Team:</label>
          <select
            className="form-control"
            id="team_id"
            value={team_id}
            vlue2= {team_name}
            onChange={(e) => {
              const selectedTeamId = e.target.value;
              setTeamId(e.target.value);
              const selectedTeam = teams.find(team => team._id === selectedTeamId);
              if (selectedTeam) {
                setTeam_Name(selectedTeam.team_name); // Update the team_name state
              }          }}
                      required
          >
            <option value="">Select Team</option>
            {teams.map(team => (
              <option key={team._id} value={team._id} vlue2={team.team_name}  >
                {team.team_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>        
      </form>
      <div className="text-center mt-4">
        <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate('/CreateTeam')}>Create Team</button>
        <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate('/ViewTeams')}>View Teams</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/ViewProjects')}>View Projects</button>
      </div>
    </div>
  );
}

export default CreateProject;
