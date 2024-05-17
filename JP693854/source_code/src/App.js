import React, { useState } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import NavBar from './NavBar'; // Assuming NavBar is in the same directory
import LoginPage from './Login';
import SignupPage from './Signup';
import CreateProject from './CreateProject';
import CreateTeam from './CreateTeam';
import ViewProjects from './ViewProjects';
import ViewTeams from './ViewTeams'; // Uncomment this when you have the ViewTeams component ready
import Home from './Home'; // Assuming Home is in the same directory
import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignup = () => {
    setLoggedIn(true);
  };

  const routes = useRoutes([
    { path: '/', element: isLoggedIn ? <Navigate to="/CreateProject" /> : <LoginPage onLogin={handleLogin} /> },
    { path: '/login', element: isLoggedIn ? <Navigate to="/CreateProject" /> : <LoginPage onLogin={handleLogin} /> },
    { path: '/signup', element: isLoggedIn ? <Navigate to="/CreateProject" /> : <SignupPage onSignup={handleSignup} /> },
    { path: '/CreateProject', element: isLoggedIn ? <CreateProject /> : <Navigate to="/login" /> },
    { path: '/CreateTeam', element: isLoggedIn ? <CreateTeam /> : <Navigate to="/login" /> },
    { path: '/ViewProjects', element: isLoggedIn ? <ViewProjects /> : <Navigate to="/login" /> },
    // { path: '/ViewTeams', element: isLoggedIn ? <ViewTeams /> : <Navigate to="/login" /> }, // Uncomment this when you have the ViewTeams component ready
    { path: '/Home', element: isLoggedIn ? <Home /> : <Navigate to="/login" /> },
  ]);

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="content">
        {routes}
      </div>
    </div>
  );
}

export default App;
