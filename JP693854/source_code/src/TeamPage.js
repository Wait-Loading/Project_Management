import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeamPage() {
  const [team, setTeam] = useState(null);
  const { teamId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9000/getTeam/${teamId}`)
      .then((res) => {
        setTeam(res.data);
      })
      .catch((error) => console.error('Error fetching team details:', error));
  }, [teamId]);

  return (
    
    <div>
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
      <h1>Team Details</h1>
      {team ? (
        <div>
          <h2>{team.team_name}</h2>
          <p>Description: {team.description}</p>
          <h3>Members:</h3>
          <ul>
            {team.members_name.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TeamPage;
