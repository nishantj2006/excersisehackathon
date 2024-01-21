import React from 'react';
import Navbar from './Navbar';
import './App.css';
import LoginButton from '../login';
import LogoutButton from '../logout';
import Profile from '../profile';
import { useState } from 'react';
import { auth } from '../firebase-config';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Home from '../components/Home';
import CreateGoal from '../components/CreateGoal';
import Dashboard from '../components/Dashboard';
import ReportProgress from "../components/ReportProgress"
import LogMeals from '../components/LogMeals';
import { signOut } from 'firebase/auth';
import Login from '../components/Login';

function App() {
  let loggedIn = false;
  const [createdGoal, setCreatedGoal] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
      loggedIn = false;
    });
  };
  return (
    <div className="App">
      {/*Routes*/}
      <Router>
        <nav class="navbar">
          <h1 class="logoText">The Food Amendment</h1>
          {!isAuth ? (
            // <Link to="/login"> Login </Link>
<Link></Link>
            ) : (
            <>
              <div class="dashboardLink"><Link to="/dashboard" class="dashboardLink"> Dashboard </Link></div>

              <div class="createLink"><Link to="/creategoal" className='createLink'> Create Goal </Link></div>
              {/* <Link to="/reportprogress"> Report Progress </Link> */}
              <button onClick={signUserOut}> Log Out</button>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/creategoal" element={<CreateGoal createdGoal={setCreatedGoal}/>} />
          <Route path="/reportprogress" element={<ReportProgress />} />
          <Route path="/logmeal" element={<LogMeals />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} createdGoal={createdGoal}/>} />
        </Routes>
      </Router>
    </div>
  );
}



const navApp = () => {
  return (
    <div>
      <Navbar />
      {/* Your main content goes here */}
      <div>
        <h1>Main Content</h1>
        {/* Add your other components/content here */}
      </div>
    </div>
  );
}

export default App;


