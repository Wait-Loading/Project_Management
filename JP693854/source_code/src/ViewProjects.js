import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:9000/getProjects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);
  const handleProjectSelect = (projectId) => {
    const project = projects.find(proj => proj._id === projectId);
    setSelectedProject(project);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Project Management Site</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link btn btn-primary m-1" href="#" onClick={()=>navigate('/Home')}>Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5 pt-3"> {/* Add padding-top after the navbar */}
        <h2>View Projects</h2>
        <select className="form-control mb-3" onChange={(e) => handleProjectSelect(e.target.value)}>
          <option value="">Select a Project</option>
          {projects.map(project => (
            <option key={project._id} value={project._id}>{project.proj_name}</option>
          ))}
        </select>
        {selectedProject && (
          <div>
            <h3>{selectedProject.proj_name}</h3>
            <p>Description: {selectedProject.proj_desc}</p>
            <p>Manager: {selectedProject.mgr_id}</p>
            <p>Product Owner: {selectedProject.prod_owner_id}</p>
            <h4>User Stories:</h4>
            <ul>
              {selectedProject.userStories.map((userStory, index) => (
                <li key={index}>
                  <p>Description: {userStory.description}</p>
                  <p>Priority: {userStory.priority}</p>
                </li>
              ))}
            </ul>
            <p>Team: {selectedProject.team_id}</p>
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary mt-3" onClick={()=>navigate('/CreateProject')}>Create Project</button>
    </div>
  );
}
export default ViewProjects;