import './App.css';
import LoginButton from './login';
import LogoutButton from './logout';
import Profile from './profile';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import CreateGoal from './Pages/CreateGoal';
import Dashboard from './Pages/Dashboard';
import ReportProgress from "./Pages/ReportProgress"
import LogMeals from './Pages/LogMeals';

function App() {
  // const[isAuth, setIsAuth] = useState(setIsAuth);

  return (
    <div className="App">
      {/*Routes*/}
      <Router>
        <nav>
          <Link to="/dashboard"> Dashboard </Link>
          <Link to="/creategoal"> Create Goal </Link>
          <Link to="/reportprogress"> Report Progress </Link>
          <div className="loginLogout">
            <LoginButton />
            <LogoutButton />
            <Profile />
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/creategoal" element={<CreateGoal />} />
          <Route path="/reportprogress" element={<ReportProgress />} />
          <Route path="/logmeal" element={<LogMeals />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
