import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditUserStory() {
  const { projectId, userStoryId } = useParams();
  const [userStory, setUserStory] = useState(null);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1); // Default priority as 1
  const [AssignedTo, setAssignedTo] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9000/getUserStory/${projectId}/${userStoryId}`)
      .then((res) => {
        setUserStory(res.data);
        setDescription(res.data.description);
        setPriority(res.data.priority);
        setAssignedTo(res.data.AssignedTo);
      })
      .catch((error) => console.error('Error fetching user story details:', error));
  }, [projectId, userStoryId]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(parseInt(e.target.value)); // Parse integer value
  };
  const handleAssign = () => {
    AssignedTo.push(localStorage.getItem('loggedInUser'));
  }
  const handleSave = () => {
    axios.post(`http://localhost:9000/updateUserStory/${projectId}/${userStoryId}`, {
      description,
      priority
    })
    .then((res) => {
      console.log('User story updated successfully:', res.data);
      // Redirect back to the project page after editing
      navigate(`/project/${projectId}`);
    })
    .catch((error) => console.error('Error updating user story:', error));
  };

  return (
    <div className="container mt-5">
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
      {/* Add padding to create space between navbar and content */}
      <div className="mt-6">
        <h1>Edit User Story</h1>
        {userStory ? (
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input type="text" className="form-control" id="description" value={description} onChange={handleDescriptionChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="priority" className="form-label">Priority:</label>
                <input type="number" className="form-control" id="priority" value={priority} onChange={handlePriorityChange} />
              </div>
              <button className="btn btn-primary" onClick={handleAssign}>Assign me this Story</button>

              <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default EditUserStory;
