import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';


function CreateTeamRoster() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/getUsers')
    .then(response => setUsers(response.data))
    .catch(error => console.log(error));    
    axios.get('http://localhost:9000/getTeams')
      .then(response => {
        console.log(response.data);
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  const userOptions = users.map((user) => {
    return { label: user.firstName + user.lastName, value: user._id , value2:user.User_id }
  });

  const teamOptions = teams.map((team) => {
    return { label: team.team_name, value: team._id }
  });

  const handleCreateRoster = (event) => {
    console.log(selectedTeam.value);
    event.preventDefault();
    axios.post('http://localhost:9000/createTeamRoster', {
      team_id: selectedTeam.value, // replace with your selected team state variable
      members: selectedUsers.map(user => user.value),// replace with your selected users state variable
      members_name:  selectedUsers.map(user => user.value2)
    })
    .then(response => {
      console.log(response.data);
      alert('Team roster created successfully');
    })
    .catch(error => {
      console.error(error);
      alert('Error in creating team roster', error);
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
      <h2>Create Team Roster</h2>
      <form onSubmit={handleCreateRoster}>
        <div className="form-group">
          <label htmlFor="team">Team:</label>
          <Select
            id="team"
            value={selectedTeam}
            onChange={(selectedOption) => setSelectedTeam(selectedOption)}
            options={teamOptions}
          />
        </div>
        <div className="form-group">
          <label htmlFor="members">Members:</label>
          <Select
            id="members"
            isMulti
            value={selectedUsers}
            onChange={(selectedOptions) => setSelectedUsers(selectedOptions)}
            options={userOptions}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Roster</button>
      </form>
    </div>
  );
}

export default CreateTeamRoster;
