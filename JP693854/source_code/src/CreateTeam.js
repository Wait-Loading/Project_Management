import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTeam({ onTeamCreate }) {
  const [teamName, setTeamName] = useState('');

  const navigate = useNavigate();


  const handleCreateTeam = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9000/createTeam', { team_name: teamName })
      .then((response) => {
        console.log(response.data);
        //onTeamCreate();
        alert('Team created successfully');
      })
      .catch((err) => {
        console.error('Error creating team:jvbhjv', err);
        alert('Error in creating team', err);
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
      <h2>Create New Team</h2>
      <form onSubmit={handleCreateTeam}>
        <div className="form-group">
          <label htmlFor="teamName">Team Name:</label>
          <input
            type="String"
            className="form-control"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Team</button>
      </form>
      <button type="submit" className="btn btn-primary" onClick={()=>navigate('/CreateProject')}>Create Project</button>
    </div>
  );
}

export default CreateTeam;
