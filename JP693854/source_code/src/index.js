import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import CreateProject from './CreateProject';
import CreateTeam from './CreateTeam';
import ViewProjects from './ViewProjects';
import ViewTeams from './ViewTeams';
import NavBar from './NavBar';
import Home from './Home';
import CreateTeamRoster from './CreateTeamRoster';
import UserStories from './UserStories';
import TeamPage from './TeamPage';
import ProjectPage from './ProjectPage';
import EditUserStory from './EditUserStory'; // Import EditUserStory component

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/CreateProject" element={<CreateProject />} />
      <Route path="/CreateTeam" element={<CreateTeam />} />
      <Route path="/ViewProjects" element={<ViewProjects />} />
      <Route path="/ViewTeams" element={<ViewTeams />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/NavBar" element={<NavBar />} />
      <Route path="/CreateTeamRoster" element={<CreateTeamRoster />} />
      <Route path="/UserStories" element={<UserStories />} />
      <Route path="/team/:teamId" element={<TeamPage />} />
      <Route path="/project/:projectId" element={<ProjectPage />} />
      <Route path="/project/:projectId/editUserStory/:userStoryId" element={<EditUserStory />} /> // Add route for EditUserStory
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <NavBar />
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
