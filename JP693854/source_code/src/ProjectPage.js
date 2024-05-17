import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProjectPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9000/getProject/${projectId}`)
      .then((res) => {
        setProject(res.data);
      })
      .catch((error) => console.error('Error fetching project details:', error));
  }, [projectId]);

  const handleEditUserStory = (userStoryId) => {
    navigate(`/project/${projectId}/editUserStory/${userStoryId}`);
  };
  

  return (
    <div className="container mt-5 pt-5"> {/* Add pt-5 (padding top) to create space */}
      <h1 className="text-center">Project Details</h1>
      {project ? (
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
          <h2 className="mt-4">{project.proj_name}</h2>
          <p>Description: {project.proj_desc}</p>
          <h3>User Stories:</h3>
          <ul className="list-group">
            {project.userStories.map((userStory) => (
              <li key={userStory._id} className="list-group-item d-flex justify-content-between align-items-center">
                {" Description: { "+
                userStory.description +" } With Priority : "+
                userStory.priority
                }
                <button className="badge bg-primary rounded-pill" onClick={() => handleEditUserStory(userStory._id)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProjectPage;
