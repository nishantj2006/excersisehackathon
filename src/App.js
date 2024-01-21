
import './App.css';
import LoginButton from './login';
import LogoutButton from './logout';
import Profile from './profile';
import { useState } from 'react';
import { auth } from './firebase-config';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Pages/Home";
import CreateGoal from './Pages/CreateGoal';
import Dashboard from './Pages/Dashboard';
import ReportProgress from "./Pages/ReportProgress"
import LogMeals from './Pages/LogMeals';
import { signOut } from 'firebase/auth';
import Login from './Pages/Login';

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
        <nav>
          {!isAuth ? (
            // <Link to="/login"> Login </Link>
<Link></Link>
            ) : (
            <>
              <Link to="/dashboard"> Dashboard </Link>
              <Link to="/creategoal"> Create Goal </Link>
              <Link to="/reportprogress"> Report Progress </Link>
              <button onClick={signUserOut}> Log Out</button>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard createdGoal={createdGoal} setCreatedGoal={setCreatedGoal}/>} />
          <Route path="/creategoal" element={<CreateGoal createdGoal={setCreatedGoal}/>} />
          <Route path="/reportprogress" element={<ReportProgress />} />
          <Route path="/logmeal" element={<LogMeals />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
