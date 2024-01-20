import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import CreateGoal from './pages/CreateGoal'
import ReportProgress from './pages/ReportProgress'

function App() {
  return (
    <div className="App">
      {/*Routes*/}
      <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/dashboard"> Dashboard </Link>
          <Link to="/creategoal"> Create Goal </Link>
          <Link to="/reportprogress"> Report Progress </Link>
          <Link to="/login"> Login </Link>
          <Link to="/register"> Register </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/register"element={<Register/>} />
          <Route path="/creategoal" element={<CreateGoal/>} />
          <Route path="/reportprogress" element={<ReportProgress/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
