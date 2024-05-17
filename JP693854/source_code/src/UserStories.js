import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function CreateUserStory() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9000/getProjects')
      .then(response => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const projectOptions = projects.map(project => ({
    label: project.proj_name,
    value: project._id
  }));

  const handleCreateUserStory = (event) => {
    console.log(selectedProject.value,description,priority);
    event.preventDefault();
    axios.post('http://localhost:9000/createUserStory', {
      project_id: selectedProject.value,
      description: description,
      priority: priority
    })
    .then(response => {
      console.log(response.data);
      alert('User story added successfully');
    })
    .catch(error => {
      console.error('Error creating user story:', error);
      alert('Error in creating user story');
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
      <h2>Create User Story</h2>
      <form onSubmit={handleCreateUserStory}>
        <div className="form-group">
          <label htmlFor="project">Project:</label>
          <Select
            id="project"
            value={selectedProject}
            onChange={(selectedOption) => setSelectedProject(selectedOption)}
            options={projectOptions}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <input
            type="number"
            id="priority"
            className="form-control"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add User Story</button>
      </form>
    </div>
  );
}

export default CreateUserStory;
